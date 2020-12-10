const postman_request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXVoYW1tYWRtYW1kdWgiLCJhIjoiY2todWFwcXloMGg0cDJxcGg1a282c3llZyJ9.DM-hyeHK2_6J5sDOcRL9Xw&limit=1';
    
    postman_request({url, json:true}, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to location services !', undefined)
        }
        else if(body.features.length == 0)
        {
            callback('Unable to find location, please try another search term', undefined)
        }
        else
        {
            callback(undefined, {
                                    latitude: body.features[0].center[0], 
                                    longitude: body.features[0].center[1],
                                    location: body.features[0].place_name
                                }
                    )
        }
    })
}

module.exports = geocode