# Prompts de génération — Héros BUTUS (proposition)

## Direction proposée

Pour que le carrousel tienne ensemble, je propose **une même journée à Lomé, en cinq lumières** :
le petit matin pour « donner une seconde vie », le plein soleil pour « vendre », la lumière douce
d'après-midi pour « acheter », le soleil couchant pour « être livré », et la tombée du jour pour
l'application. Le fil rouge n'est pas un personnage unique, mais **le geste** : tenir, photographier,
examiner, transmettre, regarder. Cinq actions simples, cinq moments, une seule promesse.

Chaque image s'insère dans un bloc de texte coloré (`forest`, `yellow`, `green`). La photo occupe
la moitié droite du hero sur desktop et un bandeau sur mobile ; elle doit donc rester lisible
même fortement recadrée.

## Format hero — contraintes communes

- **Ratio 4:3**, au moins 1600 × 1200 px. Le sujet reste dans le tiers central, avec de l'air
  à gauche et à droite (recadrage mobile).
- Export `.webp` qualité 80 (ou `.jpg`), **< 300 Ko**. Noms de fichiers exacts indiqués ci-dessous
  (`src/lib/images.ts` essaie `.webp`, `.avif`, `.jpg`, `.jpeg`, `.png`).
- Photo réaliste, lumière naturelle, Lomé (Togo), personnes togolaises, expressions sincères.
- Palette maîtrisée : vert foncé `#173A34`, vert vif `#24B158`, jaune `#F2A900` — en accents dans
  les vêtements, les murs ou les objets, jamais en filtre coloré global.
- **Aucun texte, aucun logo, aucune marque, aucun filigrane, aucune interface d'application**
  sur les écrans de téléphone.
- Si l'outil demande un paramètre de ratio : `--ar 4:3` (Midjourney) ou équivalent.

## Structure d'un prompt

Chaque prompt suit le même ordre, ce qui rend les résultats comparables :
**sujet + action → décor → lumière → palette → cadrage**. La queue commune est ajoutée à la fin.

```
editorial photorealism, authentic Lomé Togo setting, Togolese people, natural daylight, warm honest color grading, restrained accents of #173A34, #24B158 and #F2A900, center-weighted composition with clean margins on both sides, 4:3 landscape, no text, no logo, no watermark, no brand names, no app interface
```

---

## Carrousel d'accueil — `public/images/hero/`

### 1. `accueil-1.webp` — « Donnez une seconde vie à vos objets » · fond forest

Intention : l'objet a encore de la valeur ; le regard de la femme le dit avant le texte.

```
Young Togolese woman in her twenties seated at a market stall in Lomé, holding an old but well-kept smartphone up to the light and smiling at it, folded wax-print cloth and a few used objects neatly arranged on the table, soft blurred canopy above, gentle early morning light, medium portrait, warm confident expression
```

### 2. `accueil-2.webp` — « Vendez ce qui ne vous sert plus » · fond jaune

Intention : montrer que publier un objet est un geste simple, presque domestique.

```
Togolese man in his thirties in a plain yellow short-sleeve shirt, squatting on the step of his compound in Lomé, taking a photo of a solid wooden chair with his phone held sideways, a small stack of folded clothes beside him, clean white wall behind, bright midday sun with soft shadows, three-quarter wide shot, focused and pleased expression
```

### 3. `accueil-3.webp` — « Achetez malin, achetez d'occasion » · fond vert

Intention : la confiance passe par le soin apporté aux objets et au tri.

```
Togolese woman in her forties wearing a deep green headwrap, testing the keyboard of a refurbished laptop on the counter of a tidy second-hand shop in Lomé, shelves of sorted phones and books behind her, shopkeeper smiling in soft focus, soft late-afternoon window light, medium shot, satisfied and attentive expression
```

### 4. `accueil-4.webp` — « Livré chez vous, en toute confiance » · fond forest

Intention : la livraison est un service humain, pas une abstraction logistique.

```
Togolese delivery rider in a plain bright green vest and helmet, crouching at the gate of a Lomé house to place a plain kraft paper parcel within reach of a young woman leaning out of her doorway, motorbike parked at the edge of the frame, late afternoon golden light, medium-wide shot, both smiling
```

### 5. `accueil-5.webp` — « L'application BUTUS arrive bientôt » · fond jaune

Intention : faire envie sans promettre une interface qui n'existe pas encore.

```
Close-up of young Togolese hands holding a smartphone at chest height on a Lomé street at dusk, the screen glowing a flat deep forest green with no icons and no text, yellow wax-print sleeve, blurred warm stalls lights behind, optimistic modern mood, tight crop on hands and phone
```

> L'écran reste volontairement neutre : une vraie capture sera incrustée plus tard.

---

## En-têtes de pages — `public/images/pages/`

Même queue commune, même ratio 4:3. Ces quatre photos sont chargées en `eager` par `PageHero.astro`.

### 6. `mission.webp` — « Donner une seconde vie aux objets »

```
Two pairs of Togolese hands passing a small used radio across a crowded Lomé market table at first light, faces out of frame, careful trusting gesture, colorful cloth and goods softly blurred around, green and yellow accents in the fabrics, close-up on the exchange
```

### 7. `ce-que-fait-butus.webp` — « Ce que fait BUTUS »

```
Wide interior shot of a bright Lomé second-hand boutique, wooden shelves with neatly sorted phones, laptops, shoes and books, a small wooden chair in the corner, Togolese shopkeeper arranging items with care, yellow accent wall and forest green shelving, calm orderly atmosphere, natural daylight from the entrance
```

### 8. `application.webp` — « L'application »

```
Young Togolese man sitting on a low wall in a sunny Lomé street, smiling as he scrolls on his phone with the screen facing away from the camera, deep green t-shirt, yellow motorbike-taxi passing softly blurred behind, relaxed everyday mood, medium shot
```

### 9. `contact.webp` — « Contact »

```
Friendly Togolese woman in her thirties wearing a headset, smiling while speaking on the phone at a tidy desk in a bright Lomé office, laptop open, green plant and yellow notebook on the desk, light walls, welcoming service mood, medium shot
```

### 10. `pilier-vendre.webp` — bloc « Vendre » (accueil et Ce que fait BUTUS) · fond forest

Même format que le hero : **4:3, 1600 × 1200 px**, `.webp` < 300 Ko, à déposer dans `public/images/pages/`.
Tant qu'elle manque, le bloc affiche un visuel de remplacement aux couleurs de la charte.

```
Close-up of a Togolese woman's hands holding a smartphone sideways to photograph a pair of clean, well-kept used sneakers placed on a small wooden stool in a sunny Lomé courtyard, a folded wax-print cloth and a used radio waiting their turn beside the stool, plain white wall behind, soft morning light with gentle shadows, shallow depth of field, editorial photorealism, authentic Lomé Togo setting, Togolese people, natural daylight, warm honest color grading, restrained accents of #173A34, #24B158 and #F2A900, center-weighted composition with clean margins on both sides, 4:3 landscape, 1600x1200, no text, no logo, no watermark, no brand names, no app interface
```

---

## Hors génération

- `fondateur.jpg` : **vraie photo** de Gedeon Essodonn BATAWOLO. Aucune génération, aucun
  « portrait plausible » : ce serait trompeur.

## Vérification avant intégration

| Contrôle | Attendu |
|---|---|
| Ratio / poids | 4:3, < 300 Ko, fichiers dans `public/images/hero/` et `public/images/pages/` |
| Lisibilité mobile | sujet encore reconnaissant dans un bandeau de 256 px de haut |
| Texte / marque | zéro mot, zéro logo, zéro écran d'app dessiné |
| Contraste avec le bloc | photo claire sur fond `forest`, photo plus profonde sur fond `yellow`/`green` |
| Reduced motion / Lighthouse | render vérifié à 360 px et 1440 px, puis Lighthouse mobile |
