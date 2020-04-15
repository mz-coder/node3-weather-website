const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiemljb2Rlc3R1ZGlvIiwiYSI6ImNrOGM2bHd0dTBqZHozZ2x2YXMyb3ZmeHcifQ.RSyoinu5rOkrYr9l_lgSYw'

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to Mapbox.', undefined)
        } else if (body.features.length === 0) {
            callback('No matching results were found.', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name

            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: location
            })
        }
    })

}

module.exports = geocode