
const interval = 10000
const typedClass = 'typed-out'
const typedText = document.getElementsByClassName(typedClass)

setInterval(() => {
    Array.from(typedText, (text) => {
        text.classList.remove(typedClass)
        setTimeout(() => {
            text.classList.add(typedClass)
        }, 100)
    })
}, interval)
