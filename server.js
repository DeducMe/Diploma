var express = require('express');
var app = express();
const path = require('path');
var cors = require('cors');
var https = require('https');
const fs = require('fs');

const port = 4000;

var key = fs.readFileSync('./rootCA.key');
var cert = fs.readFileSync('./rootCA.crt');
var options = {
  key: key,
  cert: cert
};

var server = https.createServer(options, app);

app.set('port', (port));

app.options('*', cors());
app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, ()=>{
    console.log('started')
})

app.get('*', cors(), (req, res) => {  
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));                               
});

