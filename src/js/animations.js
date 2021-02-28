const animations = () => {
    const focusingElements = document.querySelectorAll(".focusingElement");


    focusingElements.forEach(element => {

        element.addEventListener("focusin", e => {
            e.target.parentElement.classList.add("form__group--focused")
            e.target.parentNode.childNodes[1].classList.add("form__label--focused")
        })

        element.addEventListener("focusout", e => {
            e.target.parentElement.classList.remove("form__group--focused")
            e.target.parentNode.childNodes[1].classList.remove("form__label--focused")
        })

    });

}

module.exports = animations;