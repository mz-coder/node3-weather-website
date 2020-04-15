//import { response } from "express"

console.log('This is client side js file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=London').then((response) => {
//     response.json().then((data) => {
//         if(data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const loc = search.value
    //const url = 'http://localhost:3000/weather?address='+ loc
    const url = '/weather?address='+ loc
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
        } else {
            console.log(data.location)
            console.log(data.forecast)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast.temp
        }
    })
})
})