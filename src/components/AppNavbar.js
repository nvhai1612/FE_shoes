// src/components/AppNavbar.js
import React from 'react'; // Xóa useState nếu không cần thiết
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaUser, FaBars } from 'react-icons/fa';

function AppNavbar({ onToggleSidebar }) {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid>
        {/* Hamburger icon để thu gọn menu */}
        <Navbar.Brand href="#" onClick={onToggleSidebar} className="d-flex align-items-center">
          <FaBars size={24} className="me-2" />
        </Navbar.Brand>

        {/* Tùy chọn để thu gọn menu trên màn hình nhỏ */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            {/* Icon người dùng */}
            <Nav.Link href="#user-profile">
              <FaUser size={24} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
