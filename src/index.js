import express from "express";
import { ProductManager } from "./controllers/productManager.js";
import { CartManager } from "./controllers/cartManager.js";
import { productsRouter } from "./controllers/products.router.js";
import { cartRouter } from "./controllers/cart.router.js";

const PORT = 8080;

const app = express();

export const productManager = new ProductManager();
export const cartManager = new CartManager();

app.use(express.json());
app.use("/api/products", productsRouter); // http://localhost:PORT/api/products
app.use("/api/cart", cartRouter);

app.listen(PORT, (req, res) => {
  console.log(`Servidor escuchando en el puerto: ${PORT}`);
});
