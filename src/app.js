const path = require('path')
const express = require('express');
const hbs = require('hbs');
//////////////////////////

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine & views location.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath))


//////////////////////////
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help Page',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({error: 'You must provide an address'});
    }
    geocode(req.query.address, (error, {latitude = 0, longitude = 0, location = 'grenish'} = {}) =>{
        if(error)
        {
            return res.send({error});
        }
    
        forecast(latitude, longitude, (error2, {desc, temp, feelslike, lat, lon, localtime} = {}) => {
        if(error)
        {
            return res.send({error: error2});
        }

        res.send({
            forecast: 'Description: ' + desc + ' Temprature: ' + temp + ' Feelslike: ' + feelslike,
            location: location + ' (' + lat + ' || ' + lon + ') / ' + localtime,
            address: req.query.address
        });
        })
    })


})

app.get('/products', (req, res)=>{
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMsg: 'Help Article NOT Found !',
        title: 'Help Page',
        name: 'Andrew Mead'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Page NOT Found',
        title: '404',
        name: 'Andrew Mead'
    });
})
//////////////////////////
app.listen(port, () => {
    console.log("Server is up on port " + port);
})