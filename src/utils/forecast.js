const request = require('request')


// const url = 'https://api.darksky.net/forecast/a2e2f25de8573cd7809d06f07e58be6d/51.5722,0.1420?units=si'

// request({url: url, json: true}, (error, response) => {

//     if (error) {
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log('Unable to find location')
//     } else { 
//         //const data = JSON.parse(response.body)
//         const temp = response.body.currently.temperature
//         const presp = (response.body.currently.precipProbability) * 100
//         console.log('It is currently ' + temp + ' degrees out. There is a ' + presp + '% chance of rain.')
//         response.body.daily.data.forEach((day) => {
//             console.log(day.summary)
//         });
//     }
// })

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/a2e2f25de8573cd7809d06f07e58be6d/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const temp = body.currently.temperature
            const presp = (body.currently.precipProbability) * 100
            // console.log('It is currently ' + temp + ' degrees out. There is a ' + presp + '% chance of rain.')
            // response.body.daily.data.forEach((day) => {
            //     console.log(day.summary)
            // });
            callback(undefined, {temp, presp})
        }
    })
}

module.exports = forecast