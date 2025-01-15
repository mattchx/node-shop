const express = require('express')
const cors = require('cors')

const app = express()

const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
];

const cart = []

app.use(express.json())
app.use(cors())


app.get('/products', (req, res) => {
  res.json(products);
})

app.post('/cart', (req, res) => {
  const productId = req.body.id
  cart.push(productId)
  console.log("Cart:", cart)
  req.json(cart)
})


const port = 3001;
app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
