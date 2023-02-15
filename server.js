import messagesController from "./src/controllers/messagesController.js";
import productsController from "./src/controllers/productsController.js";
import { productsRouter } from "./src/routes/productsRouter.js";
import keys from "./src/ws_keys.js";
import { create } from "express-handlebars";
import cors from "cors";

// Express
import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(cors());

// __dirname

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// Handlebars

const hbs = create({
  extname: ".hbs",
  defaultLayout: "index.hbs",
  layoutsDir: __dirname + "/public/views/layouts",
  partialsDir: __dirname + "/public/views/partials",
});

app.engine("hbs", hbs.engine);

app.set("views", "public/views");

app.set("view engine", "hbs");
// Session

import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

// Path

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(cookieParser());

const sessionMiddleware = session({
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://usuario_invitado:invitado123@cluster0.zuesfin.mongodb.net/prueba",
    mongoOptions: advancedOptions,
  }),
  secret: "secreto",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
  },
});

app.use(sessionMiddleware);

app.use("/api", productsRouter);

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/login", (req, res) => {
  if (!req.session.user) {
    res.render("pages/login.hbs");
  } else {
    res.redirect("/home");
  }
});

app.get("/home", (req, res) => {
  if (req.session.user) {
    req.session.counter++;
    res.render("pages/home", { user: req.session.user });
  } else {
    res.redirect("/login");
  }
});

app.post("/login", (req, res) => {
  try {
    const user = req.body.user;
    req.session.user = user;
    req.session.counter = 1;
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
});

app.get("/logout", (req, res) => {
  try {
    const name = req.session.user;
    req.session.destroy();
    res.render("pages/logout", { mensaje: `Hasta luego ${name}` });
  } catch (error) {
    console.log(error);
  }
});

// Socket io
import { createServer } from "http";
const httpServer = createServer(app);
import { Server } from "socket.io";
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`Nuevo cliente conectado en socket: ${socket.id}`);
  messagesController.viewMessages(socket);
  socket.emit(keys.nuevoProducto);
  socket.on(keys.cargarProducto, (prod) => {
    productsController.addProductSocket(prod, io);
  });
  socket.on(keys.enviarMensaje, (msj) =>
    messagesController.addMessage(msj, io)
  );
});

// Servidor
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error en el servidor: ${error}`);
});
