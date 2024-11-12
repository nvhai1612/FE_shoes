// ProductSelectionPage.js
import React, { useState } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

function ProductSelectionPage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([
    {
      id: 1,
      code: "VNA26354897",
      quantity: 200,
      price: "920.000 VND",
      brand: "Nike",
      material: "Da",
      sole: "Cao su",
      size: 42,
      color: "Trắng",
    },
    // Add more products here
  ]);

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteClick = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này không?")) {
      setProducts(products.filter((product) => product.id !== productId));
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
    <div>
      <h2>Chọn sản phẩm</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá tiền</th>
            <th>Thương hiệu</th>
            <th>Chất liệu</th>
            <th>Đế giày</th>
            <th>Kích cỡ</th>
            <th>Màu sắc</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.code}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>{product.material}</td>
              <td>{product.sole}</td>
              <td>{product.size}</td>
              <td>{product.color}</td>
              <td>
                <Button variant="link" onClick={() => handleEditClick(product)}>
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
          ))}
        </tbody>
      </Table>

      {/* Edit Product Modal */}
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
              </Row>
              {/* More fields if needed */}
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
    </div>
  );
}

export default ProductSelectionPage;
