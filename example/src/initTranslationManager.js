import {TranslationManager} from "translation-manager";
import languageCodes      from "./translations/languageCodes.json";
import translations       from "./translations/translations.json";

TranslationManager.initData( languageCodes, translations );

TranslationManager.setAppLanguage( "en" );
if ( process.env.REACT_APP_ENV !== "prod" )
    TranslationManager.verifyJson({ redundantCheck: false });
