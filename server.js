const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tickets = require('./server/routes/api/tickets');
const ticketTypes = require('./server/routes/api/ticketTypes');
const authController = require('./server/auth/AuthController');



app.use(bodyParser.json());

// const Tickets = require('./server/models/ticket');
// const TicketTypes = require('./server/models/ticketType');

//DB Config
const db = require('./server/config/config').mongoURI;

//Connect to Mongoose
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));


// Route corrector
app.get('/', function(req, res) {
    res.send('Please use /api/v1/tickets');
});

// Routes
app.use('/api/v1/tickets', tickets);
app.use('/api/v1/ticketTypes', ticketTypes);
app.use('/api/v1', authController);




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));