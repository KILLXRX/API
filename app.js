const express = require('express');
const app = express();
const mongoose = require('mongoose');
const AdminRoute = require('./routes/Admins');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config');
//Middlewares
app.use(cors())
app.use(bodyParser.json());

//Routes
app.get('/', (req, res) => {

        return res.sendStatus(401)
    //res.send("There's nothing to see here.");
});
app.use('/admins', AdminRoute);


mongoose.connect(process.env.DB_CONNECTION, () => 
    console.log('connected to DB!')
);

app.listen(8080);