const request = require("request")

const forecast= (latitude, longitude, callback)=>{
    const url='http://api.weatherstack.com/current?access_key=9e11aa31eea413e58e8ae03304b4f13a&query='+ latitude +',' + longitude
    request({url, json: true}, (error,{body})=>{
        if(error){
            callback('unble to coonect with weatherapp!',undefined)
        }else if(body.error){
            callback('unable to find loaction', undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degree out. It feels like ' + body.current.feelslike +' degree out there. And humidity is ' + body.current.humidity)
        }
    })
}

module.exports=forecast