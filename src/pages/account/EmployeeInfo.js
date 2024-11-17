import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function AddEmployeePage({ onBack }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Container style={{ marginTop: "-20px", paddingTop: "0" }}>
      {" "}
      {/* Điều chỉnh khoảng cách để sát header */}
      <h2
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          marginTop: "0",
        }}
      >
        Thêm nhân viên
      </h2>
      <hr style={{ margin: "10px 0 20px 0" }} />{" "}
      {/* Điều chỉnh khoảng cách hr */}
      <Form>
        <Row>
          {/* Cột trái - Thông tin nhân viên */}
          <Col md={6}>
            <h5 style={{ fontWeight: "bold" }}>Thông tin nhân viên</h5>

            {/* Ảnh chọn */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px dashed #ccc",
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                margin: "43px auto",
                fontSize: "14px",
                color: "#999",
                backgroundImage: selectedImage
                  ? `url(${selectedImage})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("imageInput").click()}
            >
              {!selectedImage && "Chọn ảnh"}
            </div>
            <input
              type="file"
              id="imageInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />

            <Form.Group
              controlId="employeeName"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control type="text" placeholder="Nhập họ và tên" />
            </Form.Group>

            <Form.Group
              controlId="employeePhone"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Số Điện Thoại</Form.Label>
              <Form.Control type="text" placeholder="Nhập số điện thoại" />
            </Form.Group>
          </Col>

          {/* Cột phải - Thông tin chi tiết */}
          <Col md={6}>
            <h5 style={{ fontWeight: "bold" }}>Thông tin chi tiết</h5>

            <Form.Group controlId="employeeID" style={{ marginBottom: "10px" }}>
              <Form.Label>Số CCCD</Form.Label>
              <Form.Control type="text" placeholder="Nhập số CCCD" />
            </Form.Group>

            <Form.Group
              controlId="employeeGender"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Giới tính</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Nam"
                  name="gender"
                  type="radio"
                  id="male"
                />
                <Form.Check
                  inline
                  label="Nữ"
                  name="gender"
                  type="radio"
                  id="female"
                />
              </div>
            </Form.Group>

            <Form.Group
              controlId="employeeDOB"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group
              controlId="employeeEmail"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Nhập email" />
            </Form.Group>
            <Form.Group
              controlId="employeeAddress"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Quê quán</Form.Label>
              <Form.Control type="text" placeholder="Nhập quê quán" />
            </Form.Group>
          </Col>
        </Row>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            variant="outline"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#F8E7CA",
              borderColor: "#F8E7CA",
              fontWeight: "bold",
            }}
          >
            Thêm Nhân Viên
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddEmployeePage;
