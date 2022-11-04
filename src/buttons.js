const timeout = 100;

const buttonPress = (isPressed, button) => {
    if(isPressed){
        button.classList.add('button--pressed')
    } else{
        button.classList.remove('button--pressed')
    }
}

export const buttonPressTimeout = (button) =>{
    buttonPress(true, button)
    setTimeout(() =>{
        buttonPress(false, button)
    }, timeout)
}