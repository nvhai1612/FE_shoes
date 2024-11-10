import React from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FaUser, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AppNavbar({ onToggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa trạng thái đăng nhập khỏi localStorage
    localStorage.removeItem("isLoggedIn");
    // Điều hướng về trang đăng nhập
    navigate("/dangnhap");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid>
        {/* Hamburger icon để thu gọn menu */}
        <Navbar.Brand
          onClick={onToggleSidebar}
          className="d-flex align-items-center"
          style={{ cursor: "pointer" }}
        >
          <FaBars size={24} className="me-2" />
        </Navbar.Brand>

        {/* Tùy chọn để thu gọn menu trên màn hình nhỏ */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            {/* Dropdown cho biểu tượng người dùng */}
            <Dropdown align="end">
              <Dropdown.Toggle as={Nav.Link} style={{ cursor: "pointer" }}>
                <FaUser size={24} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/taikhoan">
                  Tài Khoản Của Tôi
                </Dropdown.Item>
                <Dropdown.Item href="/doimatkhau">Đổi mật khẩu</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Đăng Xuất</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
