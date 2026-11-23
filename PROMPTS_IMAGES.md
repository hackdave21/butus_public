# Prompts des photos des heros — BUTUS

Chaque photo apparaît automatiquement sur le site dès qu'elle est déposée au bon endroit, avec le bon nom.
Formats acceptés : `.jpg`, `.png`, `.webp` ou `.avif`. Tant qu'une photo manque, un visuel de remplacement
vert ou jaune s'affiche.

## Règles communes (à garder pour toutes les images)

- **Format** : paysage **4:3**, au moins **1600 × 1200 px**. Exporter en `.webp` ou `.jpg` qualité 80, sous 300 Ko (le site doit rester léger).
- **Cadrage** : sujet principal **au centre**, avec de la marge sur les côtés. Sur mobile, l'image est recadrée en bandeau horizontal.
- **Style** : photo réaliste et naturelle, lumière du jour chaude, Lomé (Togo), personnes togolaises, ambiance positive et authentique.
- **Couleurs** : touches de vert foncé `#173A34`, vert vif `#24B158` et jaune `#F2A900` (vêtements, objets, murs), pour s'accorder à la charte.
- **Interdits** : pas de texte, pas de logo, pas de filigrane, pas de marque visible sur les objets, pas d'interface d'application inventée sur les écrans.

Le bloc à ajouter à la fin de chaque prompt :

```
photorealistic, natural daylight, warm tones, shot on 35mm, shallow depth of field, authentic West African setting in Lomé, Togo, subtle accents of deep forest green (#173A34), bright green (#24B158) and golden yellow (#F2A900), clean uncluttered composition, subject centered, 4:3 landscape, no text, no logo, no watermark, no brand names
```

---

## Accueil : carrousel (`public/images/hero/`)

### 1. `accueil-1.jpg` : « Donnez une seconde vie à vos objets »
```
A smiling young Togolese woman in her twenties holding a second-hand smartphone in both hands, standing in a lively open-air market in Lomé, colorful stalls softly blurred behind her, she wears a deep green wax-print top with yellow patterns, joyful and confident expression, medium shot
```
+ bloc commun

### 2. `accueil-2.jpg` : « Vendez ce qui ne vous sert plus »
```
A Togolese man in his thirties crouching in a bright, simple living room, taking a photo with his smartphone of a solid wooden chair he wants to sell, a few other household items neatly arranged nearby, yellow painted wall in the background, focused and pleased expression, medium-wide shot
```
+ bloc commun

### 3. `accueil-3.jpg` : « Achetez malin, achetez d'occasion »
```
A Togolese woman in her forties carefully examining a refurbished laptop in a tidy small second-hand shop in Lomé, shelves with neatly sorted used electronics, books and shoes behind her, the friendly shop owner smiling in the soft-focus background, green shelving, satisfied expression, medium shot
```
+ bloc commun

### 4. `accueil-4.jpg` : « Livré chez vous, en toute confiance »
```
A Togolese delivery rider on a motorbike, wearing a plain bright green vest and a helmet, handing a neatly wrapped parcel to a smiling young woman at the gate of her house in a residential street of Lomé, late afternoon golden light, both smiling, medium-wide shot
```
+ bloc commun

### 5. `accueil-5.jpg` : « L'application BUTUS arrive bientôt »
```
Close-up of a young Togolese person's hands holding a modern smartphone, the screen is plain solid bright green with no text and no interface, blurred warm street scene of Lomé in the background, a yellow sleeve visible, optimistic and modern mood
```
+ bloc commun
> Écran volontairement vide : vous pourrez y incruster une vraie capture de l'application plus tard.

---

## Pages intérieures (`public/images/pages/`)

### 6. `mission.jpg` : page Mission, « Donner une seconde vie aux objets »
```
Close-up of two pairs of Togolese hands exchanging a used but well-kept object (a small radio) in a busy Lomé market, faces partly out of frame, warm and trusting gesture, colorful fabrics and goods softly blurred around, green and yellow tones
```
+ bloc commun

### 7. `ce-que-fait-butus.jpg` : page Ce que fait BUTUS
```
Interior of a bright, well-organized second-hand shop in Lomé, wooden shelves with neatly sorted used phones, laptops, shoes, books and small furniture, a Togolese shopkeeper arranging items with care, a yellow accent wall and green shelves, inviting and orderly atmosphere, wide shot
```
+ bloc commun

### 8. `application.jpg` : page L'application
```
A young Togolese man sitting on a low wall in a sunny street of Lomé, smiling while scrolling on his smartphone, the screen faces away from the camera, wearing a deep green t-shirt, yellow motorbike-taxi softly blurred in the background, relaxed and modern mood, medium shot
```
+ bloc commun

### 9. `contact.jpg` : page Contact
```
A friendly Togolese woman in her thirties wearing a headset, smiling while talking on the phone at a clean desk in a bright modern office in Lomé, laptop open, a green plant and a yellow notebook on the desk, welcoming customer-service atmosphere, medium shot
```
+ bloc commun

---

## À ne pas générer

- `public/images/pages/fondateur.jpg` : **vraie photo** de Gedeon Essodonn BATAWOLO (portrait, format 4:5 ou 4:3).
  Une image générée d'une personne réelle serait trompeuse.

## Rappel des emplacements

| Fichier | Où il apparaît |
|---|---|
| `public/images/hero/accueil-1.jpg` à `accueil-5.jpg` | Carrousel de la page d'accueil |
| `public/images/pages/mission.jpg` | En-tête de la page Mission |
| `public/images/pages/ce-que-fait-butus.jpg` | En-tête de la page Ce que fait BUTUS |
| `public/images/pages/application.jpg` | En-tête de la page L'application |
| `public/images/pages/contact.jpg` | En-tête de la page Contact |
| `public/images/pages/fondateur.jpg` | Bloc « Le fondateur » de la page Mission (vraie photo) |
