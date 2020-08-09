const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const shortid = require("shortid")

// var data = require("./build/data.json")
const app = express()
app.use(bodyParser.json())

// deploy
app.use("/", express.static(__dirname + "/build"))
app.get("/", (req, res) => res.sendFile(__dirname + "/build/inde.html"))

// mongodb
mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const Product = mongoose.model("products", new mongoose.Schema({
  _id: {type: String, default: shortid.generate},
  title: String,
  description: String,
  image: String,
  price: Number,
  availableSizes: [String],
}))

app.get("/api/products", async (req, res) => {
  const products = await Product.find({})
  res.send(products)
})

app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body)
  const savedProduct = await newProduct.save()
  res.send(savedProduct)
})

app.delete("/api/products/:id", async(req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id)
  res.send(deletedProduct)
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log("server at http://localhost:5000"))