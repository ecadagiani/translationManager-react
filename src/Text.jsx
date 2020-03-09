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
}) => {
    let special = _special;
    special = plural ? "plural" : special;
    special = interrogation ? "interrogation" : special;

    let text = useTextCode( textCode, { special, language, option, insertValues });
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
    className:     PropTypes.string,
    textCode:      PropTypes.string,
    language:      PropTypes.string,
    insertValues:  PropTypes.object,
    option:        PropTypes.oneOf( Object.values( TranslationManager.textOptions )),
    special:       PropTypes.string,
    ExtraContent:  PropTypes.oneOfType([PropTypes.func, PropTypes.element, PropTypes.string, PropTypes.number]),
    plural:        PropTypes.bool,
    interrogation: PropTypes.bool,
    html:         PropTypes.bool,
};

export default Text;
