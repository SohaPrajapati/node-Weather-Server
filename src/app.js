const path = require('path')
const express = require('express')
const { dirname } = require('path')
const hbs = require('hbs')

const request= require('request')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')
const { query } = require('express')

const app = express()

//Define a path for express config
const publicDirpath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup static directory to serve
app.use(express.static(publicDirpath))

//Setup handlebars engines and views loactions
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Soha'
    })
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Soha'
    })
})
app.get('/help',(req,res)=>{
    res.render('help', {
        title:'Help Desk',
        message:'How can I help you??',
        name: 'Soha'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: '404',
        errorMsg: 'Help artical not found.',
        name: 'Soha'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide address!'
        })
    }
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forcastData)=>{
                if(error){
                    return res.send({error})
                }
                    res.send({
                        address:req.query.address, 
                        location,
                        Weather: forcastData
                    })
            })
        })
})

app.get('/product',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide address!'
        })
    }
    res.send({
        forcast: '36 degree',
        location: 'Ahmedabad',
        address: req.query.address
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title: 404,
        errorMsg: 'Page Not Found!',
        name: 'Soha'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})
