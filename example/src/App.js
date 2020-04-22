import React from "react";

import { Text, useTranslationManager, useTextCode } from "translation-manager-react";
import { TranslationManager }                       from "translation-manager";
import textCodes                                    from "./translations/textCodes";


const WithText = () => {
    return (
        <div>
            withText: <b><Text textCode={textCodes.CATEGORY} uppercase/></b>
        </div>
    );
};

const WithHooksTranslationManager = () => {
    const TranslationManager = useTranslationManager();
    return (
        <div>
            with hooks useTranslationManager: <b>{TranslationManager.getText( textCodes.CATEGORY )}</b>
        </div>
    );
};

const WithHooksTextCode = () => {
    const text = useTextCode( textCodes.CATEGORY );
    return (
        <div>
            with hooks useTextCode: <b>{text}</b>
        </div>
    );
};

const App = ( props ) => {
    function setToFr () {
        TranslationManager.setAppLanguage( "fr" );
    }

    function setToEn () {
        TranslationManager.setAppLanguage( "en" );
    }

    return (
        <div>
            <span>
                <WithText/>
                <WithHooksTranslationManager/>
                <WithHooksTextCode/>
            </span>
            <div>
                <button onClick={setToFr}>FR</button>
                <button onClick={setToEn}>EN</button>
            </div>
        </div>
    );
};
export default App;
