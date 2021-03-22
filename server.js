const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = 4000;
app.use(cors());

app.options('*', cors());
app.use(express.static(path.join(__dirname, 'build')));

app.listen(PORT, ()=>{
    console.log('started')
})

app.use(cors(), function (req, res, next) {
    console.log('a')
    // Website you wish to allow to connect
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin, Access-Control-Allow-Origin");
    next();
  
    // Pass to next layer of middleware
});

app.get('*',cors(), (req, res) => {  
    res.header("Access-Control-Allow-Origin", "http://localhost:4000");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*, Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin, Access-Control-Allow-Origin");
  
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));                               
});
