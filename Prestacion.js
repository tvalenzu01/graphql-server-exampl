const mongoose = require('mongoose');
const PrestacionSchema = new mongoose.Schema({
    arancel: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'accion'
    },
    monto: {
        type: Number
    },

    realizada: {
        type: Boolean,
        default: true,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    },
    creadoPor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Prestacion', PrestacionSchema);