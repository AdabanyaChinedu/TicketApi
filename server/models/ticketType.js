var mongoose = require('mongoose');


const ticketTypeSchema = mongoose.Schema({

    id: {
        type: String,
        required: true
    },
    ticket_Type: {
        type: String,
        required: true
    }
});

const TicketType = module.exports = mongoose.model('TicketType', ticketTypeSchema);

// Create Ticket Type
module.exports.addTicketType = function(ticketType, callback) {
    TicketType.create(ticketType, callback);
};

// Update Ticket Type
module.exports.updateTicketType = function(id, ticketType, options, callback) {
    var query = { _id: id };
    var update = {
        id: ticketType.id,
        ticket_Type: ticketType.genre,
    };
    TicketType.findOneAndUpdate(query, update, options, callback);
};