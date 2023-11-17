import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Add.css';

const Update = () => {
  const [product, setProduct] = useState({
    Product_ID: '',
    Product_Name: '',
    Product_Description: '',
    Category: '',
    Price: null,
    Image: null,
  });
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, Image: e.target.files[0] }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('Product_ID', product.Product_ID);
      formData.append('Product_Name', product.Product_Name);
      formData.append('Product_Description', product.Product_Description);
      formData.append('Category', product.Category);
      formData.append('Price', product.Price);
      formData.append('Image', product.Image);

      await axios.put(`http://localhost:8800/products/${product.Product_ID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',},});
      navigate('/products');
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };
  
  

  const handleDelete = async () => {
    try {
      // Make an API request to delete the product
      const response = await axios.delete(`http://localhost:8800/products/${product.Product_ID}`);
      navigate('/products');
      console.log('Product deleted successfully:', response.data);
      // You can add additional logic here, e.g., show a success message, redirect, etc.
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle errors, show error message, etc.
    }
  };
  


  return (
    <div className="form">
      <h1>Update Product</h1>
      <input type="text" placeholder="Product ID" name="Product_ID" onChange={handleChange}/>
      <input type="text" placeholder="Product Name" name="Product_Name" onChange={handleChange}/>
      <textarea rows={5} type="text" placeholder="Product Description" name="Product_Description" onChange={handleChange}/>
      <input type="text" placeholder="Category" name="Category" onChange={handleChange}/>
      <input type="number" placeholder="Price" name="Price" onChange={handleChange}/>
      <input type="file" accept=".jpeg, .jpg" name="Image" onChange={handleImageChange}/>
      <button onClick={handleUpdate}>Update Product</button>
      <button onClick={handleDelete}>Delete Product</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link to="/products">See all products</Link>
    </div>
  );
};

export default Update;
