import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom"; // Dùng Link thay vì a
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import bglogin from "../assets/bglogin.jpg"; // Ảnh nền
import logo from "../assets/logo.png"; // Logo

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      toast.success("Đăng ký thành công!");
      // Xử lý logic đăng ký (gửi dữ liệu đến server hoặc lưu vào localStorage)
    } else {
      toast.error("Mật khẩu không khớp!");
    }
    setValidated(true);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bglogin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Card
          style={{
            width: "400px",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="text-center mb-4">
            <img
              src={logo} // Sử dụng logo đã import
              alt="logo"
              style={{ width: "60px", height: "60px" }}
            />
            <h4 className="mt-2">Đăng Ký</h4>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên của bạn là gì"
                name="name"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tên tài khoản.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập email hợp lệ.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mật khẩu.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Xác nhận mật khẩu"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng xác nhận mật khẩu.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mt-3">
              Đăng ký
            </Button>
          </Form>
          <div className="text-center mt-3">
            <span style={{ color: "#28a745" }}>
              <Link
                to="/dangnhap" // Link đến trang đăng nhập
                style={{
                  color: "#28a745",
                  textDecoration: "none",
                  marginRight: "8px",
                }}
                onMouseOver={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
              >
                Đã có tài khoản? Đăng nhập
              </Link>
            </span>
          </div>
        </Card>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default RegisterPage;
