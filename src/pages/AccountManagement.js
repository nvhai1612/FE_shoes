// src/pages/AccountManagement
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import EmployeePage from './account/EmployeePage';
import CustomerPage from './account/CustomerPage';
import AddEmployeePage from './account/AddEmployeePage';
import AddCustomerPage from './account/AddCustomerPage';


function AccountManagement() {
  return (
    <div>
      {/* Routes cho các route con */}
      <div>
        <Routes>
          <Route path="/nhanvien" element={<EmployeePage />} />
          <Route path="/nhanvien/themnhanvien" element={<AddEmployeePage />} />
          <Route path="/khachhang" element={<CustomerPage />} />
          <Route path="/khachhang/themkhachhang" element={<AddCustomerPage />} />
        </Routes>

        {/* Outlet để hiển thị các thành phần con */}
        <Outlet />
      </div>
    </div>
  );
}

export default AccountManagement;
