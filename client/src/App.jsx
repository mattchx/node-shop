import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)

  // [x] fetch get product list
  // [x] store product list in state
  // [x] create state for cart
  // [x] fetch post the selected item to cart

  const url = 'http://localhost:3001/'

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch(url + 'products', { method: "GET", headers: { 'Content-Type': 'application/json' } });
      const data = await response.json()
      setProducts(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // fetch get products
    fetchProducts()
  }, [])

  const addToCart = async (id, quantity = 1) => {
    try {
      const response = await fetch(url + 'cart', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, quantity })
      })
      const data = await response.json()
      setCart(data)
    } catch (err) {
      console.log(err)
    }
  }

  const removeFromCart = async (id) => {
    try {
      const response = await fetch(url + 'cart', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, quantity: -1 })
      })
      const data = await response.json()
      setCart(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h3>Welcome to our store!</h3>
      {loading ? "Loading..." :
        <div className='product-list'>
          {Array.isArray(products) && products.map(x => (
            <div className="product" key={x.id}>
              <strong>{x.name}</strong>
              <p>${x.price}</p>
              <button onClick={() => addToCart(x.id)}>Add To Cart</button>
            </div>
          ))
          }
        </div>
      }
      <ul className='cart'>
        {cart.length === 0 && <p>Your cart is currently empty.</p>}
        {Array.isArray(cart) && cart.map(x => (
          <li className="cart-item" key={x.id}>
            <strong>{x.name}</strong>
            <p>${x.price}</p>
            <div className="quantity-controls">
              <button onClick={() => removeFromCart(x.id)}>-</button>
              <span className='quantity'>x {x.quantity}</span>
              <button onClick={() => addToCart(x.id, 1)}>+</button>
            </div>
            <button onClick={() => removeFromCart(x.id)}>Remove All</button>
          </li>
        ))
        }
      </ul>

    </>
  )
}

export default App
