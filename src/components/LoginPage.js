import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import "bootstrap/dist/css/bootstrap.min.css";
import shoeImage from "../assets/logo.png";
import bglogin from "../assets/bglogin.jpg";

function LoginPage() {
  const navigate = useNavigate();

  // Dữ liệu tài khoản ảo
  const fakeUser = {
    username: "nvhai1612",
    password: "16122003",
  };

  // State cho tài khoản và mật khẩu người dùng nhập vào
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hàm xử lý khi người dùng đăng nhập
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === fakeUser.username && password === fakeUser.password) {
      // Lưu trạng thái đăng nhập (có thể dùng localStorage hoặc state context)
      localStorage.setItem("isLoggedIn", true);
      navigate("/home"); // Điều hướng đến trang chính
    } else {
      setError("Tên đăng nhập hoặc mật khẩu không chính xác");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bglogin})`, // Sửa lại cho đúng cú pháp
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
        <Card style={{ width: "300px", padding: "20px", borderRadius: "10px" }}>
          <div className="text-center mb-4">
            <img
              src={shoeImage} // Sử dụng biến shoeImage đã import
              alt="logo"
              style={{ width: "50px", height: "50px" }}
            />
          </div>

          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Tài khoản</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tài khoản"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" className="mt-3">
              <Form.Check type="checkbox" label="Lưu mật khẩu" />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mt-3">
              Đăng nhập
            </Button>

            {error && <p className="text-danger text-center mt-3">{error}</p>}

            <div className="text-center mt-3">
              <span style={{ color: "#28a745" }}>
                <Link
                  to="/dangky" // Sử dụng Link thay vì thẻ a
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
                  Đăng ký
                </Link>
                |
                <Link
                  to="/quenmatkhau" // Sử dụng Link thay vì thẻ a
                  style={{
                    color: "#28a745",
                    textDecoration: "none",
                    marginLeft: "8px",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.textDecoration = "underline")
                  }
                  onMouseOut={(e) => (e.target.style.textDecoration = "none")}
                >
                  Quên mật khẩu
                </Link>
              </span>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default LoginPage;
