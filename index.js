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

productManager.addProduct("title", "description", 20, "img", 10, 4);
