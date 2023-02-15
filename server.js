import router from "./src/routes/index.js";
import hbs from "./src/engines/handlebars.js";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import sessionMiddleware from "./src/auth/session.js";
import { createServer } from "http";
import { Server } from "socket.io";
import * as socket from "./src/sockets/socket_io.js";

// Express

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(cors());

//Engine

app.engine("hbs", hbs.engine);
app.set("views", "public/views");
app.set("view engine", "hbs");

// Session

app.use(cookieParser());
app.use(sessionMiddleware);

// Route

app.use("/", router);

// Server

const httpServer = createServer(app);
const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error en el servidor: ${error}`);
});

// Socket io

const io = new Server(httpServer);
socket.start(io);