const express = require('express');
const router = express.Router();

//ticket Model
const Ticket = require('../../models/ticket');


// Get tickets
router.get('/', function(req, res) {
    Ticket.getTickets(function(err, tickets) {
        if (err) {
            throw err;
        }
        res.json(tickets);

    });
});


//Get tickets by id
router.get('/:_id', function(req, res) {
    Ticket.getTicketById(req.params._id, function(err, ticket) {
        if (err) {
            throw err;
        }
        res.json(ticket);

    });

});

//Post or Add tickets
router.post('/', function(req, res) {
    var ticket = req.body;
    Ticket.addTicket(ticket, function(err, ticket) {
        if (err) {
            throw err;
        }
        res.json(ticket);

    });

});

//Update ticket .
router.put('/:_id', function(req, res) {
    var id = req.params._id;
    var ticket = req.body;
    Ticket.updateTicket(id, ticket, {}, function(err, ticket) {
        if (err) {
            throw err;
        }
        res.json(ticket);
    });

});

module.exports = router;