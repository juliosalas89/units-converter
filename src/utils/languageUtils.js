import langData from '../appData/traduction.json'

const translate = (language, string) => {
    return !language ? string : langData.phrases[string] ? langData.phrases[string][language -1] : null
}

export { translate }