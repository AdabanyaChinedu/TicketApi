var User = require("./user");
const mongoose = require('mongoose');

//Book Schema
const ticketSchema = mongoose.Schema({

    ticketId: {
        type: Number,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },

    ticketType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    }

    // {
    //     timestamps: true,
    // }
});

var Ticket = module.exports = mongoose.model('Ticket', ticketSchema);


// Get all Tickets
module.exports.getTickets = function(callback, limit) {
        Ticket.find(callback).limit(limit);
    }
    // Get Ticket
module.exports.getTicketById = function(id, callback) {
    Ticket.where({ ticketId: id }).findOne(callback);
}

// Add Ticket
module.exports.addTicket = function(ticket, callback) {
    Ticket.create(ticket, callback);
};

// Update Tickets or Edit Ticket
module.exports.updateTicket = function(id, ticket, options, callback) {
    var query = { userId: id };
    var update = {
        ticketId: Ticket.length + 1,
        userId: query.userId,
        title: ticket.title,
        ticketType: ticket.ticketType,
        description: ticket.description,
        author: ticket.author,
        status: ticket.status,
        created_date: ticket.created_date,
        updated_date: ticket.updated_date
    };
    Ticket.findOneAndUpdate(query, update, options, callback);
};