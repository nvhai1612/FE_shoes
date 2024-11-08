// src/pages/ProductManagement.js
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import ProductVariantsPage from './product/ProductVariantsPage';
import AddProductPage from './product/AddProductPage';
import ProductList from './ProductList';
import SoleTypeList from './product/SoleType';
import BrandList from './product/BrandList';
import MaterialList from './product/MaterialList';
import ColorList from './product/ColorList';
import SizeList from './product/SizeList';


function ProductManagement() {
  return (
    <div>
      {/* Routes cho các route con */}
      <div>
        <Routes>
          <Route path="danhsachsanpham" element={<ProductList />} />
          <Route path="quanlybienthesanpham" element={<ProductVariantsPage />} />
          <Route path="/danhsachsanpham/themsanpham" element={<AddProductPage />} />
          <Route path="/degiay" element={<SoleTypeList />} />
          <Route path="/thuonghieu" element={<BrandList />} />
          <Route path="/chatlieu" element={<MaterialList />} />
          <Route path="/mausac" element={<ColorList />} />
          <Route path="/kichco" element={<SizeList />} />
        </Routes>

        {/* Outlet để hiển thị các thành phần con */}
        <Outlet />
      </div>
    </div>
  );
}

export default ProductManagement;
