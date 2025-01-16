const express = require('express')
const cors = require('cors')
const { HttpError, BadRequestError, NotFoundError, ValidationError } = require('./errors')

const app = express()

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  // Handle unexpected errors
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong'
  })
})

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

app.post('/cart', (req, res, next) => {
  const productId = req.body.id;
  const productQuantity = req.body.quantity;

  if (!productId || !productQuantity) {
    throw new BadRequestError('Product ID and quantity are required')
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    throw new NotFoundError('Product not found')
  }

  if (typeof productQuantity !== 'number' || productQuantity < 1) {
    throw new ValidationError('Quantity must be a positive number')
  }

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

app.delete('/cart', (req, res, next) => {
  const productId = req.body.id;

  if (!productId) {
    throw new BadRequestError('Product ID is required')
  }

  const itemExists = cart.some(x => x.id === productId);
  if (!itemExists) {
    throw new NotFoundError('Item not found in cart')
  }

  cart = cart.filter(x => x.id !== productId);

  res.json(cart)
})

const port = 3001;
app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
