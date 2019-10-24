const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        required: true,
        type: String,
        trim: true
    },
    rut: {
        required: true,
        type: String,
    },
    sexo: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    ciudad: {
        type: String,
        required: true,
        trim: true
    },
    comuna: {
        type: String,
        trim: true
    },
    actividad: {
        type: String,
        trim: true
    },
    observacion: {
        type: String
    },
    avatar: {
        type: String
    },
    fecheNacimiento: {
        type: Date
    },
    tratamientos: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Tratamiento'
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

module.exports = mongoose.model('Paciente', PacienteSchema);