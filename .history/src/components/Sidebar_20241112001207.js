import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import {
  FaChartPie,
  FaCashRegister,
  FaFileInvoice,
  FaProductHunt,
  FaUser,
  FaTags,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import logoImage from "../assets/logo.png";

function Sidebar({ isOpen = true, onNavigate }) {
  const [activeKey, setActiveKey] = useState("/thongke");
  const [sidebarStyle, setSidebarStyle] = useState({
    width: "250px",
    transition: "width 0.3s",
  });
  const [openSubMenu, setOpenSubMenu] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setSidebarStyle({ width: "250px", transition: "width 0.3s" });
    } else {
      setSidebarStyle({ width: "60px", transition: "width 0.3s" });
    }
  }, [isOpen]);

  const handleClick = (key) => {
    setActiveKey(key);
    onNavigate(key);
  };

  const toggleSubMenu = (menuKey) => {
    setOpenSubMenu(openSubMenu === menuKey ? null : menuKey);
  };

  return (
    <div
      className="sidebar p-3 bg-light"
      style={{ ...sidebarStyle, minHeight: "100vh" }}
    >
      {/* Logo */}
      <div className="text-center mb-4">
        <img
          src={logoImage}
          alt="Logo"
          style={{
            width: isOpen ? "150px" : "40px",
            transition: "width 0.3s",
          }}
        />
      </div>

      {/* Navigation Links */}
      <Nav className="flex-column text-dark">
        <Nav.Item className="mb-3">
          <Nav.Link
            className={`d-flex align-items-center text-dark ${
              activeKey === "/thongke" ? "fw-bold" : ""
            }`}
            onClick={() => handleClick("thongke")}
          >
            <FaChartPie className="me-2" />
            {isOpen && "Thống kê"}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-3">
          <Nav.Link
            className={`d-flex align-items-center text-dark ${
              activeKey === "/banhangtaiquay" ? "fw-bold" : ""
            }`}
            onClick={() => handleClick("banhangtaiquay")}
          >
            <FaCashRegister className="me-2" />
            {isOpen && "Bán Hàng Tại Quầy"}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-3">
          <Nav.Link
            className={`d-flex align-items-center text-dark ${
              activeKey === "/hoadon" ? "fw-bold" : ""
            }`}
            onClick={() => handleClick("hoadon")}
          >
            <FaFileInvoice className="me-2" />
            {isOpen && "Quản Lý Hóa Đơn"}
          </Nav.Link>
        </Nav.Item>

        {/* Quản Lý Sản Phẩm với submenu */}
        <Nav.Item className="mb-3">
          <Nav.Link
            className={`d-flex align-items-center justify-content-between text-dark ${
              openSubMenu === "/sanpham" ? "fw-bold" : ""
            }`}
            onClick={() => toggleSubMenu("/sanpham")}
          >
            <div className="d-flex align-items-center">
              <FaProductHunt className="me-2" />
              {isOpen && "Quản Lý Sản Phẩm"}
            </div>
            {isOpen &&
              (openSubMenu === "/sanpham" ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              ))}
          </Nav.Link>
          {openSubMenu === "/sanpham" && isOpen && (
            <Nav className="flex-column ms-4">
              <Nav.Link
                className={`text-dark ${
                  activeKey === "sanpham\\danhsachsanpham" ? "fw-bold" : ""
                }`}
                onClick={() => handleClick("sanpham\\danhsachsanpham")}
              >
                Sản phẩm
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${
                  activeKey === "/sanpham/degiay" ? "fw-bold" : ""
                }`}
                onClick={() => handleClick("/sanpham/degiay")}
              >
                Đế giày
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${
                  activeKey === "/sanpham/thuonghieu" ? "fw-bold" : ""
                }`}
                onClick={() => handleClick("/sanpham/thuonghieu")}
              >
                Thương hiệu
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${
                  activeKey === "/sanpham/chatlieu" ? "fw-bold" : ""
                }`}
                onClick={() => handleClick("/sanpham/chatlieu")}
              >
                Chất liệu
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${
                  activeKey === "/sanpham/mausac" ? "fw-bold" : ""
                }`}
                onClick={() => handleClick("/sanpham/mausac")}
              >
                Màu sắc
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${
                  activeKey === "/sanpham/kichco" ? "fw-bold" : ""
                }`}
                onClick={() => handleClick("/sanpham/kichco")}
              >
                Kích cỡ
              </Nav.Link>
            </Nav>
          )}
        </Nav.Item>

        {/* Quản Lý Tài Khoản với submenu */}
        <Nav.Item className="mb-3">
          <Nav.Link
            className={`d-flex align-items-center justify-content-between text-dark ${
              openSubMenu === "/taikhoan" ? "fw-bold" : ""
            }`}
            onClick={() => toggleSubMenu("/taikhoan")}
          >
            <div className="d-flex align-items-center">
              <FaUser className="me-2" />
              {isOpen && "Quản Lý Tài Khoản"}
            </div>
            {isOpen &&
              (openSubMenu === "/taikhoan" ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              ))}
          </Nav.Link>
          {openSubMenu === "/taikhoan" && isOpen && (
            <Nav className="flex-column ms-4">
              <Nav.Link
                className={`text-dark ${
                  activeKey === "/taikhoan/khachhang" ? "fw-bold" : ""
                }`}
                onClick={() => handleClick("/taikhoan/khachhang")}
              >
                Khách hàng
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${
                  activeKey === "/taikhoan/nhanvien" ? "fw-bold" : ""
                }`}
                onClick={() => handleClick("/taikhoan/nhanvien")}
              >
                Nhân viên
              </Nav.Link>
            </Nav>
          )}
        </Nav.Item>

        {/* Quản Lý Giảm giá với submenu */}
        <Nav.Item className="mb-3">
          <Nav.Link
            className={`d-flex align-items-center justify-content-between text-dark ${
              openSubMenu === "/giamgia" ? "fw-bold" : ""
            }`}
            onClick={() => toggleSubMenu("/giamgia")}
          >
            <div className="d-flex align-items-center">
              <FaTags className="me-2" />
              {isOpen && "Giảm giá"}
            </div>
            {isOpen &&
              (openSubMenu === "/giamgia" ? (
                <FaChevronDown />
              ) : (
                <FaChevronRight />
              ))}
          </Nav.Link>
          {openSubMenu === "/giamgia" && isOpen && (
            <Nav className="flex-column ms-4">
              <Nav.Link
                className={`text-dark ${
                  activeKey === "/giamgia/dotgiamgia" ? "fw-bold" : ""
                }`}
                onClick={() => handleClick("/giamgia/dotgiamgia")}
              >
                Đợt giảm giá
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${
                  activeKey === "/giamgia/phieugiamgia" ? "fw-bold" : ""
                }`}
                onClick={() => handleClick("/giamgia/phieugiamgia")}
              >
                Phiếu giảm giá
              </Nav.Link>
            </Nav>
          )}
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;
