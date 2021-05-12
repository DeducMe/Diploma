var express = require('express');
var app = express();
const path = require('path');
var cors = require('cors');

var https = require('https');

var server = https.createServer(app);

app.set('port', (4000));

app.options('*', cors());
app.use(express.static(path.join(__dirname, 'build')));

app.listen(4000, ()=>{
    console.log('started')
})

app.get('*', cors(), (req, res) => {  
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));                               
});

