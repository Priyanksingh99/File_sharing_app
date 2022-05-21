const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.use(express.json());
const connectDB = require('./config/db');
const { patch } = require('./routes/files');

connectDB();


//cors

const corsOptions  = {
    origin : process.env.ALLOWED_CLIENTS.split(',')
}

app.use(cors(corsOptions));
//template engines

app.set('views',path.join(__dirname,'/views'));
app.set('view engine' , 'ejs');

//Routes

app.use('/api/files', require('./routes/files'));
app.use('/files',require('./routes/show')); 
app.use(express.static('public'));
app.use('/files/download',require('./routes/download'))

app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`)
})