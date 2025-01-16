import { useState } from 'react';
import './ProductForm.css'
import { apiRequest } from '../util/api';
import PropTypes from 'prop-types';

ProductForm.propTypes = {
  addToProductList: PropTypes.func.isRequired,
};

function ProductForm({ addToProductList }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    try {
      const response = await apiRequest('/products', "POST", { name, price })
      console.log('res', response)
      addToProductList(response)
    } catch (err) {
      setError(err)
    } finally {
      setIsSubmitting(false)
    }
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

      {error && <p>{error.message}</p>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
}

export default ProductForm;