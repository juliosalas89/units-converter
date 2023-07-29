import langData from '../appData/translation.json'
import store from '../store/store.js'

const translate = (string) => {
    language = store.getState().localParams.language
    return !language && string || langData.phrases[string] && langData.phrases[string][language -1] || null
}

export { translate }