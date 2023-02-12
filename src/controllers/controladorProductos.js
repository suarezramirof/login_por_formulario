import { productos } from "../daos/index.js";

class ControladorProductos {
  constructor(productos) {
    this.productos = productos;
  }

  getProducts = (_req, res) => {
    this.productos
      .getAll()
      .then((data) => res.json(data))
      .catch((error) => res.json(error));
  };
}

const controladorProductos = new ControladorProductos(productos);

export default controladorProductos;
