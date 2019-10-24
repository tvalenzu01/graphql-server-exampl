const mongoose = require('mongoose');
const AccionSchema = new mongoose.Schema({

    nombre: {
        type: String
    },
    Descripcion: {
        type: String
    },
    uco: {
        type: Number
    },
    valor: {
        type: Number
    },
    categoria: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'categoria'
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

module.exports = mongoose.model('Accion', AccionSchema);