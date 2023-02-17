import session from "express-session";
import MongoStore from "connect-mongo";
import { config } from "dotenv";
config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const sessionMiddleware = session({
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${USER}:${PASSWORD}@cluster0.zuesfin.mongodb.net/prueba`,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  }),
  secret: "miapp",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
  },
});

export default sessionMiddleware;