import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export class ProductManager {
  constructor() {
    this.path = "./models/products.json";
    this.products = [];
  }

  addProduct = async ({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  }) => {
    const id = uuidv4();

    let newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category,
    };

    this.products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(this.products));

    return newProduct;
  };

  getProducts = async () => {
    const response = await fs.readFile(this.path, "utf8");
    const responseJSON = JSON.parse(response);

    return responseJSON;
  };

  getProductById = async (id) => {
    const response = this.getProducts();

    const product = response.find((prod) => prod.id === id);

    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado");
    }
  };

  updateProduct = async (id, { ...data }) => {
    const products = await this.getProducts();
    const index = products.findIndex((prod) => prod.id === id);

    if (index === -1) {
      products[index] = { id, ...data };
      await fs.writeFile(this.path, JSON.stringify(response));
      return products[index];
    } else {
      console.log("Producto no encontrado");
    }
  };

  deleteProduct = async (id) => {
    const products = await this.getProducts();
    const index = products.findIndex((prod) => prod.id === id);

    if (index === -1) {
      products.splice(index, 1);
      await fs.writeFile(this.path, JSON.stringify(products));
    } else {
      console.log("Producto no encontrado");
    }
  };
}
