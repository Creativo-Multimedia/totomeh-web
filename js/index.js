import injectAll from './injectHTML.js'
import scrollToTop from './scrollToTop.js'
import removeLoader from './removeLoader.js'

const d = document

d.addEventListener('DOMContentLoaded', e => {
    injectAll()
    removeLoader()
    scrollToTop('.scroll-top-btn')
})