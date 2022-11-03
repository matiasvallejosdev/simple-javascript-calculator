const display = document.getElementById('display');
const defaultSize = getFontSizeInput(display);

let until = 10
let limit = 32

document.addEventListener('keyup', (event)=>{
    if(isNaN(event.key)){
        if(event.key === 'Backspace'){
            let size = getFontSizeInput(display)
            if(size < defaultSize && display.value.toString().length < until){
                display.style.fontSize = (size + 5) + 'px';
            }
        }
    } else{
        if(display.value.toString().length > until){
            let size = getFontSizeInput(display)
            if(size > limit){
                display.style.fontSize = (size - 5) + 'px';
            }
        } else{
            display.style.fontSize = defaultSize + 'px';
        }
    }
})

function getFontSizeInput(input){
    let size = window.getComputedStyle(input, null).getPropertyValue('font-size');
    size = parseInt(size.replace('px', ''));
    return size;
}