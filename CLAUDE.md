# BUTUS — Site vitrine (butus.org)

Ce dossier contient le site vitrine public de **BUTUS**. C'est un **site de présentation uniquement** :
il présente BUTUS et **annonce l'application mobile à venir**. Ce fichier est la référence de conception :
à lire avant toute modification.

> ⛔ **Périmètre strict** : le site ne contient **aucune fonctionnalité**. Pas d'inscription, pas de
> connexion, pas de liste d'attente, pas de formulaire, pas de vente, d'achat, de catalogue ni de
> recherche de produits, pas de compte, pas de paiement. Toutes ces fonctions appartiennent à
> l'application mobile. Le site les **décrit** seulement, il ne les **propose pas**.

---

## 1. Contexte

**BUTUS** est une initiative togolaise d'**économie circulaire**. Elle aide les particuliers et les
entreprises à donner une seconde vie aux objets : vente, achat, réutilisation, réparation et valorisation.

- Signature : *« Donner une seconde vie aux objets et créer de nouvelles opportunités. »*
- Fondateur & CEO : Gedeon Essodonn BATAWOLO
- Contact public : butus.tg@gmail.com · +228 98 92 32 95
- Domaine du site vitrine : **https://butus.org**
- ✅ Domaine officiel retenu : **butus.org**. Ne jamais mentionner `butus.site` dans le site.

### Objectifs du site
1. **Faire connaître BUTUS** : qui nous sommes, notre mission d'économie circulaire au Togo.
2. **Annoncer l'application mobile** : donner envie, montrer à quoi elle ressemble et ce qu'elle permettra.
3. **Inspirer confiance** : une marque sérieuse, locale et engagée.
4. **Permettre de nous joindre** par des liens simples, sans formulaire : e-mail (`mailto:`), téléphone
   (`tel:`), WhatsApp (`https://wa.me/22898923295`) et réseaux sociaux.

### Publics
Le grand public togolais (futurs utilisateurs), les commerçants et boutiques, les futurs livreurs, les
partenaires, la presse et les institutions. Le site leur **explique** ce que l'app leur apportera. Il n'y a
pas d'action à faire sur le site, à part nous contacter ou nous suivre.

---

## 2. Charte graphique (à respecter strictement)

Ton visuel : **moderne, épuré, minimaliste**. Le mot **BUTUS** doit avoir de l'impact. On utilise des
**blocs colorés à fort contraste** (vert/blanc ou jaune/noir) avec de **grands rayons d'angle**.

### Couleurs (tokens CSS)
```css
:root {
  --butus-forest: #173A34;  /* vert profond : fonds principaux, header, footer */
  --butus-green:  #24B158;  /* vert vif : accent, « B » du logo, éléments clés */
  --butus-white:  #FFFFFF;
  --butus-yellow: #F2A900;  /* jaune : blocs de mise en avant, badges */
  --butus-black:  #000000;  /* texte sur fond jaune, « B » du logo jaune */
}
```
- Couples autorisés : blanc sur forest, `#24B158` sur forest (titres seulement), noir sur jaune, forest sur blanc.
- **Interdit** : blanc sur `#24B158` ou blanc sur `#F2A900` pour du texte courant (contraste insuffisant).
  Sur un fond vert ou jaune, mettre le texte en noir ou en forest.
- Pas d'autres couleurs de marque. Les nuances (gris, teintes à faible opacité) servent seulement aux bordures et surfaces.

### Logo
Le mot `BUTUS` en Roboto Black ou Bold, sans icône. Deux variantes :
- fond forest : « **B** » en `#24B158` et « UTUS » en blanc ;
- fond jaune : « **B** » en noir et « UTUS » en blanc.
Le logo est fourni en SVG inline, jamais en image matricielle.

### Typographie
- **Logo et texte courant : Roboto** (charte), auto-hébergée (`@fontsource-variable/roboto`).
- **Titres : Bricolage Grotesque** (`@fontsource-variable/bricolage-grotesque`), choisie par le client pour
  donner plus de caractère : chaleureuse, humaine, en accord avec la seconde main. Graisse 800,
  `font-stretch: 90%`, interlettrage -0.025em, MAJUSCULES pour h1/h2.
  Appliquée automatiquement aux `h1`, `h2`, `h3`, et via la classe `.font-display` pour les autres titres.
  Ne jamais l'utiliser pour le logo BUTUS ni pour le texte courant.
- Tailles **modérées** (retour client : les titres trop grands sont laids). Échelle dans `global.css` :
  `--text-step-4` (h1, max 3.5rem), `--text-step-3` (h2, max 2.5rem), `--text-step-2` (h3).
- Texte courant : Regular, 17 px, interligne 1.65.

### Formes
- Rayons : `--radius-lg: 32px` (grands blocs), `--radius-md: 20px` (cartes), `--radius-pill: 999px` (boutons, badges).
- Mise en page en **bento** (grilles de blocs colorés), reprenant directement la composition de la charte.

---

## 3. Direction artistique : vivante et animée

Retour client : le site doit être **attrayant et animé**, pas trop simple. Animations légères en CSS
(aucune bibliothèque JS d'animation), toutes désactivées avec `prefers-reduced-motion`.

- **Hero d'accueil = carrousel horizontal automatique** (`HeroSlider.astro`) : 5 diapositives, 6 s chacune,
  glissement horizontal, barres de progression, boutons précédent / pause / suivant, glisser au doigt.
  Pause au survol, au focus et quand l'onglet est caché. Zoom lent de la photo active, entrée du texte en cascade.
  **Pas** d'effet piloté par le scroll dans le hero.
- **Pages intérieures** : en-tête `PageHero.astro` (fil d'Ariane, titre, photo).
- **Apparitions au scroll** : attribut `data-reveal` (`""`, `left`, `right`, `zoom`) + délai `--d`, géré par `src/scripts/ui.ts`.
- **Bandeau défilant** : catégories uniquement (2 lignes en sens opposés). Pas de bandeau de mots dans le footer (retiré à la demande du client).
- **Pas de boucle animée** ni de point vert devant les surtitres (`.kicker`) ou devant « App bientôt disponible » (retirés à la demande du client).
- **Micro-interactions** : cartes qui s'élèvent (`.lift`), icônes qui pivotent, flèches qui glissent, téléphones qui flottent.
- **Transitions entre pages** : Astro View Transitions (`ClientRouter`).
- **Navigation** : l'onglet de la page active est en pastille verte (desktop) ou en bloc vert (menu mobile).
- Étapes cliquables de l'application (Publier, Commander, Être livré) qui changent l'**aperçu statique** du téléphone.

Photos : générées à partir des prompts de [`PROMPTS_IMAGES.md`](PROMPTS_IMAGES.md), déposées dans
`public/images/hero/` et `public/images/pages/`. Tant qu'une photo manque, `Visual.astro` affiche un visuel
de remplacement aux couleurs de la charte. La photo du fondateur doit être une **vraie** photo.

---

## 4. Arborescence (site multipage)

Chaque entrée du menu a **sa propre page** (retour client : pas de site monopage).

```
/                    Accueil : carrousel, qui sommes-nous, 5 piliers, parcours de l'app, publics, catégories, appel à contact
/mission             Mission : constat, économie circulaire, valeurs, fondateur, vision
/ce-que-fait-butus   Les 5 piliers détaillés (ancres #vendre…), parcours, états des objets, publics, engagements, catégories
/application         Fonctionnalités, parcours, galerie d'écrans, publics, feuille de route (sans dates), FAQ
/contact             Canaux (e-mail, téléphone, WhatsApp), raisons de nous écrire (mailto avec objet prérempli),
                     infos pratiques (ville, horaires TODO, langue, réseaux), FAQ
/mentions-legales
/404
```
Aucun formulaire, même sur la page Contact : uniquement des liens directs.
Aucune donnée personnelle n'est collectée, donc pas de bannière cookies (si les statistiques restent sans cookies).

---

## 5. Contraintes techniques

### Performance (public mobile, réseaux 3G/4G, smartphones d'entrée de gamme)
- Lighthouse mobile ≥ 95 sur les 4 scores.
- JS minimal (un seul script `ui.ts`, quelques Ko). Animations en CSS uniquement (transform / opacity).
- Photos en WebP/JPG ≤ 300 Ko, lazy-loading hors première diapositive.

### Stack retenue
- **Astro 5** en sortie 100 % statique, avec View Transitions. Pas de backend.
- **Tailwind CSS 4** : tokens de la charte dans `@theme` (`src/styles/global.css`).
- Polices : `@fontsource-variable/roboto` (logo, texte) et `@fontsource-variable/bricolage-grotesque` (titres).
- Contenus partagés (menu, contact, piliers, diapositives) : `src/data/site.ts`.

### Structure du projet
```
butus_public/
├─ CLAUDE.md, PROMPTS_IMAGES.md
├─ public/            favicon, og-image.png, robots.txt, images/hero/, images/pages/
└─ src/
   ├─ data/site.ts          menu, contact, catégories, piliers, diapositives
   ├─ lib/images.ts         détection des photos présentes
   ├─ scripts/ui.ts         apparitions, en-tête, menu mobile, carrousel, étapes, haut de page
   ├─ styles/global.css     tokens charte + utilitaires d'animation
   ├─ layouts/Base.astro    SEO, OG, JSON-LD, Header, Footer, transitions
   ├─ components/           Header, Footer, HeroSlider, PageHero, Visual, Pillars, AppTeaser,
   │                        Audience, Trust, CategoriesMarquee, CtaBand, Faq, Phone, PhoneScreens, Logo
   └─ pages/                index, mission, ce-que-fait-butus, application, contact, mentions-legales, 404
```

### SEO et partage
- Langue : `fr`. Titre : « BUTUS — Seconde main et économie circulaire au Togo ».
- JSON-LD : `Organization` (avec `contactPoint` et `sameAs` pour les réseaux sociaux).
- Image Open Graph 1200×630 (`public/og-image.png`) : « BUTUS » sur fond forest. Indispensable pour le partage sur WhatsApp.
- `sitemap.xml`, `robots.txt`, URL canonique `https://butus.org`.

### Accessibilité
- WCAG 2.2 AA : contrastes vérifiés, focus visible, navigation au clavier, `alt` sur toutes les images.
- Textes simples et courts.

### Hébergement et déploiement
- Hébergeur retenu : **Hostinger** (plan Cloud Startup, site `butus.org`, domaine enregistré chez Hostinger).
- Déploiement automatique : GitHub Actions construit `dist/` puis l'envoie par rsync/SSH dans le
  `public_html` du site à chaque push sur `main`. Procédure complète dans [`README.md`](README.md).
- HTTPS forcé et `www` → apex en 301 via `public/.htaccess`.
- ⚠️ `api.butus.org` est servi depuis `public_html/api` (lien vers `../butus-api/public`) : le déploiement l'exclut de `--delete`, et chaque règle du `.htaccess` doit rester sans effet sur l'API.
- Le compte d'hébergement doit appartenir à BUTUS et pas au compte personnel d'une seule personne.

---

## 6. Règles pour Claude dans ce dossier

- **Ne jamais ajouter de formulaire, de champ de saisie, d'inscription, de connexion, de panier, de
  catalogue ni de recherche de produits**, même « pour plus tard ». Le seul moyen de contact, ce sont
  des liens directs (mailto, tel, WhatsApp, réseaux sociaux).
- Parler de l'application **au futur** (« permettra », « bientôt »). Ne jamais laisser croire qu'on peut
  déjà acheter ou vendre sur le site.
- Toujours respecter la charte (§2). Ne jamais introduire de nouvelle couleur de marque ni de police autre que Roboto et Bricolage Grotesque.
- Ne jamais inventer de chiffres, de témoignages, de logos partenaires ou de dates de lancement. Utiliser des emplacements `TODO:` visibles.
- Rédiger en français simple, au vouvoiement, avec des phrases courtes.
- Mobile-first : concevoir à 360 px d'abord, puis élargir.
- Avant de considérer une section terminée : vérifier le rendu à 360 px et à 1440 px, avec `reduced-motion` activé, puis lancer Lighthouse.
- Utiliser le skill `frontend-design` pour toute création ou refonte d'interface.

## 7. Questions ouvertes (à valider avec BUTUS)
- [ ] Date ou période de lancement à afficher (ou seulement « bientôt »)
- [ ] Liens des réseaux sociaux ; le numéro WhatsApp est-il le même que le téléphone ?
- [ ] Photos réelles et captures ou maquettes des écrans de l'app (Figma ?)
- [ ] Statistiques d'impact à afficher
- [ ] Informations légales pour les mentions légales (statut, adresse, responsable de publication)
