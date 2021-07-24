const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Felicia"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Felicia"
    })
}) 

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "this is help",
        name: "Felicia"
    })
}) 

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        } 

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "Help article not found",
        title: "404",
        name: "Felicia"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "Page not found",
        title: "404",
        name: "Felicia"
    })
})

app.listen(3000, () => {
    console.log('Server is up')
})