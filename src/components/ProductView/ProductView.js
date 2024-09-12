import React, { useEffect, useState } from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

function ProductView({ products }) {

  const [sideOpen, setSideOpen] = useState(() => {
    const savedState = localStorage.getItem("sideOpen");
    return savedState !== null ? JSON.parse(savedState) : true
  });
  const [selectedProduct, setSelectedProduct] = useState(() => {
    const savedProductId = localStorage.getItem("selectedProduct");
    return savedProductId ? products.find(product => product.id === JSON.parse(savedProductId)): null
  });

  useEffect(() => {
    if (selectedProduct) setSideOpen(true);
  }, [selectedProduct]);

  useEffect(() => {
    if (!sideOpen) setSelectedProduct(null);
  }, [sideOpen]);

  useEffect(() => {
    console.log("UseEffect responsople for localStorage is running")
    localStorage.setItem("sideOpen", JSON.stringify(sideOpen));
  }, [sideOpen]);

  useEffect(() => {
    if (selectedProduct) {
      localStorage.setItem('selectedProduct', selectedProduct.id)
    } else {
      localStorage.removeItem('selectedProduct')
    }
  }, [selectedProduct]);

  return (
    <div className="product-view">
      <div className="product-main-area">
        <h1>Products</h1>
        <div className="product-list">
          {products.map(item =>
            <ProductListItem
              key={item.id}
              product={item}
              onClick={() => {
                setSelectedProduct(selectedProduct === item ? null : item);
              }}
              isSelected={selectedProduct === item}
            />
          )}
        </div>
      </div>
      <div className="product-side-panel">
        <div className="product-side-panel-toggle-wrapper">
          <div className="product-side-panel-toggle"
            onClick={() => setSideOpen(!sideOpen)}>
            {sideOpen ? '>' : '<'}
          </div>
        </div>
        <ProductDetails product={selectedProduct} visible={sideOpen} />
      </div>
    </div>
  );
}

export default ProductView;
