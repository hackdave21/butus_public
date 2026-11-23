# BUTUS — Site vitrine (butus.org)

Ce dossier contient le site vitrine public de **BUTUS**. Il présente l'initiative et met en avant
l'**application mobile BUTUS**, qui arrive bientôt. Ce fichier est la référence de conception : à lire
avant toute modification.

---

## 1. Contexte

**BUTUS** est une initiative togolaise d'**économie circulaire**. La plateforme aide les particuliers et
les entreprises à donner une seconde vie aux objets : vente, achat, réutilisation, réparation et valorisation.

- Signature : *« Donner une seconde vie aux objets et créer de nouvelles opportunités. »*
- Fondateur & CEO : Gedeon Essodonn BATAWOLO
- Contact public : butus.tg@gmail.com · +228 98 92 32 95
- Domaine du site vitrine : **https://butus.org**
- ⚠️ Le cahier des charges de l'app cite `https://butus.site`. Il faut décider : redirection 301 de
  butus.site vers butus.org, ou rôles distincts. Ne pas mettre les deux URL dans le contenu tant que
  ce n'est pas tranché.

### Objectifs du site (par priorité)
1. **Collecter des inscriptions à la liste d'attente** avant le lancement de l'app (KPI principal).
2. **Pré-inscrire des boutiques et des livreurs** (l'offre doit être prête au lancement).
3. Expliquer BUTUS et sa mission d'économie circulaire au Togo.
4. Inspirer confiance : BUTUS sert d'intermédiaire, les boutiques sont vérifiées, les livraisons ont une preuve.

### Publics
| Public | Ce qu'il doit comprendre | CTA |
|---|---|---|
| Particulier (acheteur / vendeur) | Vendre ses objets et acheter d'occasion simplement, depuis son téléphone | Rejoindre la liste d'attente |
| Boutique / commerçant | Une page Boutique, un catalogue, la gestion du stock et des commandes, de la visibilité | Pré-inscrire ma boutique |
| Livreur | Recevoir des missions de livraison | Devenir livreur |
| Partenaires / annonceurs / presse | Une vision et un impact | Nous contacter |

---

## 2. Charte graphique (à respecter strictement)

Ton visuel : **moderne, épuré, minimaliste**. Le mot **BUTUS** doit avoir de l'impact. On utilise des
**blocs colorés à fort contraste** (vert/blanc ou jaune/noir) avec de **grands rayons d'angle**.

### Couleurs (tokens CSS)
```css
:root {
  --butus-forest: #173A34;  /* vert profond : fonds principaux, header, footer */
  --butus-green:  #24B158;  /* vert vif : accent, « B » du logo, CTA principaux */
  --butus-white:  #FFFFFF;
  --butus-yellow: #F2A900;  /* jaune : blocs de mise en avant, CTA secondaire, badges */
  --butus-black:  #000000;  /* texte sur fond jaune, « B » du logo jaune */
}
```
- Couples autorisés : blanc sur forest, `#24B158` sur forest (titres seulement), noir sur jaune, forest sur blanc.
- **Interdit** : blanc sur `#24B158` ou blanc sur `#F2A900` pour du texte courant (contraste insuffisant).
  Sur un fond vert ou jaune, mettre le texte en noir ou en forest.
- Pas d'autres couleurs de marque. Les nuances (gris, teintes à 8–12 % d'opacité) servent seulement aux bordures et surfaces.

### Logo
Le mot `BUTUS` en Roboto Black ou Bold, sans icône. Deux variantes :
- fond forest : « **B** » en `#24B158` et « UTUS » en blanc ;
- fond jaune : « **B** » en noir et « UTUS » en blanc.
Le logo est fourni en SVG inline (texte vectorisé), jamais en image matricielle.

### Typographie
- Police unique : **Roboto**, auto-hébergée (`@fontsource-variable/roboto`), avec `font-display: swap`.
- Titres : **Bold/Black, MAJUSCULES**, interlettrage serré (`-0.02em`), taille fluide avec `clamp()`.
- Sous-titres : Regular, en minuscules ou capitales.
- Texte courant : Regular, 16–18 px, interligne 1.6.
- Le hero peut afficher « BUTUS » en très grand (jusqu'à 20–28 vw sur desktop) pour donner de l'impact.

### Formes
- Rayons : `--radius-lg: 40px` (grands blocs), `--radius-md: 24px` (cartes), `--radius-pill: 999px` (boutons, pastilles de couleur).
- Mise en page en **bento** (grilles de blocs colorés), reprenant directement la composition de la charte.

---

## 3. Direction artistique : « captivant mais minimaliste »

L'effet « wow » vient du **mouvement, de l'échelle et du contraste**, pas de l'accumulation d'éléments.

- **Hero cinétique** : « BUTUS » géant qui s'assemble lettre par lettre au chargement. Un mockup de téléphone
  avec l'écran d'accueil de l'app glisse depuis le bas.
- **Thème de la boucle / seconde vie** : un motif circulaire (flèche qui boucle) relie les sections au scroll
  et symbolise l'économie circulaire. SVG animé avec stroke-dashoffset.
- **Blocs bento qui se révèlent** au scroll (fade et translation légère, décalage de 60–80 ms entre blocs).
- **Mockups d'écrans de l'app** dans un téléphone, qui changent au scroll (section épinglée) : Accueil →
  Fiche produit → Messagerie BUTUS → Suivi de livraison.
- **Bandeau défilant** des catégories (Téléphones, Ordinateurs, Meubles, Vêtements, Livres…).
- **Micro-interactions** : boutons qui « rebondissent » légèrement, compteur de la liste d'attente.
- Toujours respecter `prefers-reduced-motion` : toutes les animations sont désactivées ou réduites à un fondu.

Photos : objets réels du quotidien togolais (téléphones, meubles, vêtements), cadrés serré sur fond uni
vert ou jaune. Pas de banques d'images génériques. En attendant les vraies photos, utiliser des illustrations
SVG simples aux couleurs de la charte.

---

## 4. Arborescence et sections

Site **one-page** + pages légales.

```
/                  Landing (sections ci-dessous)
/boutiques         Page dédiée aux boutiques (pré-inscription détaillée)   [phase 2]
/livreurs          Page dédiée aux livreurs                                [phase 2]
/mentions-legales
/confidentialite   (données de la liste d'attente)
/404
```

### Landing : ordre des sections
1. **Header** (sticky, fond forest) : logo, ancres (Mission · Comment ça marche · Pour qui · L'app · FAQ), bouton jaune « Être prévenu ».
2. **Hero** : « BUTUS » géant + accroche (*Donnez une seconde vie à vos objets.*) + sous-titre
   (*Achetez, vendez et faites livrer, simplement, depuis votre téléphone. Bientôt au Togo.*) + formulaire
   e-mail/téléphone en ligne + badge « Bientôt sur Android » (priorité Android, iOS ensuite) + mockup du téléphone.
3. **Mission / économie circulaire** : bloc bento forest/vert. Pourquoi la seconde main, et l'impact local
   (moins de déchets, plus de revenus). ⚠️ Aucun chiffre inventé : les statistiques sont des emplacements `TODO` à fournir par BUTUS.
4. **Comment ça marche** (3 étapes, blocs numérotés) :
   1. *Publiez* : photos, prix, état de l'objet.
   2. *BUTUS vous met en relation* : l'acheteur commande, BUTUS fait l'intermédiaire avec le vendeur par la messagerie interne.
   3. *Faites-vous livrer* : un livreur BUTUS récupère et livre, avec confirmation à la livraison.
5. **Pour qui ?** : 3 cartes en couleur
   - Particulier (blanc) : vendre ce qui ne sert plus, acheter malin.
   - Boutique (jaune) : page Boutique, catalogue, stock, commandes, statistiques, badge vérifié.
   - Livreur (forest) : missions, suivi, revenus.
6. **L'app en avant-première** : section épinglée, téléphone + 4 écrans + puces de fonctionnalités
   (recherche et filtres, état du produit clairement affiché, favoris, suivi de commande en temps réel, notifications).
7. **La confiance d'abord** : BUTUS est l'intermédiaire (l'acheteur ne contacte pas le vendeur directement),
   boutiques vérifiées, preuve de livraison (code, photo, signature), signalement des annonces.
8. **Catégories** : bandeau défilant.
9. **Feuille de route** : V1 (lancement) → plus tard (notation, paiement mobile intégré, suivi GPS des livreurs,
   estimation de l'impact environnemental). Formuler comme une vision, sans promettre de dates.
10. **Rejoindre** : grand bloc jaune avec 3 onglets de formulaire (Particulier / Boutique / Livreur).
11. **FAQ** (accordéon) : Quand sort l'app ? Est-ce gratuit ? Comment vendre ? Comment marche la livraison ?
    Quelles villes ? Comment payer ? Les réponses non tranchées sont signalées `TODO` pour validation par BUTUS.
12. **Footer** (forest) : logo, signature, contact, réseaux sociaux (`TODO` liens), pages légales.

### Formulaires de la liste d'attente
- Particulier : prénom, téléphone **ou** e-mail, ville.
- Boutique : nom de la boutique, responsable, téléphone, catégorie d'activité, ville.
- Livreur : nom, téléphone, zone, moyen de transport.
- Consentement explicite et lien vers `/confidentialite`. Honeypot anti-spam, pas de CAPTCHA intrusif.
- Le téléphone au format `+228` est privilégié : c'est le canal principal au Togo. L'e-mail est facultatif.

---

## 5. Contraintes techniques

### Performance (non négociable : public mobile, réseaux 3G/4G, smartphones d'entrée de gamme)
- Lighthouse mobile ≥ 95 (Performance, Accessibilité, Bonnes pratiques, SEO).
- Poids de la première page < 500 Ko transférés, JS < 100 Ko gzip.
- Images en AVIF/WebP, `srcset` responsive, lazy-loading sous la ligne de flottaison.
- Animations lancées seulement après le chargement, jamais bloquantes. LCP < 2,5 s en 4G lente.

### Stack retenue
- **Astro 5** (site statique, zéro JS par défaut, îlots seulement si nécessaire)
- **Tailwind CSS 4** : tokens de la charte dans `@theme`
- **GSAP + ScrollTrigger** pour les animations au scroll (chargé de façon différée). Variante légère : Motion One.
- **Lenis** pour un défilement doux (optionnel, désactivé avec `reduced-motion`)
- Polices : `@fontsource-variable/roboto`
- Formulaires : endpoint serverless (Cloudflare Pages Functions ou Netlify Forms) vers Google Sheets, Brevo ou Supabase. À trancher.
- Analytics respectueux de la vie privée : Plausible, Umami ou Cloudflare Web Analytics.

### Structure du projet
```
butus_public/
├─ CLAUDE.md
├─ astro.config.mjs
├─ public/            favicon, og-image.png, robots.txt
└─ src/
   ├─ styles/global.css     tokens charte + @theme Tailwind
   ├─ components/
   │  ├─ Logo.astro         (variant: forest | yellow)
   │  ├─ Header.astro / Footer.astro
   │  ├─ Hero.astro
   │  ├─ BentoGrid.astro / BentoCard.astro
   │  ├─ Steps.astro
   │  ├─ Audience.astro
   │  ├─ AppShowcase.astro  (téléphone + écrans épinglés)
   │  ├─ Trust.astro / Marquee.astro / Roadmap.astro
   │  ├─ WaitlistForm.astro (tabs Particulier/Boutique/Livreur)
   │  └─ Faq.astro
   ├─ content/        textes FAQ / roadmap (Markdown ou JSON)
   ├─ assets/         mockups d'écrans, illustrations
   ├─ layouts/Base.astro    SEO, OG, JSON-LD
   └─ pages/          index, mentions-legales, confidentialite, 404
```

### SEO et partage
- Langue : `fr` (anglais éventuel plus tard). Titre : « BUTUS — Achetez et vendez d'occasion au Togo | App bientôt disponible ».
- JSON-LD : `Organization` + `MobileApplication` (avec `operatingSystem: Android`).
- Image Open Graph 1200×630 : « BUTUS » sur fond forest avec le téléphone. Indispensable, car le partage passe beaucoup par WhatsApp.
- `sitemap.xml`, `robots.txt`, URL canonique `https://butus.org`.

### Accessibilité
- WCAG 2.2 AA : contrastes vérifiés (voir les règles de couleurs), focus visible jaune, navigation au clavier, `alt` pour toutes les images.
- Textes simples et courts : le public n'est pas forcément habitué aux applis de vente en ligne.

### Hébergement et déploiement
- **Cloudflare Pages** recommandé (gratuit, CDN avec points de présence en Afrique, fonctions pour les formulaires).
  Alternatives : Netlify ou Vercel.
- DNS de `butus.org` : CNAME vers l'hébergeur, HTTPS forcé, `www` → apex en 301.
- Le compte d'hébergement doit appartenir à BUTUS et pas au compte personnel d'une seule personne (exigence du cahier des charges, §67).

---

## 6. Règles pour Claude dans ce dossier

- Toujours respecter la charte (§2). Ne jamais introduire de nouvelle couleur de marque ni de nouvelle police.
- Ne jamais inventer de chiffres, de témoignages, de logos partenaires ou de dates de lancement. Utiliser des emplacements `TODO:` visibles dans le code.
- Ne pas exposer de coordonnées de boutiques ni de livreurs : le cahier des charges les réserve à BUTUS.
- Rédiger le contenu en français simple, au vouvoiement, avec des phrases courtes.
- Mobile-first : concevoir à 360 px d'abord, puis élargir.
- Avant de considérer une section terminée : vérifier le rendu à 360 px et à 1440 px dans le navigateur, avec `reduced-motion` activé, puis lancer Lighthouse.
- Utiliser le skill `frontend-design` pour toute création ou refonte d'interface.

## 7. Questions ouvertes (à valider avec BUTUS)
- [ ] butus.site ou butus.org : redirection ou rôles distincts ?
- [ ] Outil de stockage de la liste d'attente (Sheets, Brevo, Supabase) ?
- [ ] Villes et zones couvertes au lancement (Lomé seulement ?)
- [ ] Date ou période de lancement à afficher (ou seulement « bientôt »)
- [ ] Liens des réseaux sociaux, photos réelles, captures de l'app (maquettes Figma ?)
- [ ] Statistiques d'impact à afficher
