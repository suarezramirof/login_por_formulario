import session from "express-session";
import MongoStore from "connect-mongo";

const sessionMiddleware = session({
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://usuario_invitado:invitado123@cluster0.zuesfin.mongodb.net/prueba",
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
