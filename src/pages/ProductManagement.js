// src/pages/ProductManagement.js
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import ProductVariantsPage from './product/ProductVariantsPage';
import AddProductPage from './product/AddProductPage';

function ProductManagement() {
  return (
    <div>
      {/* Routes cho các route con */}
      <div className="p-4">
        <Routes>
          <Route path="quanlybienthesanpham" element={<ProductVariantsPage />} />
          <Route path="/quanlybienthesanpham/addproducts" element={<AddProductPage />} />
        </Routes>

        {/* Outlet để hiển thị các thành phần con */}
        <Outlet />
      </div>
    </div>
  );
}

export default ProductManagement;
