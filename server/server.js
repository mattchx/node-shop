const express = require('express')
const cors = require('cors')

const app = express()

const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
];

var cart = []

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.json({ products, cart });
})

app.post('/cart', (req, res) => {
  const productId = req.body.id;
  const productQuantity = req.body.quantity;

  const product = products.find(p => p.id === productId);

  // Check if product already exists in cart
  const cartItem = cart.find(x => x.id === productId);
  console.log(cartItem)
  // Update quantity if item exists in cart
  if (cartItem) {
    if (cartItem.quantity + productQuantity === 0) {
      // Remove item from cart when quantity reaches 0
      cart = cart.filter(x => x.id !== productId);
    } else {
      cartItem.quantity += productQuantity;
    }
  } else {
    // Add new item to cart with initial quantity
    cart.push({ ...product, quantity: productQuantity })
  }

  res.json(cart)
})

app.delete('/cart', (req, res) => {
  const productId = req.body.id;

  cart = cart.filter(x => x.id !== productId);

  res.json(cart)
})

const port = 3001;
app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
