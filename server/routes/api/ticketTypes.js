const express = require('express');
const router = express.Router();


//ticket Type model
const ticketType = require('../../models/ticketType');

//Update ticket Type .
router.put('/:_id', function(req, res) {
    var id = req.params._id;
    var ticketType = req.body;
    TicketTypes.updateTicketType(id, ticketType, {}, function(err, ticketType) {
        if (err) {
            throw err;
        }
        res.json(ticketType);

    });

});

//Create Ticket Type
router.post('/', function(req, res) {
    var ticketType = req.body;
    TicketTypes.addTicketType(ticketType, function(err, ticketType) {
        if (err) {
            throw err;
        }
        res.json(ticketType);

    });

});

module.exports = router;