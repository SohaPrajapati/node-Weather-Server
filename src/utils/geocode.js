const request = require('request')

const geocode= (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic29oYXByYWphcGF0aSIsImEiOiJja2FuamxheWIwNDk1MzBxbjNhNno0ZWQ2In0.bXji3hXILve1YelAA556hg&limit=1'
    request({url, json: true}, (error, {body}={})=>{
        if(error){
            callback('unable to connect weatherapp!', undefined)
        }else if(body.features.length===0){
            callback('Unable to find location, please try something better search!',undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports= geocode