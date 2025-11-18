import { Product, Review } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: {
      en: "Neon Cyber-Visor",
      es: "Visor Cibernético Neón",
      it: "Visiera Cibernetica Neon"
    },
    price: 129.99,
    category: "Wearable",
    description: {
      en: "A lightweight, augmented reality HUD visor with day/night adaptability and smartphone sync.",
      es: "Un visor HUD de realidad aumentada ligero con adaptabilidad día/noche y sincronización con smartphone.",
      it: "Una visiera HUD leggera a realtà aumentata con adattabilità giorno/notte e sincronizzazione smartphone."
    },
    features: {
      en: ["OLED Transparent Display", "12h Battery Life", "Voice Control"],
      es: ["Pantalla OLED Transparente", "12h de Batería", "Control por Voz"],
      it: ["Display OLED Trasparente", "12h di Batteria", "Controllo Vocale"]
    },
    image: "https://picsum.photos/800/800?random=1"
  },
  {
    id: 'p2',
    name: {
      en: "Levitating Planter",
      es: "Maceta Levitante",
      it: "Fioriera Levitante"
    },
    price: 89.50,
    category: "Home Decor",
    description: {
      en: "Zero-gravity magnetic suspension planter. Rotates 360 degrees for uniform sunlight exposure.",
      es: "Maceta de suspensión magnética de gravedad cero. Rota 360 grados para exposición solar uniforme.",
      it: "Fioriera a sospensione magnetica a gravità zero. Ruota di 360 gradi per un'esposizione solare uniforme."
    },
    features: {
      en: ["Magnetic Levitation", "Walnut Base", "Silent Rotation"],
      es: ["Levitación Magnética", "Base de Nogal", "Rotación Silenciosa"],
      it: ["Lievitazione Magnetica", "Base in Noce", "Rotazione Silenziosa"]
    },
    image: "https://picsum.photos/800/800?random=2"
  },
  {
    id: 'p3',
    name: {
      en: "Quantum Earbuds",
      es: "Auriculares Cuánticos",
      it: "Auricolari Quantici"
    },
    price: 59.99,
    category: "Audio",
    description: {
      en: "True wireless noise-cancelling earbuds with bioluminescent charging case and instant pairing.",
      es: "Auriculares inalámbricos con cancelación de ruido, estuche de carga bioluminiscente y emparejamiento instantáneo.",
      it: "Auricolari wireless con cancellazione del rumore, custodia di ricarica bioluminescente e accoppiamento istantaneo."
    },
    features: {
      en: ["Active Noise Cancel", "IPX7 Waterproof", "Bioluminescent Case"],
      es: ["Cancelación de Ruido Activa", "Impermeable IPX7", "Estuche Bioluminiscente"],
      it: ["Cancellazione Attiva Rumore", "Impermeabile IPX7", "Custodia Bioluminescente"]
    },
    image: "https://picsum.photos/800/800?random=3"
  },
  {
    id: 'p4',
    name: {
      en: "Holographic Projector",
      es: "Proyector Holográfico",
      it: "Proiettore Olografico"
    },
    price: 249.00,
    category: "Tech",
    description: {
      en: "Portable 3D fan projector capable of displaying floating 3D assets controlled via mobile app.",
      es: "Proyector de ventilador 3D portátil capaz de mostrar activos 3D flotantes controlados por app móvil.",
      it: "Proiettore a ventola 3D portatile in grado di visualizzare risorse 3D fluttuanti controllate via app mobile."
    },
    features: {
      en: ["4K Resolution Support", "Wifi Enabled", "App Controlled"],
      es: ["Soporte Resolución 4K", "Wifi Habilitado", "Controlado por App"],
      it: ["Supporto Risoluzione 4K", "Abilitato Wifi", "Controllato da App"]
    },
    image: "https://picsum.photos/800/800?random=4"
  },
  {
    id: 'p5',
    name: {
      en: "Smart LED Backpack",
      es: "Mochila LED Inteligente",
      it: "Zaino LED Intelligente"
    },
    price: 110.00,
    category: "Accessories",
    description: {
      en: "Waterproof backpack with a programmable LED pixel screen to display GIFs, text, and alerts.",
      es: "Mochila impermeable con pantalla de píxeles LED programable para mostrar GIFs, texto y alertas.",
      it: "Zaino impermeabile con schermo pixel LED programmabile per visualizzare GIF, testo e avvisi."
    },
    features: {
      en: ["Programmable Screen", "Powerbank Included", "Anti-theft Design"],
      es: ["Pantalla Programable", "Powerbank Incluido", "Diseño Antirrobo"],
      it: ["Schermo Programmabile", "Powerbank Incluso", "Design Antifurto"]
    },
    image: "https://picsum.photos/800/800?random=5"
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: 'p1',
    userName: 'CyberPunk2077',
    rating: 5,
    comment: "The HUD clarity is unreal. Totally changed my commute.",
    date: "2024-03-15",
    status: 'approved'
  },
  {
    id: 'r2',
    productId: 'p1',
    userName: 'NightOwl',
    rating: 4,
    comment: "Great tech, but the battery lasts about 10h not 12h.",
    date: "2024-03-10",
    status: 'approved'
  },
  {
    id: 'r3',
    productId: 'p2',
    userName: 'GreenThumb_X',
    rating: 5,
    comment: "Es hipnótico verla rotar. Mis plantas nunca han estado mejor.",
    date: "2024-02-28",
    status: 'approved'
  },
  {
    id: 'r4',
    productId: 'p3',
    userName: 'Audiophile_Neo',
    rating: 3,
    comment: "Sound is good, but the case is too bright for sleeping.",
    date: "2024-01-20",
    status: 'approved'
  }
];