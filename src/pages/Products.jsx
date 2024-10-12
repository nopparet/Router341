import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import { addProduct, removeProduct } from '../features/productSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

function Products() { 
  const dispatch = useDispatch(); 
  const productList = useSelector((state) => state.products); 
  
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = () => { 
    if (newProduct.id && newProduct.name && newProduct.price) {
      dispatch(addProduct(newProduct)); 
      setNewProduct({ id: '', name: '', price: '', description: '' }); // clear form
    }
  }; 

  const handleRemoveProduct = (id) => { 
    dispatch(removeProduct(id)); 
  }; 

  return ( 
    <div className="container mt-5"> 
      <h2 className="text-center">Product List</h2> 
      <ul className="list-group mb-4"> 
        {productList.map(product => ( 
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center"> 
            <Link to={`/product/${product.id}`} className="text-decoration-none"> 
              {product.name} - ${product.price} 
            </Link> 
            <button className="btn btn-danger btn-sm" onClick={() => handleRemoveProduct(product.id)}>Remove</button> 
          </li> 
        ))} 
      </ul> 

      <h3 className="text-center">Add a New Product</h3>
      <div className="mb-3">
        <input
          type="text"
          name="id"
          value={newProduct.id}
          onChange={handleInputChange}
          placeholder="Product ID"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="price"
          value={newProduct.price}
          onChange={handleInputChange}
          placeholder="Product Price"
          className="form-control mb-2"
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleInputChange}
          placeholder="Product Description"
          className="form-control mb-3"
        />
        <button className="btn btn-primary" onClick={handleAddProduct}>Add Product</button> 
      </div>
    </div> 
  ); 
} 

export default Products;
