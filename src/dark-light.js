const body = document.getElementById("body");
const dark = document.getElementById("dark");
dark.addEventListener("click",(e)=>{
    const classDark = 'body__dark'
    const classLight = 'body__light'
    if(dark.classList.contains('fa-regular')){
        // Make it dark
        dark.classList.remove('fa-regular')
        dark.classList.add('fa-solid')
        body.classList.remove(classLight)
        body.classList.add(classDark)
    } else{
        dark.classList.remove('fa-solid')
        dark.classList.add('fa-regular')
        body.classList.remove(classDark)
        body.classList.add(classLight)
        // Make it light
    }
})