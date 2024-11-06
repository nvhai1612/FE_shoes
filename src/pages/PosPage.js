// src/pages/PosPage.js
import React from 'react';
// Xóa dòng import Sidebar nếu không sử dụng
import Header from '../components/Header';
import ProductTable from '../components/ProductTable';
import CustomerInfo from '../components/CustomerInfo';

function PosPage() {
  return (
    <div className="d-flex">
      {/* Nếu sidebar đã bỏ đi, bạn có thể xóa phần này */}
      <div className="main-content flex-grow-1">
        <Header />
        <div className="container mt-3">
          <ProductTable />
          <CustomerInfo />
        </div>
      </div>
    </div>
  );
}

export default PosPage;
