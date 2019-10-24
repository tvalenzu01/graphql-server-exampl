const {
  ApolloServer,
  AuthenticationError
} = require("apollo-server");

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");

require("dotenv").config({
  path: "variables.env"
});

const Categoria = require("./models/Categoria");
const User = require("./models/User");
const Prestacion = require("./models/Prestacion");
const Paciente = require("./models/Paciente");
const Profesional = require("./models/Profesional");
const Accion = require("./models/Accion");
const Tratamiento = require("./models/Tratamiento");
const Anuncio = require("./models/Anuncio");

//export const MONGO_URI = process.env['MONGO_URI'];
console.log("DB connected:" + process.env.MONGO_URI);
mongoose
  .connect("mongodb://tvalenzu:Oraagu01@ds041486.mlab.com:41486/clinicainpant", {
    useNewUrlParser: true
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

server.listen({
  port: 4000
}).then(({
  url
}) => console.log(`Server listening on ${url}`));
