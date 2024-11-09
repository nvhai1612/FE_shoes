// src/pages/VoucherManagement
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import VoucherPage from './discount/VoucherPage';
import AddVoucherPage from './discount/AddVoucherPage';


function VoucherManagement() {
  return (
    <div>
      {/* Routes cho các route con */}
      <div>
        <Routes>
          <Route path="/phieugiamgia" element={<VoucherPage />} />
          <Route path="/phieugiamgia/themphieugiamgia" element={<AddVoucherPage />} />
          <Route path="/phieugiamgia" element={<VoucherPage />} />
        </Routes>

        {/* Outlet để hiển thị các thành phần con */}
        <Outlet />
      </div>
    </div>
  );
}

export default VoucherManagement;
