const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;

const corsOptions = require('./config/corsOptions');

const cookieParser = require('cookie-parser');
const cors = require('cors');

// path module
const path = require('path');
const { logger } = require('./middleware/logger');

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')))

// for routes of the application
app.use('/', require('./routes/root'))

// for error page shown
app.all('*', (req, res) => {
    res.status(404)

    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({
            message: '404 not found'
        })
    }else{
        res.type('txt').send('404 Not Found')
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
})