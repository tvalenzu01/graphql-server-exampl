const mongoose = require('mongoose');
const TratamientoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    Descripcion: {
        type: String,
        required: true
    },
    profesional: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'profesional'
    },
    acciones: [{
        accion: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'prestacion'
        },
        monto: {
            type: Number,
            required: true,
            default: 0
        },
        realizada: {
            type: Boolean,
            default: false
        }
    }],
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

module.exports = mongoose.model('Tratamiento', TratamientoSchema);