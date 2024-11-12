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
  const [productDescription, setProductDescription] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productMaterial, setProductMaterial] = useState("");
  const [productSole, setProductSole] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productSize, setProductSize] = useState("");

  // State quản lý các danh sách
  const [brands, setBrands] = useState(["Nike", "Adidas", "Puma"]);
  const [materials, setMaterials] = useState(["Da", "Vải", "Cao su"]);
  const [soles, setSoles] = useState(["Cao su", "EVA", "Nhựa"]);
  const [colors, setColors] = useState(["Đen", "Trắng", "Xanh"]);
  const [sizes, setSizes] = useState(["38", "39", "40"]);

  // State quản lý modal và loại modal đang mở
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalInput, setModalInput] = useState("");

  // Hàm mở modal với loại tương ứng
  const handleOpenModal = (type) => {
    setModalType(type);
    setModalInput(""); // Reset input mỗi khi mở modal mới
    setShowModal(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => setShowModal(false);

  // Hàm xử lý lưu từ modal vào danh sách
  const handleSaveModal = () => {
    if (!modalInput.trim()) return; // Không thêm nếu không có dữ liệu

    switch (modalType) {
      case "brand":
        setBrands((prevBrands) => [...prevBrands, modalInput]);
        break;
      case "material":
        setMaterials((prevMaterials) => [...prevMaterials, modalInput]);
        break;
      case "sole":
        setSoles((prevSoles) => [...prevSoles, modalInput]);
        break;
      case "color":
        setColors((prevColors) => [...prevColors, modalInput]);
        break;
      case "size":
        setSizes((prevSizes) => [...prevSizes, modalInput]);
        break;
      default:
        break;
    }

    setModalInput("");
    setShowModal(false);
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
          <Col md={4}>
            <Form.Group
              controlId="productBrand"
              style={{ marginBottom: "10px" }}
            >
              <Form.Label>Đế giày</Form.Label>
              <InputGroup>
                <Form.Select
                  value={productSole}
                  onChange={(e) => setProductSole(e.target.value)}
                >
                  <option value="">Chọn đế giày</option>
                  {soles.map((sole, index) => (
                    <option key={index} value={sole}>
                      {sole}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleOpenModal("sole")}
                >
                  <FaPlus />
                </Button>
              </InputGroup>
            </Form.Group>

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
                  {brands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
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
              <Form.Label>chất liệu</Form.Label>
              <InputGroup>
                <Form.Select
                  value={productMaterial}
                  onChange={(e) => setProductMaterial(e.target.value)}
                >
                  <option value="">Chọn chất liệu</option>
                  {materials.map((material, index) => (
                    <option key={index} value={material}>
                      {material}
                    </option>
                  ))}
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
                  {colors.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
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
                  {sizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  variant="outline-secondary"
                  onClick={() => handleOpenModal("size")}
                >
                  <FaPlus />
                </Button>
              </InputGroup>
            </Form.Group>
            {/* Modal */}
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
                    value={modalInput}
                    onChange={(e) => setModalInput(e.target.value)}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Đóng
                </Button>
                <Button variant="primary" onClick={handleSaveModal}>
                  Lưu
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddProductPage;
