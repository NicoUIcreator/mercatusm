export type Language = 'en' | 'es' | 'it';

export interface Product {
  id: string;
  name: Record<Language, string>;
  price: number;
  description: Record<Language, string>;
  features: Record<Language, string[]>;
  image: string; // URL
  category: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending';
}

export interface TranslationDictionary {
  heroTitle: string;
  heroSubtitle: string;
  ctaButton: string;
  featuresTitle: string;
  addToCart: string;
  buyNow: string;
  askAi: string;
  aiPlaceholder: string;
  aiDisclaimer: string;
  footerText: string;
  loading: string;
  close: string;
  // Reviews
  reviewsTitle: string;
  writeReview: string;
  filterAll: string;
  submitReview: string;
  namePlaceholder: string;
  commentPlaceholder: string;
  reviewPending: string;
  noReviews: string;
  rating: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    heroTitle: "MERCATUS MAXIMUS",
    heroSubtitle: "UBI ORITUR FUTUR",
    ctaButton: "Explore Collection",
    featuresTitle: "Specifications",
    addToCart: "Add to Cart",
    buyNow: "Buy Now",
    askAi: "Ask AI Assistant",
    aiPlaceholder: "Ask about this product...",
    aiDisclaimer: "AI generated response. Verify details before purchase.",
    footerText: "© 2024 Mercatus Maximus. Future Commerce.",
    loading: "Initializing...",
    close: "Close",
    reviewsTitle: "Customer Transmissions",
    writeReview: "Transmit Review",
    filterAll: "All Signals",
    submitReview: "Upload Data",
    namePlaceholder: "Operator Name",
    commentPlaceholder: "Share your experience...",
    reviewPending: "Awaiting Moderation",
    noReviews: "No transmissions received yet.",
    rating: "Rating"
  },
  es: {
    heroTitle: "MERCATUS MAXIMUS",
    heroSubtitle: "UBI ORITUR FUTUR",
    ctaButton: "Explorar Colección",
    featuresTitle: "Especificaciones",
    addToCart: "Añadir al Carrito",
    buyNow: "Comprar Ahora",
    askAi: "Preguntar a la IA",
    aiPlaceholder: "Pregunta sobre este producto...",
    aiDisclaimer: "Respuesta generada por IA. Verifique detalles.",
    footerText: "© 2024 Mercatus Maximus. Comercio Futuro.",
    loading: "Inicializando...",
    close: "Cerrar",
    reviewsTitle: "Transmisiones de Clientes",
    writeReview: "Transmitir Reseña",
    filterAll: "Todas las Señales",
    submitReview: "Subir Datos",
    namePlaceholder: "Nombre de Operador",
    commentPlaceholder: "Comparte tu experiencia...",
    reviewPending: "Pendiente de Moderación",
    noReviews: "No se han recibido transmisiones aún.",
    rating: "Valoración"
  },
  it: {
    heroTitle: "MERCATUS MAXIMUS",
    heroSubtitle: "UBI ORITUR FUTUR",
    ctaButton: "Esplora Collezione",
    featuresTitle: "Specifiche",
    addToCart: "Aggiungi al Carrello",
    buyNow: "Compra Ora",
    askAi: "Chiedi all'IA",
    aiPlaceholder: "Chiedi di questo prodotto...",
    aiDisclaimer: "Risposta generata dall'IA. Verificare i dettagli.",
    footerText: "© 2024 Mercatus Maximus. Commercio Futuro.",
    loading: "Inizializzazione...",
    close: "Chiudi",
    reviewsTitle: "Trasmissioni Clienti",
    writeReview: "Trasmetti Recensione",
    filterAll: "Tutti i Segnali",
    submitReview: "Carica Dati",
    namePlaceholder: "Nome Operatore",
    commentPlaceholder: "Condividi la tua esperienza...",
    reviewPending: "In Attesa di Moderazione",
    noReviews: "Nessuna trasmissione ricevuta ancora.",
    rating: "Valutazione"
  }
};