const path = require('path');

const userRoute = require('./routes/user')

const express = require('express');

const app = express();
const PORT = 8000;


app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));


app.get('/', (req, res)=> {
    res.render('home');
})


app.use('/user', userRoute);

app.listen(PORT, ()=> console.log(`Server Started at PORT:${PORT}`)); 