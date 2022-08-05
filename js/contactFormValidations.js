import { emailRecipient } from "../config.js"

const d = document

export default function contactFormValidations() {
    const $form = d.querySelector('.contact-form'),
        $inputs = d.querySelectorAll('.contact-form [required]')

    // Create validation message elements
    $inputs.forEach(input => {
        const $span = d.createElement('span')
        $span.id = input.name
        $span.textContent = input.title
        $span.classList.add('contact-form-error', 'none')
        input.insertAdjacentElement('afterend', $span)
    })

    // Validation while the user fill the inputs
    d.addEventListener('keyup', e => {
        if (e.target.matches('.contact-form [required]')) {
            let $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern // The first condition validate inputs and the second condition validate the textarea
            if (pattern && $input.value !== '') { // All the inputs have pattern but Subjet. The second condition stop the validation on empty inputs
                let regex = new RegExp(pattern)
                return !regex.exec($input.value) // If the input value dont match the reg ex
                    ? d.getElementById($input.name).classList.add('is-active') // Capture the id of the created span and show it
                    : d.getElementById($input.name).classList.remove('is-active') // Capture the id of the created span and remove it
            }
            if (!pattern) { // Subject input dont have pattern
                return $input.value === ''
                    ? d.getElementById($input.name).classList.add('is-active')
                    : d.getElementById($input.name).classList.remove('is-active')
            }
        }
    })

    // Fetch to formsubmit.co API
    d.addEventListener('submit', (e) => {
        e.preventDefault()
        const $loader = d.querySelector('.contact-form-loader'),
            $response = d.querySelector('.contact-form-response'),
            $inputBtn = d.querySelector('.submit-btn')
        $inputBtn.disabled = true
        $loader.classList.remove('none')

        fetch(`https://formsubmit.co/ajax/${emailRecipient}`, {
            method: 'POST',
            body: new FormData(e.target), // FormData parse all elements and values
        })
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((json) => {
                console.log(json)
                $loader.classList.add('none')
                $response.classList.remove('none')
                $form.reset()
            })
            .catch(err => {
                console.error(err)
                let message = err.statusText || "Ocurrió un error al enviar el formulario";
                $response.innerHTML = `<p>Error: ${err.status}: ${message}</p>`;
            })
            .finally(() => {
                setTimeout(() => {
                    $response.classList.add('none')
                    $response.innerHTML = ''
                }, 3000)
                $inputBtn.disabled = false
            })
    })
}