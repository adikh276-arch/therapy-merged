import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import pt from './translations/pt.json';
import de from './translations/de.json';
import ar from './translations/ar.json';
import hi from './translations/hi.json';
import bn from './translations/bn.json';
import zh from './translations/zh.json';
import ja from './translations/ja.json';
import id from './translations/id.json';
import tr from './translations/tr.json';
import vi from './translations/vi.json';
import ko from './translations/ko.json';
import ru from './translations/ru.json';
import it from './translations/it.json';
import pl from './translations/pl.json';
import th from './translations/th.json';
import tl from './translations/tl.json';

const resources = {
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
    pt: { translation: pt },
    de: { translation: de },
    ar: { translation: ar },
    hi: { translation: hi },
    bn: { translation: bn },
    zh: { translation: zh },
    ja: { translation: ja },
    id: { translation: id },
    tr: { translation: tr },
    vi: { translation: vi },
    ko: { translation: ko },
    ru: { translation: ru },
    it: { translation: it },
    pl: { translation: pl },
    th: { translation: th },
    tl: { translation: tl }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            lookupQuerystring: 'lang',
            caches: ['localStorage', 'cookie'],
        }
    });

export default i18n;
