const request = require('postman-request');

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=80298a87ec4eb6c010e7be420ad2c708&query='+longtitude+','+latitude+'&units=m';
    request({url: url, json: true}, (error, res) => {
        if(error){
            callback('Cant connect to forecast service',undefined);
        }else if(res.body.error){
            callback('Unable to find location',undefined);
        }else{
            callback(undefined,res.body.current.weather_descriptions[0] + '. It is currently ' + res.body.current.temperature + ' C outside and it feels like ' + res.body.current.feelslike +' C');
        }
    });
};


module.exports = forecast;