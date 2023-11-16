class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = this.#id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }

  #id = 1++
}

class ProductManager{
    constructor(){
        this.products = []
    }

    addProducts(title, description, price, thumbnail, code, stock){
        if (!title || !description || !price || !thumbnail || !code || !stock){
            return console.log("Faltan Datos")
        }

        const findProduct = this.products.find(product => product.code === code);

        if(findProduct){
            return console.log("Un producto con el mismo code, ya exite")
        }

        const newProduct = new Product(title,description,price,thumbnail,code,stock);
        this.products.push(newProduct);
        consolee.log(`El producto: ${title}, a sido agregado`)
    }

    getProduct(){
        return console.log(this.products)
    }

    getProductsById(id){
        const product = this.products.find(product => product.id === id);

        if(product){
            console.log(product)
        }else{
            console.log(`Not Found`)
        }
    }
}

 




