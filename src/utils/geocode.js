const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmVsaWNpYXJvbWFuMiIsImEiOiJja3JnbWxzaDgwcDI1MnRvMGtud2o1a2duIn0.mwKTuqSAuHRCXfUGg_nXDg&limit=1'

    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1].toString(),
                longitude: body.features[0].center[0].toString(),
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
