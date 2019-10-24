const mongoose = require('mongoose')

const PrestacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    montoUco: {
        type: Number,
        required: true
    },
    activa: {
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
})

module.exports = mongoose.model('Prestacion', PrestacionSchema)