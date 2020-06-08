const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Weather app'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        });
    }

    geoCode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error: error
            });
        }
        forecast(data.longtitude,data.lattitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                });
            }
            
            res.send({
                location: data.location,
                forecastData: forecastData,
            })
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products:[] 
    });
});

app.get('/help', (req, res) => {
    res.render('help',{});
})

app.get('/help/*', (req, res) => {
    res.render('error',{page_type : 'article'});
})

app.get('*', (req, res) => {
    res.render('error',{page_type : 'page'});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});