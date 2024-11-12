import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import AppNavbar from "./components/AppNavbar";
import PosPage from "./pages/PosPage";
import PosOrderPage from "./pages/PosOrderPage";
import ProductManagement from "./pages/ProductManagement";
import AccountManagement from "./pages/AccountManagement";
import VoucherManagement from "./pages/VoucherManagement";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Hàm thu gọn/mở rộng sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="d-flex">
      {/* Kiểm tra đăng nhập và điều hướng */}
      {!isLoggedIn ? (
        <Routes>
          <Route path="/dangnhap" element={<LoginPage />} />
          <Route path="/dangky" element={<RegisterPage />} />
          <Route path="/quenmatkhau" element={<ForgotPasswordPage />} />
          <Route path="*" element={<Navigate to="/dangnhap" replace />} />
        </Routes>
      ) : (
        <>
          <Sidebar isOpen={isSidebarOpen} />

          <div style={{ flex: 1 }}>
            <AppNavbar onToggleSidebar={toggleSidebar} />

            <div className="p-4">
              <Routes>
                <Route path="/banhangtaiquay" element={<PosPage />} />
                <Route path="/hoadon" element={<PosOrderPage />} />
                <Route path="/sanpham/*" element={<ProductManagement />} />
                <Route path="/taikhoan/*" element={<AccountManagement />} />
                <Route path="/giamgia/*" element={<VoucherManagement />} />
                <Route
                  path="*"
                  element={<Navigate to="/banhangtaiquay" replace />}
                />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  );
}
