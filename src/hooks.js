import { TranslationManager }           from "translation-manager";
import { useEffect, useMemo, useState } from "react";


export function useTranslationManager () {
    const [appLanguage, setAppLanguage] = useState( TranslationManager.getAppLanguage());

    useEffect(() => {
        return TranslationManager.onAppLanguageUpdate( setAppLanguage );
    }, []);
    return TranslationManager;
}

export function useTextCode ( textCode, options, forceString = true ) {
    const [appLanguage, setAppLanguage] = useState( TranslationManager.getAppLanguage());

    useEffect(() => {
        return TranslationManager.onAppLanguageUpdate( setAppLanguage );
    }, []);

    return useMemo(() => {
        return TranslationManager.getText( textCode, options, forceString );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textCode, options, forceString, appLanguage]);
}
