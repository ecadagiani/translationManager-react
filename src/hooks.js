import { TranslationManager }           from "translation-manager";
import { useEffect, useMemo, useState } from "react";


export function useTranslationManager () {
    const [appLanguage, setAppLanguage] = useState( TranslationManager.getAppLanguage());

    useEffect(() => {
        return TranslationManager.onAppLanguageUpdate( setAppLanguage );
    }, []);
    return TranslationManager;
}

export function useTextCode ( textCode, options, useDynamicText = false ) {
    const [appLanguage, setAppLanguage] = useState( TranslationManager.getAppLanguage());

    useEffect(() => {
        return TranslationManager.onAppLanguageUpdate( setAppLanguage );
    }, []);

    return useMemo(() => {
        return TranslationManager.getText( textCode, options, useDynamicText );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textCode, options, useDynamicText, appLanguage]);
}
