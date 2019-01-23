const express = require('express');
const VerifyToken = require('../../auth/VerifyToken');
const router = express.Router();

//ticket Model
const Ticket = require('../../models/ticket');
const User = require('../../models/user');


// Get tickets
router.get('/', VerifyToken, function(req, res, next) {

    Ticket.getTickets(function(err, tickets) {
        if (err) {
            throw err;
        }
        res.json(tickets);

    });
});


//Get tickets by id
router.get('/:Id', VerifyToken, function(req, res, next) {
    Id = parseInt(req.params.Id, 10);
    Ticket.getTicketById(Id, function(err, ticket) {
        if (err) {
            throw err;
        }
        res.json(ticket);

    });

});

//Post or Add tickets
router.post('/', VerifyToken, async function(req, res, next) {

    const ticket = req.body;
    console.log(ticket.title, ticket.ticketType);
    const ticket_id = await Ticket.count({}) + 1;

    Ticket.addTicket({
            ticketId: ticket_id,
            userId: req.userId,
            title: ticket.title,
            ticketType: ticket.ticketType,
            description: ticket.description,
            author: ticket.author,
            status: ticket.status,

        },
        function(err, ticket) {
            if (err) {
                throw err;
            }
            res.json(ticket);

        });

});

//Update ticket .
router.put('/:_userId', VerifyToken, function(req, res, next) {
    // var id = req.params._id;
    var id = req._userId;
    var ticket = req.body;
    Ticket.updateTicket(id, ticket, {}, function(err, ticket) {
        if (err) {
            throw err;
        }
        res.json(ticket);
    });

});

module.exports = router;