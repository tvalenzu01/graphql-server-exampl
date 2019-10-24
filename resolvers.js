const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
	const {
		username,
		email
	} = user;
	return jwt.sign({
		username,
		email
	}, secret, {
		expiresIn
	});
};

module.exports = {
	Query: {
		getPaciente: async (_, {
			pacienteId
		}, {
			Paciente
		}) => {
			const paciente = await Paciente.findOne({
				_id: pacienteId
			});
			return paciente;
		},
		getAnuncios: async (_, arg, {
			Anuncio
		}) => {
			const anuncios = await Anuncio.find({})
				.sort({
					fechaCreacion: "desc"
				})
				.populate({
					path: "creadoPor",
					model: "User"
				});

			return anuncios;
		},
		getPacientes: async (_, arg, {
			Paciente
		}) => {
			const pacientes = await Paciente.find({})
				.sort({
					fechaCreacion: "desc"
				})
				.populate({
					path: "creadoPor",
					model: "User"
				});

			return pacientes;
		},
		getCurrentUser: async (_, args, {
			User,
			currentUser
		}) => {
			if (!currentUser) {
				return null;
			}
			const user = await User.findOne({
				username: currentUser.username
			});
			/* .populate({
				path: "favorites",
				model: "Post"
			}); */
			return user;
		}
	},
	Mutation: {
		crearPaciente: async (
			_, {
				nombre,
				apellidos,
				rut,
				sexo,
				email,
				direccion,
				ciudad,
				fechaNacimiento,
				observacion,
				creadoPor
			}, {
				Paciente
			}
		) => {
			const paciente = await Paciente.findOne({
				rut
			});
			if (paciente) {
				throw new Error("ya existe el paciente");
			}
			console.log("No existe el paciente");

			console.log("creadopor:" + creadoPor);

			const newPaciente = await new Paciente({
				nombre,
				apellidos,
				rut,
				sexo,
				email,
				direccion,
				ciudad,
				fechaNacimiento,
				observacion,
				creadoPor: creadoPor
			}).save();
			return newPaciente;
		},
		creaProfesional: async (
			_, {
				nombre,
				apellidos,
				rut,
				sexo,
				email,
				direccion,
				especialidad,
				creadopor
			}, {
				Profesional
			}
		) => {
			const profesional = await Profesional.findOne({
				rut
			});
			if (profesional) {
				throw new Error("ya existe el profesional");
			}
			console.log("no existe el profesional");

			const newProfesional = await new Profesional({
				nombre,
				apellidos,
				rut,
				sexo,
				email,
				direccion,
				especialidad,
				creadopor: creadopor
			}).save();
			return newProfesional;
		},
		signupUser: async (_, {
			username,
			email,
			password
		}, {
			User
		}) => {
			const user = await User.findOne({
				username
			});
			if (user) {
				throw new Error("ya existe el usuario");
			}
			const newUser = await new User({
				username,
				email,
				password
			}).save();

			return {
				token: createToken(newUser, process.env.SECRET, "1hr")
			};
		},
		signinUser: async (_, {
			username,
			password
		}, {
			User
		}) => {
			const user = await User.findOne({
				username
			});
			if (!user) {
				throw new Error("Usuario no existe");
			}
			const isValid = await bcrypt.compare(password, user.password);

			if (!isValid) throw new Error("Password no corresponde");

			return {
				token: createToken(user, process.env.SECRET, "1hr")
			};
		},
		addAnuncio: async (
			_, {
				titulo,
				imagen,
				descripcion,
				creadoPor
			}, {
				Anuncio
			}
		) => {
			const anuncio = await Anuncio.findOne({
				titulo
			});
			if (anuncio) {
				throw new Error("ya existe el anuncio");
			}
			const newAnuncio = await new Anuncio({
				titulo,
				imagen,
				descripcion,
				creadoPor: creadoPor
			}).save();
			return newAnuncio;
		}
	}
};