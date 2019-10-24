const mongoose = require("mongoose");
const ProfesionalSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		unique: true,
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
		unique: true
	},
	sexo: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	direccion: {
		type: String,
		required: true,
		trim: true
	},
	especialidad: {
		type: String,
		required: true,
		trim: true
	},
	fechacreacion: {
		type: Date,
		default: Date.now
	},
	creadopor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
	}
});

module.exports = mongoose.model("Profesional", ProfesionalSchema);
