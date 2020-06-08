const request = require('postman-request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibWl0a28yNzAzIiwiYSI6ImNrYXdrNm0xNjFienQycm8za2p0aGNxMHIifQ.VUabysywJ_BP-hLZsTsbRA&limit=1';

    request({url: url, json: true}, (error, res) => {
        if(error){
            callback('Unable to connect to location services!', undefined);
        }else if(res.body.features.length === 0){
            callback('Unable to find location, try another!', undefined);
        }else{
            callback(undefined, {
                lattitude: res.body.features[0].center[1],
                longtitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            });
        }
    });
};

module.exports = geoCode;