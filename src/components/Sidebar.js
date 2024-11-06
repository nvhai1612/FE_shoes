import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { FaChartPie, FaCashRegister, FaFileInvoice, FaProductHunt, FaUser, FaTags, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import logoImage from '../assets/logo.png';

function Sidebar({ isOpen, onNavigate }) {
  const [activeKey, setActiveKey] = useState("/thongke");
  const [sidebarStyle, setSidebarStyle] = useState({ width: '250px', transition: 'width 0.3s' });
  const [openSubMenu, setOpenSubMenu] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setSidebarStyle({ width: '250px', transition: 'width 0.3s' });
    } else {
      setSidebarStyle({ width: '60px', transition: 'width 0.3s' });
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
      style={{ ...sidebarStyle, minHeight: '100vh' }}
    >
      {/* Logo */}
      <div className="text-center mb-4">
        <img
          src={logoImage}
          alt="Logo"
          style={{
            width: isOpen ? '150px' : '40px',
            transition: 'width 0.3s',
          }}
        />
      </div>

      {/* Navigation Links */}
      <Nav className="flex-column text-dark">
        <Nav.Item className="mb-3">
          <Nav.Link
            className={`d-flex align-items-center text-dark ${activeKey === "/thongke" ? "fw-bold" : ""}`}
            onClick={() => handleClick("/thongke")}
          >
            <FaChartPie className="me-2" />
            {isOpen && "Thống kê"}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-3">
          <Nav.Link
            className={`d-flex align-items-center text-dark ${activeKey === "/banhangtaiquay" ? "fw-bold" : ""}`}
            onClick={() => handleClick("/banhangtaiquay")}
          >
            <FaCashRegister className="me-2" />
            {isOpen && "Bán Hàng Tại Quầy"}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-3">
          <Nav.Link
            className={`d-flex align-items-center text-dark ${activeKey === "/hoadon" ? "fw-bold" : ""}`}
            onClick={() => handleClick("/hoadon")}
          >
            <FaFileInvoice className="me-2" />
            {isOpen && "Quản Lý Hóa Đơn"}
          </Nav.Link>
        </Nav.Item>

        {/* Quản Lý Sản Phẩm với submenu */}
        <Nav.Item className="mb-3">
          <Nav.Link
            className={`d-flex align-items-center justify-content-between text-dark ${openSubMenu === "/product" ? "fw-bold" : ""}`}
            onClick={() => toggleSubMenu("/product")}
          >
            <div className="d-flex align-items-center">
              <FaProductHunt className="me-2" />
              {isOpen && "Quản Lý Sản Phẩm"}
            </div>
            {isOpen && (openSubMenu === "/product" ? <FaChevronDown /> : <FaChevronRight />)}
          </Nav.Link>
          {openSubMenu === "/product" && isOpen && (
            <Nav className="flex-column ms-4">
              <Nav.Link
                className={`text-dark ${activeKey === "/product/quanlybienthesanpham" ? "fw-bold" : ""}`}
                onClick={() => handleClick("/product/quanlybienthesanpham")}
              >
                Sản phẩm
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${activeKey === "/product/degiay" ? "fw-bold" : ""}`}
                onClick={() => handleClick("/product/degiay")}
              >
                Đế giày
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${activeKey === "/product/thuonghieu" ? "fw-bold" : ""}`}
                onClick={() => handleClick("/product/thuonghieu")}
              >
                Thương hiệu
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${activeKey === "/product/chatlieu" ? "fw-bold" : ""}`}
                onClick={() => handleClick("/product/chatlieu")}
              >
                Chất liệu
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${activeKey === "/product/mausac" ? "fw-bold" : ""}`}
                onClick={() => handleClick("/product/mausac")}
              >
                Màu sắc
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${activeKey === "/product/kichco" ? "fw-bold" : ""}`}
                onClick={() => handleClick("/product/kichco")}
              >
                Kích cỡ
              </Nav.Link>
            </Nav>
          )}
        </Nav.Item>

        {/* Quản Lý Tài Khoản với submenu */}
        <Nav.Item className="mb-3">
          <Nav.Link
            className={`d-flex align-items-center justify-content-between text-dark ${openSubMenu === "/account" ? "fw-bold" : ""}`}
            onClick={() => toggleSubMenu("/account")}
          >
            <div className="d-flex align-items-center">
              <FaUser className="me-2" />
              {isOpen && "Quản Lý Tài Khoản"}
            </div>
            {isOpen && (openSubMenu === "/account" ? <FaChevronDown /> : <FaChevronRight />)}
          </Nav.Link>
          {openSubMenu === "/account" && isOpen && (
            <Nav className="flex-column ms-4">
              <Nav.Link
                className={`text-dark ${activeKey === "/account/khachhang" ? "fw-bold" : ""}`}
                onClick={() => handleClick("/account/khachhang")}
              >
                Khách hàng
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${activeKey === "/account/nhanvien" ? "fw-bold" : ""}`}
                onClick={() => handleClick("/account/nhanvien")}
              >
                Nhân viên
              </Nav.Link>
            </Nav>
          )}
        </Nav.Item>

        {/* Quản Lý Giảm giá với submenu */}
        <Nav.Item className="mb-3">
          <Nav.Link
            className={`d-flex align-items-center justify-content-between text-dark ${openSubMenu === "/discount" ? "fw-bold" : ""}`}
            onClick={() => toggleSubMenu("/discount")}
          >
            <div className="d-flex align-items-center">
              <FaTags className="me-2" />
              {isOpen && "Giảm giá"}
            </div>
            {isOpen && (openSubMenu === "/discount" ? <FaChevronDown /> : <FaChevronRight />)}
          </Nav.Link>
          {openSubMenu === "/discount" && isOpen && (
            <Nav className="flex-column ms-4">
              <Nav.Link
                className={`text-dark ${activeKey === "/discount/dotgiamgia" ? "fw-bold" : ""}`}
                onClick={() => handleClick("/discount/dotgiamgia")}
              >
                Đợt giảm giá
              </Nav.Link>
              <Nav.Link
                className={`text-dark ${activeKey === "/discount/phieugiamgia" ? "fw-bold" : ""}`}
                onClick={() => handleClick("/discount/phieugiamgia")}
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
