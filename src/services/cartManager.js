import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export class CartManager {
  constructor() {
    this.path = "cart.json";
    this.cart = [];
  }

  getCart = async () => {
    const response = await fs.readFile(this.path, "utf8");
    const responseJSON = JSON.parse(response);
    return responseJSON;
  };

  getCartProducts = async (id) => {
    const carts = await this.getCart();

    const cart = carts.find((cart) => cart.id === id);

    if (cart) {
      return cart.products;
    } else {
      console.log("Carrito no encontrado");
    }
  };

  newCart = async () => {
    const id = uuidv4();

    const newCart = { id: id, products: [] };

    this.cart = await this.getCart();
    this.cart.push(newCart);

    await fs.writeFile(this.path, JSON.stringify(this.cart));
    return newCart;
  };

  addProductToCart = async (cart_id, product_id) => {
    const response = await this.getCart();

    const index = response.findIndex((cart) => cart.id === cart_id);

    if (index != -1) {
      const cartProducts = await this.getCartProducts(cart_id);

      const existingProductsIndex = cartProducts.findIndex(
        (prod) => prod.product_id === product_id
      );

      if ((existingProductsIndex = !-1)) {
        cartProducts[existingProductsIndex].quantity =
          cartProducts[existingProductsIndex].quantity + 1;
      } else {
        cartProducts.push({ product_id, quantity: 1 });
      }

      response[index].products = cartProducts;

      await fs.writeFile(this.path, JSON.stringify(this.cart));
      console.log("Producto agregado correctamente");
    } else {
      console.log("Carrito no encontrado");
    }
  };
}
