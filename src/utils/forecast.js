const postman_request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=62ac95cb6ac6de53a9a7f6a510b45796&query='+ longitude + ',' + latitude + ']]&units=m'
    postman_request({url, json:true}, (error, {body}) => {
        if(error)
        {
            callback("Unable to connect to weather service", undefined);
        }
        else if(body.error)
        {
            callback("Unable to find Location", undefined);
        }
        else
        {
            callback(undefined, {desc: body.current.weather_descriptions[0], temp: body.current.temperature, feelslike: body.current.feelslike})
        }
    });
}

module.exports = forecast;

// http://api.weatherstack.com/current?access_key=62ac95cb6ac6de53a9a7f6a510b45796&query=-75.1327,40.0115&units=m