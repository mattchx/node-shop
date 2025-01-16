import { useState, useEffect } from 'react'
import { apiRequest } from './util/api'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const initalFetch = async () => {
    setLoading(true)
    try {
      const data = await apiRequest("", "GET")
      setProducts(data.products)
      setCart(data.cart)
      console.log(data)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // fetch get products
    initalFetch()
  }, [])

  const addToCart = async (id) => {
    try {
      const data = await apiRequest("cart", "POST", { id, quantity: 1 })
      setCart(data)
    } catch (err) {
      console.log(err)
    }
  }

  const removeFromCart = async (id) => {
    try {
      const data = await apiRequest("cart", "POST", { id, quantity: -1 })
      setCart(data)
    } catch (err) {
      console.log(err)
    }
  }

  const clearFromCart = async (id) => {
    try {
      const data = await apiRequest("cart", "DELETE", { id })
      setCart(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h3>Welcome to our store!</h3>
      {error && <p>Error: {error}</p>}
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
              <button onClick={() => addToCart(x.id)}>+</button>
            </div>
            <button onClick={() => clearFromCart(x.id)}>Remove All</button>
          </li>
        ))
        }
      </ul>

    </>
  )
}

export default App
