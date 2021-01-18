const express = require('express');
const app = express();
const path = require('path');
const PORT = 8000;

app.use(express.static(path.join(__dirname,'build', 'index.html')));

app.listen(PORT, ()=>{
    console.log('started')
})