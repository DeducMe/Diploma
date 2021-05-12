var express = require('express');
var app = express();
const path = require('path');
var cors = require('cors');
var http = require('http');
var https = require('https');

app.options('*', cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', cors(), (req, res) => {  
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));                               
});

require("greenlock-express")
    .init({
        packageRoot: __dirname,
        configDir: "./greenlock.d",
 
        // contact for security and critical bug notices
        maintainerEmail: "jon@example.com",
 
        // whether or not to run at cloudscale
        cluster: false
    })
    // Serves on 80 and 443
    // Get's SSL certificates magically!
    .serve(app);

