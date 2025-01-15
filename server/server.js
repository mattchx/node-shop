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
    const product = products.find(p => p.id === productId)
    cart.push(product)
    res.json(cart)
})


const port = 3001;
app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
