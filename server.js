const express = require('express');
const app = express();
const path = require('path');
const PORT = 4000;

app.use(express.static(path.join(__dirname, 'build')));

app.listen(PORT, ()=>{
    console.log('started')
})

app.get('*', (req, res) => {                       
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));                               
});
