import { products } from "../daos/index.js";
import keys from "../sockets/ws_keys.js";

class ProductsController {
  constructor(products) {
    this.products = products;
  }

  getProducts = (req, res) => {
    if (req.session.user) {
      this.products
        .getAll()
        .then((data) => res.json(data))
        .catch((error) => res.json(error));
    } else {
      res.status(401).json({ error: "No tiene permisos" });
    }
  };

  addProduct = (req, res) => {
    this.products
      .add(req.body)
      .then(() => res.json("Éxito"))
      .catch(() => res.send("Error"));
  };

  addProductSocket = (prod, io) => {
    this.products
      .add(prod)
      .then(() => io.sockets.emit(keys.nuevoProducto))
      .catch(() => console.log(error));
  };
}

const productsController = new ProductsController(products);

export default productsController;
