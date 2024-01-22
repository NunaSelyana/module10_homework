const wsUrl = 'wss://echo-ws-service.herokuapp.com';

const sendBtn = document.querySelector('.btn-send');
const geoLocBtn = document.querySelector('.geo-loc');
const dialog = document.querySelector('.dialog');


let websocket;

const dispUserMessage = message => {
    let messages = document.createElement('div')
    messages.classList.add('messages', 'user')
    messages.innerHTML = message
    dialog.appendChild(messages)
}


const dispServerMessage = message => {
    let messages = document.createElement('div')
    messages.classList.add('messages', 'server')
    messages.innerHTML = message
    dialog.appendChild(messages)
}


const dispGeolocation = url => {
    let messages = document.createElement('div')
    messages.classList.add('messages', 'server')
    if (url) {
        let geoLink = document.createElement('a')
        geoLink.classList.add('geo-link')
        geoLink.innerHTML = 'Ваша геолокация'
        geoLink.href = url
        geoLink.target = '_blank'
        messages.appendChild(geoLink)
        dialog.appendChild(messages)
    } else {
        messages.innerHTML = 'Ваш браузер не поддерживает отслеживание местоположения'
        dialog.appendChild(messages)
    }
}


document.addEventListener('DOMContentLoaded', () => {
    websocket = new WebSocket(wsUrl)
    sendBtn.addEventListener('click', () => {
        const inputField = document.querySelector('.input')
        const userMessage = document.querySelector('.input').value
        if (userMessage) {
            dispUserMessage(userMessage)
            const serverResponce = dispServerMessage(userMessage)
            websocket.send(serverResponce)
            inputField.value = ''
        }
    })

})


geoLocBtn.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        dispServerMessage('Это может занять некоторое время...')
        navigator.geolocation.getCurrentPosition((position) => {
            const { coords } = position
            const latitude = coords.latitude;
            const longitude = coords.longitude;
            const mapUrl = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
            dispGeolocation(mapUrl)
            websocket.send(coords)
        })
    }
})