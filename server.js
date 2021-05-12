var express = require('express');
var app = express();
const path = require('path');
var cors = require('cors');

var http = require('http');

var server = http.createServer(app);

app.set('port', (4000));

app.use(function(req, res, next) {
    var reqType = req.headers["x-forwarded-proto"];
    reqType == 'https' ? next() : res.redirect("https://" + req.headers.host + req.url);
});

app.options('*', cors());
app.use(express.static(path.join(__dirname, 'build')));

app.listen(4000, ()=>{
    console.log('started')
})

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')))

