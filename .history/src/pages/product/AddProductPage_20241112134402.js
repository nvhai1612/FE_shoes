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

  // State quản lý danh sách các tùy chọn
  const [brandOptions, setBrandOptions] = useState(["Nike", "Adidas", "Puma"]);
  const [materialOptions, setMaterialOptions] = useState([
    "Da",
    "Vải",
    "Cao su",
  ]);
  const [soleOptions, setSoleOptions] = useState(["Cao su", "EVA", "Nhựa"]);
  const [colorOptions, setColorOptions] = useState(["Đen", "Trắng", "Xanh"]);
  const [sizeOptions, setSizeOptions] = useState(["38", "39", "40"]);

  // State quản lý modal và loại modal đang mở
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [newOption, setNewOption] = useState(""); // Giá trị mới nhập vào modal

  // Hàm mở modal với loại tương ứng
  const handleOpenModal = (type) => {
    setModalType(type);
    setNewOption(""); // Reset giá trị mới khi mở modal
    setShowModal(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => setShowModal(false);

  // Hàm xử lý lưu giá trị mới từ modal vào dropdown tương ứng
  const handleSaveModal = () => {
    if (newOption.trim() === "") return; // Kiểm tra giá trị không rỗng
    switch (modalType) {
      case "brand":
        setBrandOptions((prev) => [...prev, newOption]);
        setProductBrand(newOption);
        break;
      case "material":
        setMaterialOptions((prev) => [...prev, newOption]);
        setProductMaterial(newOption);
        break;
      case "sole":
        setSoleOptions((prev) => [...prev, newOption]);
        setProductSole(newOption);
        break;
      case "color":
        setColorOptions((prev) => [...prev, newOption]);
        setProductColor(newOption);
        break;
      case "size":
        setSizeOptions((prev) => [...prev, newOption]);
        setProductSize(newOption);
        break;
      default:
        break;
    }
    handleCloseModal();
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
                  {brandOptions.map((brand, index) => (
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

            {/* Các trường khác như Material, Sole, Color, Size */}
            {/* Cấu trúc tương tự, sử dụng các danh sách tương ứng */}
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
                  {materialOptions.map((material, index) => (
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
                  {soleOptions.map((sole, index) => (
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
                  {colorOptions.map((color, index) => (
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
                  {sizeOptions.map((size, index) => (
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
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
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
    </Container>
  );
}

export default AddProductPage;
