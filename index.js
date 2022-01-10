const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://walter:everglow95@todoapp.hudxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, 
}).then(()=> console.log('MongoDB Connected')).catch(err => console.log(err));



app.get('/', (req, res)=> res.send('Hello world'));

app.listen(port, ()=> console.log(`Express start on ${port}`))
