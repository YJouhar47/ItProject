require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
var path = require('path');
const mongoString = 'mongodb+srv://youssef:youssef@mijncluster1.o3at1.mongodb.net/test';
const PORT = process.env.PORT || 5000
/* mongodb://localhost:27017/test */
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

const routes = require('./routes/routes');

app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server Started at ${5000}`)
})
