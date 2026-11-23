// Comportements du site, réinitialisés à chaque navigation (Astro View Transitions).
const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let cleanups: Array<() => void> = [];

function onCleanup(fn: () => void) {
  cleanups.push(fn);
}

/* Apparitions au scroll */
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduce()) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));
  onCleanup(() => io.disconnect());
}

/* En-tête : ombre et hauteur réduite au scroll, menu mobile */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  onCleanup(() => window.removeEventListener('scroll', onScroll));

  const btn = header.querySelector<HTMLButtonElement>('[data-menu-btn]');
  const panel = header.querySelector<HTMLElement>('[data-menu]');
  if (!btn || !panel) return;
  const setOpen = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.querySelector('.sr-only')!.textContent = open ? 'Fermer le menu' : 'Ouvrir le menu';
    panel.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  };
  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      btn.focus();
    }
  };
  document.addEventListener('keydown', onKey);
  onCleanup(() => {
    document.removeEventListener('keydown', onKey);
    document.body.style.overflow = '';
  });
}

/* Carrousel d'accueil */
function initSlider() {
  const root = document.querySelector<HTMLElement>('[data-slider]');
  if (!root) return;
  const track = root.querySelector<HTMLElement>('[data-track]')!;
  const slides = [...root.querySelectorAll<HTMLElement>('[data-slide]')];
  const dots = [...root.querySelectorAll<HTMLButtonElement>('[data-dot]')];
  const pauseBtn = root.querySelector<HTMLButtonElement>('[data-pause]')!;
  const DURATION = 6000;
  let index = 0;
  let timer: number | undefined;
  let userPaused = false;
  let hoverPaused = false;
  const auto = !reduce();
  if (!auto) root.classList.add('no-auto');
  root.style.setProperty('--dur', `${DURATION}ms`);

  const tones = slides.map((s) => (s.classList.contains('bg-yellow') ? 'yellow' : s.classList.contains('bg-green') ? 'green' : 'forest'));

  const go = (i: number) => {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    root.dataset.tone = tones[index];
    slides.forEach((s, k) => {
      const on = k === index;
      s.classList.toggle('is-active', on);
      s.toggleAttribute('inert', !on);
      if (on) s.removeAttribute('aria-hidden');
      else s.setAttribute('aria-hidden', 'true');
      s.querySelectorAll('a').forEach((a) => (on ? a.removeAttribute('tabindex') : a.setAttribute('tabindex', '-1')));
    });
    dots.forEach((d, k) => {
      // Relance l'animation de la barre de progression
      d.setAttribute('aria-selected', 'false');
      if (k === index) {
        void d.offsetWidth;
        d.setAttribute('aria-selected', 'true');
      }
    });
    schedule();
  };

  const schedule = () => {
    window.clearTimeout(timer);
    if (!auto || userPaused || hoverPaused || document.hidden) return;
    timer = window.setTimeout(() => go(index + 1), DURATION);
  };

  const setPaused = (p: boolean) => {
    userPaused = p;
    root.classList.toggle('is-paused', p);
    pauseBtn.setAttribute('aria-label', p ? 'Reprendre le défilement' : 'Mettre en pause le défilement');
    if (!p) go(index);
    else window.clearTimeout(timer);
  };

  root.querySelector('[data-next]')!.addEventListener('click', () => go(index + 1));
  root.querySelector('[data-prev]')!.addEventListener('click', () => go(index - 1));
  dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
  pauseBtn.addEventListener('click', () => setPaused(!userPaused));
  if (!auto) pauseBtn.hidden = true;

  const viewport = root.querySelector<HTMLElement>('[data-viewport]')!;
  const hoverOn = () => { hoverPaused = true; window.clearTimeout(timer); };
  const hoverOff = () => { hoverPaused = false; go(index); };
  viewport.addEventListener('mouseenter', hoverOn);
  viewport.addEventListener('mouseleave', hoverOff);
  viewport.addEventListener('focusin', hoverOn);
  viewport.addEventListener('focusout', (e) => {
    if (!viewport.contains(e.relatedTarget as Node)) hoverOff();
  });

  // Glisser au doigt
  let startX = 0;
  viewport.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
  });

  const onVis = () => schedule();
  document.addEventListener('visibilitychange', onVis);
  onCleanup(() => {
    window.clearTimeout(timer);
    document.removeEventListener('visibilitychange', onVis);
  });

  go(0);
}

/* Étapes de l'application : choisir une étape affiche l'aperçu correspondant */
function initSteps() {
  document.querySelectorAll<HTMLElement>('[data-steps-root]').forEach((root) => {
    const buttons = root.querySelectorAll<HTMLButtonElement>('[data-step]');
    const screens = root.querySelectorAll<HTMLElement>('[data-screen]');
    buttons.forEach((btn) =>
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        screens.forEach((s) => s.classList.toggle('is-hidden', s.dataset.screen !== btn.dataset.step));
      }),
    );
  });
}

/* Bouton retour en haut */
function initToTop() {
  document.querySelectorAll<HTMLButtonElement>('[data-to-top]').forEach((b) =>
    b.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce() ? 'auto' : 'smooth' })),
  );
}

document.addEventListener('astro:page-load', () => {
  document.documentElement.classList.add('js');
  initReveal();
  initHeader();
  initSlider();
  initSteps();
  initToTop();
});

// Garde la classe .js après le remplacement du document, pour éviter un clignotement des apparitions.
document.addEventListener('astro:after-swap', () => document.documentElement.classList.add('js'));

document.addEventListener('astro:before-swap', () => {
  cleanups.forEach((fn) => fn());
  cleanups = [];
});
