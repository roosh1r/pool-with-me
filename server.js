var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = require('./app/routes');

var app = express();

//if(process.argv.slice(2) == 'dev') {
//  mongoose.connect("mongodb://localhost:27017/carPoolApp");
//}
//else {
//  mongoose.connect("mongodb://admin:password@ds027751.mlab.com:27751/carpoolusers");
//}

app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json( { type: 'application/vnd.api + json' }));
app.use(methodOverride());

router(app);

app.listen(port);
console.log('App listening on port ' + port);
