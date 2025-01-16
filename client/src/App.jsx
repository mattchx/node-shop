import { useState, useEffect } from 'react'
import ProductForm from './components/ProductForm'
import { apiRequest } from './util/api'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const initalFetch = async () => {
    setLoading(true)
    try {
      const data = await apiRequest("", "GET")
      setProducts(data.products)
      setCart(data.cart)
      console.log(data)
    } catch (err) {
      setError({
        message: err.message,
        status: err.status,
        details: err.details
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    initalFetch()
  }, [])

  const addToCart = async (id) => {
    try {
      const data = await apiRequest("cart", "POST", { id, quantity: 1 })
      setCart(data)
    } catch (err) {
      setError({
        message: err.message,
        status: err.status,
        details: err.details
      })
    }
  }

  const removeFromCart = async (id) => {
    try {
      const data = await apiRequest("cart", "POST", { id, quantity: -1 })
      setCart(data)
    } catch (err) {
      setError({
        message: err.message,
        status: err.status,
        details: err.details
      })
    }
  }

  const clearFromCart = async (id) => {
    try {
      const data = await apiRequest("cart", "DELETE", { id })
      setCart(data)
    } catch (err) {
      setError({
        message: err.message,
        status: err.status,
        details: err.details
      })
    }
  }

  return (
    <>
      <ProductForm />
      <h2>Welcome to our store!</h2>
      {error && (
        <div className="error-message">
          <h3>Error: {error.message}</h3>
          {error.status === 400 && <p>Please check your input and try again</p>}
          {error.status === 404 && <p>The requested resource was not found</p>}
          {error.status === 422 && <p>Invalid data: {error.details?.errors?.join(', ') || ''}</p>}
          {error.status >= 500 && <p>Server error - please try again later</p>}
        </div>
      )}
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
