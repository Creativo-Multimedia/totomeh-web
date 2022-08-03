const d = document,
    w = window

export default function scrollToTop(btn) {
    const $scrollBtn = d.querySelector(btn)
    w.addEventListener('scroll', e => {
        let scrollTop = w.pageYOffset || d.scrollTop
        if (scrollTop > 600) {
            $scrollBtn.classList.remove('d-none')
        } else {
            $scrollBtn.classList.add('d-none')
        }
    })
    d.addEventListener('click', e => {
        if (e.target.matches(btn)) {
            w.scrollTo({
                behavior: 'smooth',
                top: 0
            })
        }
    })
}
