import React                  from "react";
import PropTypes              from "prop-types";
import parse                  from "html-react-parser";
import { TranslationManager } from "translation-manager";
import { isComponent }        from "@ecadagiani/reacttools";

import { useTextCode } from "./hooks";


const Text = ({
    textCode,
    className,
    plural = false,
    interrogation = false,
    special: _special,
    language = null,
    option = null,
    insertValues = null,
    html = false,
    ExtraContent = null,
    capitalize = false,
    capitalizeWord = false,
    capitalizeSentence = false,
    uppercase = false,
    lowercase = false,
}) => {
    let special = _special;
    special = plural ? "plural" : special;
    special = interrogation ? "interrogation" : special;

    let _option = option;
    if ( capitalize ) _option = TranslationManager.textOptions.capitalize;
    if ( capitalizeWord ) _option = TranslationManager.textOptions.capitalizeWord;
    if ( capitalizeSentence ) _option = TranslationManager.textOptions.capitalizeSentence;
    if ( uppercase ) _option = TranslationManager.textOptions.uppercase;
    if ( lowercase ) _option = TranslationManager.textOptions.lowercase;

    let text = useTextCode( textCode, { special, language, option: _option, insertValues });
    if ( html ) text = parse( text );

    return (
        <span className={className} data-textcode={textCode}>
            {text ? text : textCode}
            {isComponent( ExtraContent ) ? <ExtraContent/> : ExtraContent}
        </span>
    );
};

Text.options = TranslationManager.textOptions;

Text.propTypes = {
    className:          PropTypes.string,
    textCode:           PropTypes.string,
    language:           PropTypes.string,
    insertValues:       PropTypes.object,
    option:             PropTypes.oneOf( Object.values( TranslationManager.textOptions )),
    special:            PropTypes.string,
    ExtraContent:       PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.string, PropTypes.number]),
    plural:             PropTypes.bool,
    interrogation:      PropTypes.bool,
    html:               PropTypes.bool,
    capitalize:         PropTypes.bool,
    capitalizeWord:     PropTypes.bool,
    capitalizeSentence: PropTypes.bool,
    uppercase:          PropTypes.bool,
    lowercase:          PropTypes.bool,
};

export default Text;
