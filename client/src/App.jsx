import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)

  // [] fetch get product list
  // [] store product list in state
  // [] create state for cart
  // [] fetch post the selected item to cart

  const url = 'http://localhost:3001/'

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch(url + 'products', { method: "GET" });
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

  const addToCart = (id) => {
    // fetch post id to add item to cart in backend
    console.log(`Product ID:${id} was added to your cart`)
  }

  return (
    <>
      <h3>Welcome to your store</h3>
      {loading ? "Loading..." :
        <div className='product-list'>
          {Array.isArray(products) && products.map(p => (
            <div className="product" key={p.id}>
              <strong>{p.name}</strong>
              <p>{p.price}</p>
              <button onClick={() => addToCart(p.id)}>Add To Cart</button>
            </div>
          ))
          }
        </div>
      }

    </>
  )
}

export default App
