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

  const addToCart = async (id) => {
    // fetch post id to add item to cart in backend
    console.log(`Product ID:${id} was added to your cart`)
  
    try {
      const response = await fetch(url + 'cart', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
      })
      const data = await response.json()
      setCart(data)
    } catch (err) {
      console.log(err)

    } finally {
      console.log('cart data fetched')

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
              <p>{x.price}</p>
              <button onClick={() => addToCart(x.id)}>Add To Cart</button>
            </div>
          ))
          }
        </div>
      }
      <ul className='cart'>
        {Array.isArray(cart) && cart.map(x => (
          <li className="cart-item" key={x.id}>
            <strong>{x.name}</strong>
            <p>{x.price}</p>
            <button onClick={() => addToCart(x.id)}>Remove From Cart</button>
          </li>
        ))
        }
      </ul>

    </>
  )
}

export default App
