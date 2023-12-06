// clase para crear el producto
class Product {
  constructor(title, description, thumbnail, price, code, stock) {
    this.title = title;
    this.description = description;
    this.thumdnail = thumbnail;
    this.price = price;
    this.stock = stock;
    this.code = code;
    this.id = Product.id();
  }

  static id() {
    if (!this.latestId) {
      this.latestId = 1;
    } else {
      this.latestId++;
    }
    return this.latestId;
  }
}

// peticion  de file system
let fs = require(`fs`);

// clase para gestionar las diferentes acciones disponibles en el array de productos
class ProductManager {
  constructor() {
    this.products = [];
    this.patch = `./archivos/product.txt`;
  }

  readProducts() {
    let response = fs.readFileSync(this.patch, "utf-8");

    if (response) {
      return JSON.parse(response);
    } else {
      return [];
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.log("All fields required");
    }

    const data = this.readProducts();

    const existingProduct = data.find((prod) => prod.code === code);

    if (existingProduct) {
      return "This product are existing";
    }

    const newProduct = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    );

    this.products.push(newProduct);

    fs.writeFileSync(this.patch, JSON.stringify(this.products));
    console.log(`El producto fue cargado exitosamente`);
  }

  getProducts = async () => {
    const data = await this.readProducts();
    return console.log(data);
  };

  getProductById(id) {
    const data = this.readProducts();

    const product = data.find((prod) => prod.id === id);

    if (product) {
      return product;
    } else {
      return `El producto no se encontro`;
    }
  }

  deleteProductById(id) {
    let response = this.readProducts();
    let prodFilter = response.filter((prod) => prod.id != id);

    fs.writeFileSync(this.patch, JSON.stringify(prodFilter));
    console.log("Producto eliminado");
  }

  updateProduct = ({ id, ...product }) => {
    this.deleteProductById(id);

    let productOld = this.readProducts();

    let prodModified = [{ ...product, id }, ...productOld];
    fs.writeFileSync(this.patch, JSON.stringify(prodModified));
  };
}

const productManager = new ProductManager();
productManager.addProduct("titulo1", "descripcion1", 1, "img1", 1, 1);
productManager.addProduct("titulo2", "descripcion1", 2, "img1", 2, 2);
productManager.addProduct("titulo3", "descripcion1", 1, "img1", 3, 3);
productManager.addProduct("titulo4", "descripcion1", 4, "img1", 4, 4);
productManager.addProduct("titulo5", "descripcion1", 5, "img1", 5, 5);
productManager.addProduct("titulo6", "descripcion1", 6, "img1", 6, 6);
productManager.addProduct("titulo7", "descripcion1", 7, "img1", 7, 7);
productManager.addProduct("titulo8", "descripcion1", 8, "img1", 8, 8);
productManager.addProduct("titulo9", "descripcion1", 9, "img1", 9, 9);

const express = require("express");
const { error } = require("console");

const app = express();

app.use(express.urlencoded({ extended: true }));
const readProducts = productManager.readProducts();

app.get("/productos", async (req, res) => {
  let limit = parseInt(req.query.limit);

  if (!limit) return res.send(await readProducts);
  let allProducts = await readProducts;
  let productLimit = allProducts.slice(0, limit);
  res.send(productLimit);
});

app.get("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let allProducts = await readProducts;
  let productById = allProducts.find((prod) => prod.id === id);

  res.send(productById);
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(
    `El servidor esta corriendo en el LocalHost: ${server.address().port}`
  );
});
server.on("error", (error) => console.log(`Error del servidor ${error}`));

console.log(readProducts);
