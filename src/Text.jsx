import React                  from "react";
import PropTypes              from "prop-types";
import ReactHtmlParser        from "react-html-parser";
import { TranslationManager } from "translation-manager";
import { isComponent }        from "@ecadagiani/reacttools";


const Text = ({
    textCode,
    className,
    plural = false,
    interrogation = false,
    special: _special,
    language = null,
    option = null,
    insertValues = null,
    react = false,
    ExtraContent = null,
}) => {
    let special = _special;
    special = plural ? "plural" : special;
    special = interrogation ? "interrogation" : special;

    let text = TranslationManager.getText( textCode, { special, language, option, insertValues });
    if ( react ) text = ReactHtmlParser( text );

    return (
        <span className={className} data-textcode={textCode}>
            {text ? text : textCode}
            {isComponent( ExtraContent ) ? <ExtraContent/> : ExtraContent}
        </span>
    );
};

Text.options = TranslationManager.textOptions;

Text.propTypes = {
    className:     PropTypes.string,
    textCode:      PropTypes.string,
    language:      PropTypes.string,
    insertValues:  PropTypes.object,
    option:        PropTypes.oneOf( Object.values( TranslationManager.textOptions )),
    special:       PropTypes.string,
    ExtraContent:  PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
    plural:        PropTypes.bool,
    interrogation: PropTypes.bool,
    react:         PropTypes.bool,
};

export default Text;
