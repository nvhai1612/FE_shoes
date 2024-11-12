import React, { useState } from "react";
import {
  Table,
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaFilter } from "react-icons/fa";
import shoeImage from "../../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductVariantsPage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      code: "VNA26354897",
      image: shoeImage,
      quantity: 200,
      price: "920.000 VND",
      brand: "Nike",
      material: "Da",
      sole: "Cao su",
      size: 42,
      color: "Trắng",
    },
    // Thêm các sản phẩm khác nếu cần
  ]);

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteClick = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này không?")) {
      setProducts(products.filter((product) => product.id !== productId));
      toast.success("Xoá sản phẩm thành công!");
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleSaveChanges = () => {
    setProducts(
      products.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      )
    );
    toast.success("Cập nhật sản phẩm thành công!");
    handleCloseModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Container>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Quản lý biến thể sản phẩm
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaFilter style={{ marginRight: "8px" }} />
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>Bộ lọc</span>
        </div>
      </div>
      <hr />

      <div className="filter-section mb-3">
        <Row>
          <Col md={6}>
            <InputGroup>
              <Form.Control placeholder="Tìm tên sản phẩm hoặc mã sản phẩm chi tiết" />
              <Button variant="outline-secondary">Tìm</Button>
            </InputGroup>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col>
            <Form.Label>Đế giày</Form.Label>
            <Form.Select
              name="sole"
              value={editingProduct?.sole || ""}
              onChange={handleChange}
            >
              <option>Tất cả</option>
              <option>Cao su</option>
              <option>Nhựa</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Kích cỡ</Form.Label>
            <Form.Select
              name="size"
              value={editingProduct?.size || ""}
              onChange={handleChange}
            >
              <option>Tất cả</option>
              <option>40</option>
              <option>41</option>
              <option>42</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Màu sắc</Form.Label>
            <Form.Select
              name="color"
              value={editingProduct?.color || ""}
              onChange={handleChange}
            >
              <option>Tất cả</option>
              <option>Trắng</option>
              <option>Đen</option>
              <option>Đỏ</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Chất liệu</Form.Label>
            <Form.Select
              name="material"
              value={editingProduct?.material || ""}
              onChange={handleChange}
            >
              <option>Tất cả</option>
              <option>Da</option>
              <option>Vải</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select
              name="status"
              value={editingProduct?.status || ""}
              onChange={handleChange}
            >
              <option>Tất cả</option>
              <option>Còn hàng</option>
              <option>Hết hàng</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Thương hiệu</Form.Label>
            <Form.Select
              name="brand"
              value={editingProduct?.brand || ""}
              onChange={handleChange}
            >
              <option>Tất cả</option>
              <option>Nike</option>
              <option>Adidas</option>
            </Form.Select>
          </Col>
        </Row>
        <hr />
      </div>

      <Table
        striped
        bordered
        hover
        style={{ marginTop: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
      >
        <thead style={{ backgroundColor: "#F8E7CA" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "center" }}>STT</th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Mã sản phẩm
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>Ảnh</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Số lượng</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Giá tiền</th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Thương hiệu
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>Chất liệu</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Đế giày</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Kích cỡ</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Màu sắc</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id}>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {index + 1}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.code}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <img
                    src={product.image}
                    alt={product.code}
                    style={{ width: "50px" }}
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.quantity}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.price}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.brand}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.material}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.sole}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.size}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.color}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Button
                    variant="link"
                    onClick={() => handleEditClick(product)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="link"
                    className="text-danger"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ textAlign: "center", padding: "10px" }}>
                Không có sản phẩm nào
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Modal chỉnh sửa sản phẩm */}
      {editingProduct && (
        <Modal
          show={showEditModal}
          onHide={handleCloseModal}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật chi tiết sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formProductCode">
                    <Form.Label>Mã sản phẩm</Form.Label>
                    <Form.Control
                      type="text"
                      name="code"
                      value={editingProduct.code}
                      readOnly
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formProductImage">
                    <Form.Label>Ảnh sản phẩm</Form.Label>
                    <div>
                      <img
                        src={editingProduct.image}
                        alt={editingProduct.code}
                        style={{ width: "100px" }}
                      />
                    </div>
                    {/* Bạn có thể thêm chức năng upload ảnh mới nếu cần */}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={6}>
                  <Form.Group controlId="formProductQuantity">
                    <Form.Label>Số lượng</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity"
                      value={editingProduct.quantity}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formProductPrice">
                    <Form.Label>Giá tiền</Form.Label>
                    <Form.Control
                      type="text"
                      name="price"
                      value={editingProduct.price}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={6}>
                  <Form.Group controlId="formProductBrand">
                    <Form.Label>Thương hiệu</Form.Label>
                    <Form.Control
                      type="text"
                      name="brand"
                      value={editingProduct.brand}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formProductMaterial">
                    <Form.Label>Chất liệu</Form.Label>
                    <Form.Control
                      type="text"
                      name="material"
                      value={editingProduct.material}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col md={4}>
                  <Form.Group controlId="formProductSole">
                    <Form.Label>Đế giày</Form.Label>
                    <Form.Control
                      type="text"
                      name="sole"
                      value={editingProduct.sole}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formProductSize">
                    <Form.Label>Kích cỡ</Form.Label>
                    <Form.Control
                      type="number"
                      name="size"
                      value={editingProduct.size}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formProductColor">
                    <Form.Label>Màu sắc</Form.Label>
                    <Form.Control
                      type="text"
                      name="color"
                      value={editingProduct.color}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Thêm các trường khác nếu cần */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}

export default ProductVariantsPage;
