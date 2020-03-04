# translationManager-react
An React wrapper of [translationManager](https://github.com/ecadagiani/translationManager)


## Setup:
0. `npm i translation-manager && npm i translation-manager-react`

1. Create a folder `/translations` in your project (or copy [translationsExample](./translationsExample) from this repo)

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



## API
### Text



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
