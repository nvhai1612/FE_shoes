import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import shoeImage from "../assets/logo.png";
import bglogin from "../assets/bglogin.jpg";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();

  // State cho tài khoản, mật khẩu, trạng thái checkbox "Lưu mật khẩu" và hiển thị mật khẩu
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Dữ liệu tài khoản ảo (dành cho trường hợp không thể kết nối đến server)
  const fakeUser = {
    username: "nvhai1612",
    password: "16122003",
  };

  // useEffect để tự động điền thông tin từ localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && savedPassword && savedRememberMe) {
      setUsername(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  // Hàm xử lý khi người dùng đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/public/login",
        {
          email: username,
          password: password,
        }
      );

      const { token, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (rememberMe) {
        localStorage.setItem("savedEmail", username);
        localStorage.setItem("savedPassword", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
        localStorage.removeItem("rememberMe");
      }

      if (role === "ROLE_ADMIN") {
        navigate("/admin");
      } else if (role === "ROLE_EMPLOYEE") {
        navigate("/employee");
      } else if (role === "ROLE_CUSTOMER") {
        navigate("/home");
      }
    } catch (error) {
      console.log("Error Response:", error.response);

      // Nếu không thể kết nối đến server, kiểm tra tài khoản ảo
      if (
        !error.response &&
        username === fakeUser.username &&
        password === fakeUser.password
      ) {
        localStorage.setItem("isLoggedIn", true);
        navigate("/home");
      } else if (error.response) {
        const data = error.response.data;
        const status = error.response.status;
        const errorMessage =
          data.message || data.error || "Sai email hoặc mật khẩu.";

        if (
          status === 404 &&
          errorMessage.includes("Không tìm thấy tài khoản")
        ) {
          setError(`Không tìm thấy tài khoản có email ${username}`);
        } else if (
          status === 401 &&
          errorMessage.includes("Mật khẩu không chính xác")
        ) {
          setError("Mật khẩu không chính xác");
        } else {
          setError(errorMessage);
        }
      } else {
        setError("Không thể kết nối đến server, vui lòng thử lại sau.");
      }
    }
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
        <Card style={{ width: "300px", padding: "20px", borderRadius: "10px" }}>
          <div className="text-center mb-4">
            <img
              src={shoeImage}
              alt="logo"
              style={{ width: "50px", height: "50px" }}
            />
          </div>

          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tài khoản"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Mật khẩu</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="position-absolute"
                  style={{
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox" className="mt-3">
              <Form.Check
                type="checkbox"
                label="Lưu mật khẩu"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mt-3">
              Đăng nhập
            </Button>

            {error && <p className="text-danger text-center mt-3">{error}</p>}

            <div className="text-center mt-3">
              <span style={{ color: "#28a745" }}>
                <Link
                  to="/dangky"
                  style={{
                    color: "#28a745",
                    textDecoration: "none",
                    marginRight: "8px",
                  }}
                >
                  Đăng ký
                </Link>
                |
                <Link
                  to="/quenmatkhau"
                  style={{
                    color: "#28a745",
                    textDecoration: "none",
                    marginLeft: "8px",
                  }}
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
