import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Thêm hook để điều hướng
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.png"; // Import logo

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(""); // Mã khôi phục
  const [newPassword, setNewPassword] = useState(""); // Mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(""); // Xác nhận mật khẩu
  const [validated, setValidated] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false); // Kiểm tra xem mã đã được gửi chưa
  const [isCodeValid, setIsCodeValid] = useState(false); // Kiểm tra tính hợp lệ của mã
  const navigate = useNavigate(); // Hook để điều hướng người dùng

  // Handle change cho email, mã khôi phục, mật khẩu và xác nhận mật khẩu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "code") setCode(value);
    if (name === "newPassword") setNewPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    setValidated(true);

    // Gửi mã khôi phục qua email
    if (email) {
      toast.success("Mã khôi phục đã được gửi đến email của bạn!");
      setIsCodeSent(true);
      // Thực hiện gửi mã qua email tại đây
      // Ví dụ: Gửi yêu cầu đến server để gửi email
    } else {
      toast.error("Vui lòng nhập email hợp lệ!");
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();

    // Kiểm tra tính hợp lệ của mã khôi phục
    if (code === "123456") {
      // Giả sử mã là 123456 cho ví dụ
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

      // Sau khi thay đổi mật khẩu thành công, chuyển hướng về trang đăng nhập
      setTimeout(() => {
        navigate("/dangnhap"); // Chuyển hướng về trang đăng nhập
      }, 2000); // Đợi 2 giây trước khi chuyển hướng
    } else if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp!");
    } else {
      toast.error("Vui lòng nhập mật khẩu mới.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center">
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

          {/* Bước 1: Nhập email để gửi mã */}
          {!isCodeSent && (
            <Form noValidate validated={validated} onSubmit={handleSendCode}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={handleInputChange}
                  name="email"
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

          {/* Bước 2: Nhập mã khôi phục */}
          {isCodeSent && !isCodeValid && (
            <Form noValidate validated={validated} onSubmit={handleVerifyCode}>
              <Form.Group controlId="formCode" className="mb-3">
                <Form.Label>Mã khôi phục</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập mã khôi phục"
                  value={code}
                  onChange={handleInputChange}
                  name="code"
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

          {/* Bước 3: Nhập mật khẩu mới và xác nhận mật khẩu */}
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
                  value={newPassword}
                  onChange={handleInputChange}
                  name="newPassword"
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
                  value={confirmPassword}
                  onChange={handleInputChange}
                  name="confirmPassword"
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
            <a
              href="/dangnhap"
              style={{ color: "#28a745", textDecoration: "none" }}
            >
              Quay lại Đăng nhập
            </a>
          </div>
        </Card>
      </Container>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default ForgotPasswordPage;
