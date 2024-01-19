import en from './en.json';
import ru from './ru.json';
import az from './az.json';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const resources = {
    EN: {
        translation: en,
    },
    AZ: {
        translation: az,
    },
    RU: {
        translation: ru,
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'EN',
    fallbackLng: 'EN',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;

// {t("Edit")}
// const {t} = useTranslation();
// import { useTranslation } from "react-i18next";