const mongoose = require('mongoose');
const CategoriaSchema = new mongoose.Schema({

    nombre: {
        type: String
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

module.exports = mongoose.model('Categoria', CategoriaSchema);