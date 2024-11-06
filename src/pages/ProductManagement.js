// src/pages/ProductManagement.js
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import ProductVariantsPage from './product/ProductVariantsPage';
import AddProductPage from './product/AddProductPage';
import ProductList from './ProductList';
import SoleTypeList from './product/SoleType';

function ProductManagement() {
  return (
    <div>
      {/* Routes cho các route con */}
      <div className="p-4">
        <Routes>
          <Route path="danhsachsanpham" element={<ProductList />} />
          <Route path="quanlybienthesanpham" element={<ProductVariantsPage />} />
          <Route path="/danhsachsanpham/themsanpham" element={<AddProductPage />} />
          <Route path="/degiay" element={<SoleTypeList />} />
        </Routes>

        {/* Outlet để hiển thị các thành phần con */}
        <Outlet />
      </div>
    </div>
  );
}

export default ProductManagement;
