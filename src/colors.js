const colors = document.getElementsByClassName('colors__elem')
let selectedColor = colors[0]

Array.from(colors).forEach((elem) => {
    elem.addEventListener('click',(e) => {
        const color = elem.style.getPropertyValue('background-color')
        selectedColor.classList.remove('colors__elem--selected')
        elem.classList.add('colors__elem--selected')
        selectedColor = elem
        document.querySelector(':root').style.setProperty('--base-color', color);
    })
})