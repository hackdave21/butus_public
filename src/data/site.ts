// Contenus partagés du site vitrine BUTUS.

export const nav = [
  { href: '/', label: 'Accueil' },
  { href: '/mission', label: 'Mission' },
  { href: '/ce-que-fait-butus', label: 'Ce que fait BUTUS' },
  { href: '/application', label: "L'application" },
  { href: '/contact', label: 'Contact' },
];

export const contact = {
  email: 'butus.tg@gmail.com',
  phone: '+228 98 92 32 95',
  phoneHref: 'tel:+22898923295',
  // TODO: confirmer que le numéro WhatsApp est le même que le téléphone
  whatsapp: 'https://wa.me/22898923295',
  city: 'Lomé, Togo',
  // TODO: liens des réseaux sociaux à fournir par BUTUS (laisser vide = non affiché)
  socials: [
    { label: 'Facebook', href: '' },
    { label: 'Instagram', href: '' },
    { label: 'TikTok', href: '' },
    { label: 'LinkedIn', href: '' },
  ],
};

export const categories = [
  'Téléphones', 'Ordinateurs', 'Électronique', 'Électroménager', 'Meubles', 'Vêtements',
  'Chaussures', 'Livres', 'Articles scolaires', 'Maison', 'Matériel professionnel',
];

export const pillars = [
  {
    id: 'vendre',
    verbe: 'Vendre',
    court: "Ce qui ne vous sert plus peut servir à quelqu'un d'autre, et vous rapporter de l'argent.",
    long: "Un téléphone remplacé, un meuble en trop, des vêtements devenus petits : publiez-les en quelques photos. BUTUS s'occupe de la mise en relation avec l'acheteur et de la livraison.",
  },
  {
    id: 'acheter',
    verbe: 'Acheter',
    court: "Des objets de qualité, d'occasion ou reconditionnés, à un meilleur prix.",
    long: "Trouvez ce dont vous avez besoin près de chez vous. L'état de chaque objet est clairement indiqué, et BUTUS confirme chaque vente avant la livraison.",
  },
  {
    id: 'reutiliser',
    verbe: 'Réutiliser',
    court: 'Prolonger la vie des objets plutôt que de les jeter.',
    long: "Chaque objet réutilisé, c'est un objet de moins à fabriquer et un déchet de moins dans nos rues. La seconde main est le geste écologique le plus simple.",
  },
  {
    id: 'reparer',
    verbe: 'Réparer',
    court: "Un objet abîmé a encore de la valeur.",
    long: "Les objets « à réparer » ont leur place sur BUTUS. Ils trouvent preneur auprès de bricoleurs et de réparateurs, qui leur redonnent une utilité.",
  },
  {
    id: 'valoriser',
    verbe: 'Valoriser',
    court: 'Transformer ce qui semblait perdu en ressource.',
    long: "Ce qui ne peut plus servir tel quel devient matière ou pièce détachée. BUTUS veut créer de la valeur et des opportunités économiques à chaque étape.",
  },
];

/* Diapositives du carrousel d'accueil. L'image est cherchée dans public/images/hero/<id>.(webp|jpg|png).
   Les prompts de génération sont dans PROMPTS_IMAGES.md. */
export const heroSlides = [
  {
    id: 'accueil-1',
    titre: 'Donnez une seconde vie à vos objets',
    texte: "BUTUS est une initiative togolaise d'économie circulaire. Notre application mobile arrive bientôt.",
    lien: { href: '/mission', label: 'Découvrir BUTUS' },
    tone: 'forest',
  },
  {
    id: 'accueil-2',
    titre: 'Vendez ce qui ne vous sert plus',
    texte: 'Quelques photos, un prix, et votre objet trouve un nouveau propriétaire.',
    lien: { href: '/ce-que-fait-butus', label: 'Voir ce que fait BUTUS' },
    tone: 'yellow',
  },
  {
    id: 'accueil-3',
    titre: "Achetez malin, achetez d'occasion",
    texte: "Des objets vérifiés, à meilleur prix, près de chez vous.",
    lien: { href: '/ce-que-fait-butus', label: 'Comment ça marche' },
    tone: 'green',
  },
  {
    id: 'accueil-4',
    titre: 'Livré chez vous, en toute confiance',
    texte: "Un livreur BUTUS récupère l'objet et vous le remet. Vous suivez chaque étape.",
    lien: { href: '/application', label: "Découvrir l'application" },
    tone: 'forest',
  },
  {
    id: 'accueil-5',
    titre: "L'application BUTUS arrive bientôt",
    texte: "Bientôt sur Android, puis sur iPhone. Simple, même si vous n'avez jamais acheté en ligne.",
    lien: { href: '/application', label: "Voir l'application" },
    tone: 'yellow',
  },
] as const;
