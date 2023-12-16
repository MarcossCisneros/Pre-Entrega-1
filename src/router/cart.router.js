import { Router, json } from "express";
import { cartManager } from "../index.js";

const cartRouter = Router();

//CREAR UN NUEVO CARRITO => http://localhost:8080/api/cart

cartRouter.post("/", async (req, res) => {
  try {
    const response = await cartManager.newCart();
    res.json(response);
  } catch (error) {
    res.send("Error al crear carrito");
  }
});

cartRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const response = await cartManager.getCartProducts(cid);
    res.json(response);
  } catch (error) {
    res.send("Error al intentar enviar los productos del carrito");
  }
});

cartRouter.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await cartManager.addProductToCart(cid, pid);
    res.send("Producto agregado exitosamente");
  } catch (error) {
    res.send("Error al guarda producto");
  }
});

export { cartRouter };
