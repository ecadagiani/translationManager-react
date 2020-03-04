# translationManager-react
An React wrapper of [translationManager](https://github.com/ecadagiani/translationManager)

[demo](https://codesandbox.io/s/demotranslationmanagerreact-yro9g)

## Setup:
0. `npm i translation-manager && npm i translation-manager-react`

1. Create a folder `/translations` in your project (or copy [translationsExample](./example/src/translations) from this repo)

2. Under this `/translations` folder create this tree:
    - `/translations`
        - `/languages`
            - `/english`
                - `codes.json`
                - ...any other json file
            - `/french`
                - `codes.json`
                - ...any other json file
            - ...any other language

    2.1 The files `codes.json` contains all the language codes used to target this language,
    example for english `["en","EN","en-us","en-US"]`

    2.2 Next to the `codes.json` file you can create any other json file (with the name you want),
    these files will contain the translations:
    example:
     ```json
    {
        "ADD": {
            "value": "add"
        },
        "CATEGORY": {
            "value": "category",
            "plural": "categories"
        },
        "<textCode>": {
            "value": "text",
            "<special>": "textSpecial"
        }
    }
    ```
    - you have an json-schema [here](./translationsExample/languageSchema.json)

    - \<special\>: is any variant of your original text (plural, interrogative, ...)

3. execute this command `build-translations <path to your translations folder>`,
to create `languageCodes.json`, `textCodes.json`, `translations.json`. These three
files are the compilation of the previous files.

4. In your project, create a file `initTranslations.js`:
    ```javascript
    const {TranslationManager} = require("translation-manager");
    const languageCodes        = require("translations/languageCodes");
    const translations         = require("translations/translations");

    TranslationManager.initData( languageCodes, translations );
    TranslationManager.setAppLanguage( "en" );
    // check Error
    if ( process.env.ENVIRONMENT !== "prod" )
        TranslationManager.verifyJson({ redundantCheck: false });
    ```
    **IMPORTANT**:
    Import `initTranslations.js` in first, in the entrance file of your app.
    So that `TranslationManager.initData` always takes place before usage of TranslationManager

5. Finish, you can use TranslationManager:
    ```javascript
   // todo
    ```

6. Add shortcuts to the commands in your `package.json` scripts
    ```json
    {
        "scripts": {
            "build-translations": "build-translations ./translations",
            "watch-translation": "watch-translations ./translations",
            "clean-translation": "clean-translations ./translations english true true"
        }
    }
    ```

## Notes
### TranslationManager.getText
`TranslationManager.getText` does not actually return a string,
it returns an instance of the TranslationText class. TranslationText is an extends of String.
But you can use it like a string, all the methods of the string class are available,
you can Jsonify, concat, split, trim...

However:
- `typeof` return "object"
- if you print it, in the console, it display all the object
- to avoid memory link, if you no longer need a text, think to do `monTexte.destroy()`

### insertValues
You can insert values in your text, translationManager use [lodash template](https://lodash.com/docs/4.17.15#template).
In your text in json file, add `${<keyName>}`.
When you make `getText`, specify insertValue option, example:
```json
{
    "AN_ERROR_OCCURRED": {
        "value": "an error occurred: ${errorMessage}"
    }
}
```

```javascript
const err = new Error("foobar");
TranslationManager.getText(textCode.AN_ERROR_OCCURRED, {insertValues: {errorMessage: err.message}});
```

### html
You can use html tag in your text. If you use Text component, and set the props `html` to true.
An parser will convert your string in react node.

### render
To change languages dynamically, the components that own the text must be re-render,
for this, you can simply subscribe your component to `TranslatioNmanager.onLanguageUpdate()`.
But you can, more simply, use the Text component, or the hooks of this API.


## API
### [component] Text
###### props:
```javascript
Text.propTypes = {
    className:     PropTypes.string,
    textCode:      PropTypes.string, // the wanted textCode, you can find them by import the builded file: "textCodes.json"
    language:      PropTypes.string, // to force the language
    insertValues:  PropTypes.object, // an object to insert values in your text
    option:        PropTypes.oneOf( ["capitalize","capitalizeWord","capitalizeSentence","uppercase","lowercase"]), // to transform your text
    special:       PropTypes.string, // if you want a special translation example: "plural", "interogation", ...
    ExtraContent:  PropTypes.oneOfType([PropTypes.function, PropTypes.element, PropTypes.string, PropTypes.number]), // a component which will be rendered after the text
    plural:        PropTypes.bool, // to override the props special and set this to "plural"
    interrogation: PropTypes.bool, // to override the props special and set this to "interrogation"
    html:         PropTypes.bool, // if the text must be parsed
};
```
###### example:
```javascript
import React from "react";
import { Text } from "translation-manager-react";
import textCodes from "./translations/textCodes";

const DynamicNiceText = () => {
    return (
        <div>
            <Text textCode={textCodes.CATEGORY}/>
        </div>
    );
};
```
###### Notes
The Text Component wrap your text in a span, and add an `data-textcode` to this element.
To simplify your debugging, and when you add a new language


### [hooks] useTranslationManager
An hooks for use TranslationManager. This hooks subscribe your component to the language update event.
###### example:
```javascript
import React from "react";
import { useTranslationManager } from "translation-manager-react";
import textCodes from "./translations/textCodes";

const WithHooksTranslationManager = () => {
    const TranslationManager = useTranslationManager();
    return (
        <div>
            {TranslationManager.getText( textCodes.CATEGORY )}
        </div>
    );
};
```


### [hooks] useTextCode
This hook allows you to recover the text directly. It is the lightest solution,
and avoid too many re-render when the language change.
###### params:
- textCode: [String] the wanted textCode
- options: [Object]
    - options.special: ["value"] {string} the special value from the textCode to use
    - options.option: {string} an constant string (TranslationManager.textOptions=[capitalize,capitalizeWord,capitalizeSentence,uppercase,lowercase])
    - options.language: [appLanguage] {string} to force language
    - options.insertValues: {Object} an object of insert value {key: value}, in the translation text, you have to add ${<key>}
- forceString: [bool] (default true) if you want an TranslationText or an string,
keep true if you want't a light solution
###### example:
```javascript
import React from "react";
import { useTextCode } from "translation-manager-react";
import textCodes from "./translations/textCodes";

const WithHooksTextCode = () => {
    const textCode = textCodes.CATEGORY;
    const options = {special: "plural"};
    const forceString = true;
    const text = useTextCode( textCode, options, forceString );
    return (
        <div>
            {text}
        </div>
    );
};
```



## Commands
### build-translations
To build the translations files: `languageCodes.json`, `textCodes.json`, `translations.json`
```bash
$ build-translations <path_to_your_translations_folder>
```

### clean-translations
To clean your translations files (rearrange textCodes, sort them alphabetically and can transform their case)
```bash
$ build-translations <path_to_your_translations_folder> <base_folder_name> <organizeOtherLanguageLikeBase> <minimizeValueCase>
```
- path_to_your_translations_folder: path to the translation folder
- base_folder_name: the name of the language folder on which all cleaning will be based.
textCodes of other languages will be stored in the same way as the selected language. Default is "english"
- organizeOtherLanguageLikeBase: if you want to store textCode in the same way as the base language.
- minimizeValueCase: if you want to transform all value in lowerCase
```bash
example:
$ build-translations ./translations english true true
```

### watch-translations
To watch the change in folder translations, with this command effective,
any changement in translations files, trigger build-translations
```bash
$ watch-translations <path_to_your_translations_folder>
```


### TranslationManager API
[here](https://github.com/ecadagiani/translationManager/blob/master/README.md)



## Authors
- **Eden Cadagiani** for [HelloMyBot](https://hellomybot.io/fr/bienvenue/)



## License
This project is licensed under the MIT - see the [LICENSE](LICENSE) file for details
