const cookieParser = require('cookie-parser');
const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const app = express()
const port = 3000

const bodyParser = require('body-parser')


app.use(cors()) //Open To all
require('dotenv').config();
mongoose.set('strictQuery', false);



// All Route
const apiIcon = require('./routes/apiIcon')




// mongoose.Promise = global.Promise
// // mongoose.connect(process.env.DB, { useNewUrlParser: true })
// mongoose.connect(process.env.DB, { authSource: "admin", dbName: 'MdmServices', useNewUrlParser: true })
//     .then((db) => { console.log('conected to Data base') })
//     .catch((err) => console.log(err))
app.use(bodyParser.json())

// Use all Route
app.use('/api', apiIcon);

app.use((err, req, res, next) => {
    console.log(err);
    console.log(req);
    next();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json());
app.listen(port, () => {
    console.log('server conected on port: ' + port);
})