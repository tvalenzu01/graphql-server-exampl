const mongoose = require("mongoose");

const AnuncioSchema = new mongoose.Schema({
	titulo: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	imagen: {
		type: String,
		required: true,
		trim: true
	},
	descripcion: {
		type: String,
		required: true,
		trim: true
	},
	fechaCreacion: {
		type: Date,
		default: Date.now
	},
	creadoPor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User"
	}
});

module.exports = mongoose.model("Anuncio", AnuncioSchema);
