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
  // State quản lý modal và loại modal đang mở
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // Xác định loại modal: brand, material, color, size, sole

  // State cho các giá trị của sản phẩm
  const [editingProduct, setEditingProduct] = useState({
    code: "SP001",
    image: "path/to/image.jpg", // Đường dẫn ảnh mặc định
    quantity: 0,
    price: "",
    brand: "",
    material: "",
    sole: "",
    size: "",
    color: "",
  });

  // Hàm để mở modal cho loại cụ thể
  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    setModalType("");
  };

  // Hàm xử lý thay đổi dữ liệu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  return (
    <Container>
      <h2>Thêm sản phẩm</h2>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group controlId="productBrand">
              <Form.Label>Thương hiệu</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Thương hiệu"
                  value={editingProduct.brand}
                  readOnly
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleOpenModal("brand")}
                >
                  <FaPlus />
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="productMaterial">
              <Form.Label>Chất liệu</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Chất liệu"
                  value={editingProduct.material}
                  readOnly
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleOpenModal("material")}
                >
                  <FaPlus />
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="productSole">
              <Form.Label>Đế giày</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Đế giày"
                  value={editingProduct.sole}
                  readOnly
                />
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
            <Form.Group controlId="productColor">
              <Form.Label>Màu sắc</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Màu sắc"
                  value={editingProduct.color}
                  readOnly
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleOpenModal("color")}
                >
                  <FaPlus />
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="productSize">
              <Form.Label>Kích cỡ</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Kích cỡ"
                  value={editingProduct.size}
                  readOnly
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleOpenModal("size")}
                >
                  <FaPlus />
                </Button>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* Modal chỉnh sửa thông tin thêm */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Cập nhật{" "}
            {modalType === "brand"
              ? "Thương hiệu"
              : modalType === "material"
              ? "Chất liệu"
              : modalType === "color"
              ? "Màu sắc"
              : modalType === "size"
              ? "Kích cỡ"
              : "Đế giày"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductAttribute">
              <Form.Label>
                Nhập{" "}
                {modalType === "brand"
                  ? "Thương hiệu"
                  : modalType === "material"
                  ? "Chất liệu"
                  : modalType === "color"
                  ? "Màu sắc"
                  : modalType === "size"
                  ? "Kích cỡ"
                  : "Đế giày"}
              </Form.Label>
              <Form.Control
                type="text"
                name={modalType}
                value={editingProduct[modalType] || ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AddProductPage;
