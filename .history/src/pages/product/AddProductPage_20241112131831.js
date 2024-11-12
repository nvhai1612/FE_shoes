import React, { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

function AddProductPage({ onBack }) {
  // Quản lý trạng thái các trường
  const [productName, setProductName] = useState("");
  const [productGender, setProductGender] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productMaterial, setProductMaterial] = useState("");
  const [productSole, setProductSole] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productSize, setProductSize] = useState("");

  // Hàm xử lý khi ấn nút "Thêm"
  const handleAddProduct = () => {
    const newProduct = {
      name: productName,
      gender: productGender,
      description: productDescription,
      brand: productBrand,
      material: productMaterial,
      sole: productSole,
      color: productColor,
      size: productSize,
    };

    // Ở đây có thể gọi API hoặc cập nhật danh sách sản phẩm
    console.log("Sản phẩm mới:", newProduct);

    // Reset các trường sau khi thêm
    setProductName("");
    setProductGender("");
    setProductDescription("");
    setProductBrand("");
    setProductMaterial("");
    setProductSole("");
    setProductColor("");
    setProductSize("");
  };

  return (
    <Container style={{ marginTop: "-20px", paddingTop: "0" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          marginTop: "0",
        }}
      >
        Thêm sản phẩm
      </h2>
      <hr style={{ margin: "10px 0 20px 0" }} />

      <Form>
        <Form.Group controlId="productName">
          <Form.Label
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Tên sản phẩm
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên sản phẩm"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="productGender" style={{ marginTop: "20px" }}>
          <Form.Label>Giới tính</Form.Label>
          <div>
            <Form.Check
              inline
              label="Nam"
              name="gender"
              type="radio"
              id="male"
              value="Nam"
              checked={productGender === "Nam"}
              onChange={(e) => setProductGender(e.target.value)}
            />
            <Form.Check
              inline
              label="Nữ"
              name="gender"
              type="radio"
              id="female"
              value="Nữ"
              checked={productGender === "Nữ"}
              onChange={(e) => setProductGender(e.target.value)}
            />
          </div>
        </Form.Group>

        <Form.Group
          controlId="productDescription"
          style={{ marginTop: "20px" }}
        >
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập mô tả sản phẩm"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </Form.Group>

        <Row style={{ marginTop: "10px" }}>
          <Col md={6}>
            <Form.Group
              controlId="productBrand"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Thương Hiệu</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Thương hiệu"
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <FaPlus />
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group
              controlId="productMaterial"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Chất liệu</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Chất liệu"
                  value={productMaterial}
                  onChange={(e) => setProductMaterial(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <FaPlus />
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group
              controlId="productSole"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Đế giày</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Đế giày"
                  value={productSole}
                  onChange={(e) => setProductSole(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <FaPlus />
                </Button>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group
              controlId="productColor"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Màu sắc</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Màu sắc"
                  value={productColor}
                  onChange={(e) => setProductColor(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <FaPlus />
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group
              controlId="productSize"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Kích cỡ</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Kích cỡ"
                  value={productSize}
                  onChange={(e) => setProductSize(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <FaPlus />
                </Button>
              </InputGroup>
            </Form.Group>

            <div style={{ marginTop: "40px" }}>
              <Button variant="primary" onClick={handleAddProduct}>
                Thêm
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddProductPage;
