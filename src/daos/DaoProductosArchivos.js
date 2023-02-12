import ContenedorArchivos from "../containers/ContenedorArchivos.js";

class DaoProductosArchivos extends ContenedorArchivos {
  constructor() {
    super("./DB/productos.json");
  }
}

export default DaoProductosArchivos;