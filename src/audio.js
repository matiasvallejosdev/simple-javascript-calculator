let isMuted = false
const volume = document.getElementById('volume')

volume.addEventListener('click', () => {
    volume.classList.add(isMuted ? 'fa-volume-high' : 'fa-volume-xmark')
    volume.classList.remove(isMuted ?  'fa-volume-xmark' : 'fa-volume-high')
    isMuted = !isMuted
})

const playSuccess = () => {
    if(isMuted) return
    const audio = new Audio('static/audio/success.mp3')
    audio.play()
}

const playClick = () => {
    if(isMuted) return
    const audio = new Audio('static/audio/click.mp3')
    audio.play()
}

export {playSuccess, playClick}