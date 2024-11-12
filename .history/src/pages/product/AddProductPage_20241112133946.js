import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Modal,
} from "react-bootstrap";
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

  // State quản lý modal và loại modal đang mở
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  // Hàm mở modal với loại tương ứng
  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => setShowModal(false);

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
                <Form.Select
                  value={productBrand}
                  onChange={(e) => setProductBrand(e.target.value)}
                >
                  <option value="">Chọn thương hiệu</option>
                  <option value="Nike">Nike</option>
                  <option value="Adidas">Adidas</option>
                  <option value="Puma">Puma</option>
                  {/* Thêm các tùy chọn khác */}
                </Form.Select>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleOpenModal("brand")}
                >
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
                <Form.Select
                  value={productMaterial}
                  onChange={(e) => setProductMaterial(e.target.value)}
                >
                  <option value="">Chọn chất liệu</option>
                  <option value="Da">Da</option>
                  <option value="Vải">Vải</option>
                  <option value="Cao su">Cao su</option>
                  {/* Thêm các tùy chọn khác */}
                </Form.Select>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleOpenModal("material")}
                >
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
                <Form.Select
                  value={productSole}
                  onChange={(e) => setProductSole(e.target.value)}
                >
                  <option value="">Chọn đế giày</option>
                  <option value="Cao su">Cao su</option>
                  <option value="EVA">EVA</option>
                  <option value="Nhựa">Nhựa</option>
                  {/* Thêm các tùy chọn khác */}
                </Form.Select>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleOpenModal("sole")}
                >
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
                <Form.Select
                  value={productColor}
                  onChange={(e) => setProductColor(e.target.value)}
                >
                  <option value="">Chọn màu sắc</option>
                  <option value="Đen">Đen</option>
                  <option value="Trắng">Trắng</option>
                  <option value="Xanh">Xanh</option>
                  {/* Thêm các tùy chọn khác */}
                </Form.Select>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleOpenModal("color")}
                >
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
                <Form.Select
                  value={productSize}
                  onChange={(e) => setProductSize(e.target.value)}
                >
                  <option value="">Chọn kích cỡ</option>
                  <option value="38">38</option>
                  <option value="39">39</option>
                  <option value="40">40</option>
                  {/* Thêm các tùy chọn khác */}
                </Form.Select>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleOpenModal("size")}
                >
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

      {/* Modal chung cho các trường */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "brand"
              ? "Thêm Thương Hiệu"
              : modalType === "material"
              ? "Thêm Chất Liệu"
              : modalType === "sole"
              ? "Thêm Đế Giày"
              : modalType === "color"
              ? "Thêm Màu Sắc"
              : "Thêm Kích Cỡ"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="modalInput">
            <Form.Label>
              {modalType === "brand"
                ? "Thương Hiệu"
                : modalType === "material"
                ? "Chất Liệu"
                : modalType === "sole"
                ? "Đế Giày"
                : modalType === "color"
                ? "Màu Sắc"
                : "Kích Cỡ"}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={`Nhập ${
                modalType === "brand"
                  ? "thương hiệu"
                  : modalType === "material"
                  ? "chất liệu"
                  : modalType === "sole"
                  ? "đế giày"
                  : modalType === "color"
                  ? "màu sắc"
                  : "kích cỡ"
              }`}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AddProductPage;
