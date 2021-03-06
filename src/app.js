const express = require('express')
const path = require('path')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location (handlebars templating engine)
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'MZ-Coder'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'MZ-Coder'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Frequently asked questions',
        name: 'MZ-Coder'
    })
})


app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const indata = req.query.address
    geocode(indata, (error, {latitude, longitude, location}) => {
        if(error) {
            //return console.log(error)
            return res.send (error)
        } 
        forecast(latitude,longitude, (error, forecastdata) => {
            if(error) {
                //return console.log(error)
                return res.send(error)
            }
            console.log(location)
            console.log(forecastdata)
            res.send({
                forecast: forecastdata,
                location: location
            })
        })
    })  

})
app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send ({
            error: 'You must provide a search term'
        })
        
    }
    console.log(req.query)
})
app.get('/help/*', (req, res) => {
    res.render('404error', {
        error:'Help article not found',
        title: 'Help Page Error',
        name: 'MZ-Coder'
    })
})
app.get('*', (req, res) => {
    res.render('404error', {
        error: 'My 404 page',
        title: 'Page Error',
        name: 'MZ-Coder'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})