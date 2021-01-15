const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000;

app.use(express.static(path.join(__dirname,'client', 'build')));

app.listen(PORT, ()=>{
    console.log('started')
})