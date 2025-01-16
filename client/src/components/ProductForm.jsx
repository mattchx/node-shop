import { useState } from 'react';
import './ProductForm.css'
// import { createProduct } from '../util/api';

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Add a new product</h2>
      <div className="form-group">
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          min="0"
          required
        />
      </div>

      {/* <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Product'}
      </button> */}
      <button type='submit'>Add Product</button>
    </form>
  );
}

export default ProductForm;