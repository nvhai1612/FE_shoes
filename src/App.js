// src/App.js
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import AppNavbar from './components/AppNavbar';
import PosPage from './pages/PosPage';
import PosOrderPage from './pages/PosOrderPage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductManagement from './pages/ProductManagement';
import AccountManagement from './pages/AccountManagement';
import VoucherManagement from "./pages/VoucherManagement";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Sử dụng useNavigate để chuyển trang khi sidebar thay đổi

  // Hàm để thu gọn/mở rộng sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Hàm để chuyển trang, sẽ gọi điều hướng từ Sidebar
  const handleNavigate = (page) => {
    navigate(page.replace("#", "/")); // Loại bỏ dấu '#' để chuyển đúng URL
  };

  return (
    <div className="d-flex">
      {/* Sidebar cố định bên trái, truyền trạng thái isOpen và hàm điều hướng */}
      <Sidebar isOpen={isSidebarOpen} onNavigate={handleNavigate} />

      {/* Khu vực nội dung chính */}
      <div style={{ flex: 1 }}>
        <AppNavbar onToggleSidebar={toggleSidebar} />
        
        {/* Cấu hình Routes để render đúng component */}
        <div className="p-4">
          <Routes>
            <Route path="/thongke" element={<div>Thống kê</div>} />
            <Route path="/banhangtaiquay" element={<PosPage />} />
            <Route path="/hoadon" element={<PosOrderPage />} />
            <Route  path="/sanpham/*" element={<ProductManagement />} />
            <Route path="/taikhoan/*" element={<AccountManagement />} />
            <Route path="/giamgia/*" element={<VoucherManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
