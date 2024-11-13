import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom"; // Sử dụng Link cho điều hướng
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import bglogin from "../assets/bglogin.jpg"; // Ảnh nền
import logo from "../assets/logo.png"; // Logo

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "code":
        setCode(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    setValidated(true);

    if (email) {
      toast.success("Mã khôi phục đã được gửi đến email của bạn!");
      setIsCodeSent(true);
    } else {
      toast.error("Vui lòng nhập email hợp lệ!");
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (code === "123456") {
      setIsCodeValid(true);
      toast.success("Mã khôi phục hợp lệ! Bạn có thể thay đổi mật khẩu.");
    } else {
      toast.error("Mã khôi phục không hợp lệ!");
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      toast.success("Mật khẩu đã được thay đổi thành công!");
      setTimeout(() => {
        navigate("/dangnhap");
      }, 2000);
    } else {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp!");
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
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", minWidth: "191vh" }}
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
              src={logo}
              alt="logo"
              style={{ width: "60px", height: "60px" }}
            />
            <h4 className="mt-2">Quên Mật Khẩu</h4>
          </div>

          {!isCodeSent && (
            <Form noValidate validated={validated} onSubmit={handleSendCode}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email của bạn"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập email hợp lệ.
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="success" type="submit" className="w-100 mt-3">
                Gửi yêu cầu
              </Button>
            </Form>
          )}

          {isCodeSent && !isCodeValid && (
            <Form noValidate validated={validated} onSubmit={handleVerifyCode}>
              <Form.Group controlId="formCode" className="mb-3">
                <Form.Label>Mã khôi phục</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập mã khôi phục"
                  name="code"
                  value={code}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập mã khôi phục.
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="success" type="submit" className="w-100 mt-3">
                Xác nhận mã
              </Button>
            </Form>
          )}

          {isCodeValid && (
            <Form
              noValidate
              validated={validated}
              onSubmit={handleChangePassword}
            >
              <Form.Group controlId="formNewPassword" className="mb-3">
                <Form.Label>Mật khẩu mới</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập mật khẩu mới.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Xác nhận mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Mật khẩu xác nhận không khớp.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="success" type="submit" className="w-100 mt-3">
                Đổi mật khẩu
              </Button>
            </Form>
          )}

          <div className="text-center mt-3">
            <Link
              to="/dangnhap"
              style={{ color: "#28a745", textDecoration: "none" }}
            >
              Quay lại Đăng nhập
            </Link>
          </div>
        </Card>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default ForgotPasswordPage;
