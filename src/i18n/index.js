import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './es.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', // Necesario para React Native
  resources: {
    es: { translation: es }
  },
  lng: 'es', // Idioma por defecto
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false // React ya protege contra XSS
  }
});

export default i18n;