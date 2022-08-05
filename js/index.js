import injectAll from './injectHTML.js'
import scrollToTop from './scrollToTop.js'
import contactFormValidations from './contactFormValidations.js'

const d = document

d.addEventListener('DOMContentLoaded', e => {
    injectAll()
    scrollToTop('.scroll-top-btn')
    contactFormValidations()
})