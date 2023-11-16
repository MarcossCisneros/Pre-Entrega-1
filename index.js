class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = Product.Id();
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }

  static Id() {
    if (!this.latestId) {
      this.latestId = 1;
    } else {
      this.latestId++;
    }
    return this.latestId;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log(
        "All fields (title, description, price, thumbnail, code, stock) are required."
      );
      return;
    }

    const existingProduct = this.products.find(
      (product) => product.code === code
    );
    if (existingProduct) {
      console.log("Un producto con el mismo codigo ya existe");
      return;
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
    console.log(`Producto '${newProduct.title}' agregado con exito.`);
  }

  getProducts() {
    return console.log(this.products);
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      console.log("Producto Encontrado:", product);
    } else {
      console.log("Producto no Encontrado.");
    }
  }
}

const productManager = new ProductManager();
