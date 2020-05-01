const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const authenticate = require('../auth/authenticate-middleware.js');

const knexSessionStore = require('connect-session-knex')(session);

const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

const sessionConfig = {
  name: 'logged-in-user',
  secret: 'myspeshulsecret',
  cookie: {
    maxAge: 3600 * 1000,
    secure: false, // should be true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,

  // adds logged in persistance
  store: new knexSessionStore(
    {
      knex: require("../database/dbConfig.js"),
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 3600 * 1000
    }
  )
}

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig));

server.get("/", (req, res) => {
  res.json({ api: "up, down, up, down" });
});

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;