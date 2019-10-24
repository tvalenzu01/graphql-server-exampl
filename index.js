const {
  ApolloServer,
  AuthenticationError,
  gql
} = require('apollo-server');

const mongoose = require("mongoose");
//const fs = require("fs");
//const path = require("path");
//const filePath = path.join(__dirname, "typeDefs.gql");
//const typeDefs = fs.readFileSync(filePath, "utf-8");

const typeDefs = gql `
type User {
  _id: ID
  username: String!
    email: String!
    password: String!
    avatar: String
  joinDate: String
  favorites: [Post]
}

type Post {
  _id: ID
  title: String!
    imageUrl: String!
    categories: [String] !
    description: String!
    createdDate: String
  likes: Int
  createdBy: User!
    messages: [Message]
}

type Message {
  _id: ID
  messageBody: String!
    messageDate: String
  messageUser: User!
}

type Profesional {
  _id: ID
  nombre: String!
    apellidos: String!
    rut: String!
    sexo: String
  email: String
  direccion: String
  especialidad: String
  fechacreacion: String
  creadopor: User!
}

type categoria {
  _id: ID
  nombre: String
}
type accion {
  nombre: String!
    descripcion: String!
    uco: Int
  valor: Int
  categoria: categoria!
}
type prestacion {
  _id: ID
  accion: accion!
    monto: Int!
    realizada: Boolean
  fechaCreacion: String
  creadoPor: User!
}

type Tratamiento {
  _id: ID
  profesional: Profesional!
    nombre: String
  descripcion: String
  prestaciones: [prestacion]
  fechaCreacion: String
}

type Paciente {
  _id: ID
  nombre: String!
    apellidos: String!
    rut: String
  sexo: String
  email: String
  direccion: String
  ciudad: String
  comuna: String
  actividad: String
  observacion: String
  tratamientos: [Tratamiento]
  fechaNacimiento: String
  fechaCreacion: String
  creadoPor: User!
}

type Prestacion {
  nombre: String!
    montoUco: Int
  activa: Boolean
  fechaCreacion: String
  creadoPor: User!
}

type tipoPrestacion {
  accion: String!
    prestaciones: [Prestacion]
  activa: Boolean
  fechaCreacion: String
  creadoPor: User!
}

type Anuncio {
  _id: ID
  titulo: String!
    imagen: String!
    descripcion: String!
    fechaCreacion: String
  creadoPor: User!
}

type Token {
  token: String!
}

type Query {
  getAnuncios: [Anuncio]
  getCurrentUser: User
  getCurrentUser1(username: String): User
  getPacientes: [Paciente]
  getPaciente(pacienteId: ID!): Paciente
}

type Mutation {
  addAnuncio(
      titulo: String!
      imagen: String!
      descripcion: String!
      creadoPor: ID
    ): Anuncio!
    signupUser(username: String, email: String!, password: String!): Token
  signinUser(username: String, password: String!): Token
  crearPaciente(
    nombre: String!
    apellidos: String!
    rut: String!
    sexo: String email: String direccion: String ciudad: String fechaNacimiento: String observacion: String creadoPor: ID!
  ): Paciente
  creaProfesional(
    nombre: String apellidos: String rut: String sexo: String email: String direccion: String especialidad: String creadopor: ID!
  ): Profesional!
}
`;
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");

require("dotenv").config({
  path: "variables.env"
});


const Categoria = require("./Categoria");
const User = require("./User");
const Prestacion = require("./Prestacion");
const Paciente = require("./Paciente");
const Profesional = require("./Profesional");
const Accion = require("./Accion");
const Tratamiento = require("./Tratamiento");
const Anuncio = require("./models/Anuncio");

mongoose
  .connect("mongodb://tvalenzu:Oraagu01@ds041486.mlab.com:41486/clinicainpant", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

// Verify JWT Token passed from clientsecret:
console.log("secret:" + process.env.SECRET);
const getUser = async token => {
  if (token) {
    try {
      let user = await jwt.verify(token, process.env.SECRET);
      console.log(user);
      return user;
    } catch (err) {
      throw new AuthenticationError(
        "Your session has ended. Please sign in again."
      );
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    return {
      name: error.name,
      message: error.message.replace('Context creation failed:', '')
    };
  },
  context: async ({
    req
  }) => {
    const token = req.headers["authorization"];
    return {
      User,
      Anuncio,
      Paciente,
      Profesional,
      Prestacion,
      Tratamiento,
      Accion,
      Categoria,
      currentUser: await getUser(token)
    };
  }
});

// The `listen` method launches a web server.
server.listen().then(({
  url
}) => {
  console.log(`🚀  Server ready at ${url}`);
});