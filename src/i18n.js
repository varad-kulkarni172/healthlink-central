// client/src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "Welcome": "Welcome to HealthLink Central",
            "Login": "Login",
            "Register": "Register",
            "Aadhar Number": "Aadhar Number",
            "Password": "Password",
            "Name": "Name",
            "Upload": "Upload",
            // Add English translations for user types
            "Normal Patient": "Normal Patient",
            "Forum User": "Forum User",
            "Fam Doc": "Fam Doc",
            "Hospital Doc": "Hospital Doc",
            "Nurse/Ward Boy": "Nurse/Ward Boy",
            "Pharmacy": "Pharmacy",
            "Lab Staff": "Lab Staff"
        }
    },
    hi: {
        translation: {
            "Welcome": "हेल्थलिंक सेंट्रल में आपका स्वागत है",
            "Login": "लॉगिन",
            "Register": "रजिस्टर",
            "Aadhar Number": "आधार नंबर",
            "Password": "पासवर्ड",
            "Name": "नाम",
            "Upload": "अपलोड",
            // Add Hindi translations for user types
            "Normal Patient": "साधारण मरीज",
            "Forum User": "फोरम उपयोगकर्ता",
            "Fam Doc": "परिवार के डॉक्टर",
            "Hospital Doc": "अस्पताल डॉक्टर",
            "Nurse/Ward Boy": "नर्स/वार्ड बॉय",
            "Pharmacy": "फार्मेसी",
            "Lab Staff": "लैब स्टाफ"
        }
    },
    mar: {
        translation: {
            "Welcome": "हेल्थलिंक सेंट्रल मध्ये आपला स्वागत आहे",
            "Login": "लॉगिन",
            "Register": "रजिस्टर",
            "Aadhar Number": "आधार नंबर",
            "Password": "पासवर्ड",
            "Name": "नाव",
            "Upload": "अपलोड",
            // Add Marathi translations for user types
            "Normal Patient": "सामान्य रुग्ण",
            "Forum User": "फोरम वापरकर्ता",
            "Fam Doc": "कुटुंब डॉक्टर",
            "Hospital Doc": "रुग्णालयातील डॉक्टर",
            "Nurse/Ward Boy": "नर्स/वार्ड बॉय",
            "Pharmacy": "फार्मसी",
            "Lab Staff": "लॅब स्टाफ"
        }
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
