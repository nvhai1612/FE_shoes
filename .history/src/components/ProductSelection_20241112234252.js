import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

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
      image: "https://via.placeholder.com/50",
      selected: false, // thêm thuộc tính selected
    },
    {
      id: 2,
      code: "VNA26354898",
      quantity: 150,
      price: "820.000 VND",
      brand: "Adidas",
      material: "Vải",
      sole: "Cao su",
      size: 41,
      color: "Đen",
      image: "https://via.placeholder.com/50",
      selected: false, // thêm thuộc tính selected
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    sole: "",
    size: "",
    color: "",
    material: "",
    brand: "",
    status: "",
  });

  const handleEditClick = () => {
    const selectedProduct = products.find((product) => product.selected);
    if (selectedProduct) {
      setEditingProduct(selectedProduct);
      setShowEditModal(true);
    } else {
      alert("Vui lòng chọn sản phẩm cần chỉnh sửa!");
    }
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleSaveChanges = () => {
    if (
      editingProduct?.code &&
      editingProduct?.quantity &&
      editingProduct?.price
    ) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? editingProduct : product
        )
      );
      handleCloseModal();
    } else {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectChange = (e, productId) => {
    const selected = e.target.checked;
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, selected } : product
      )
    );
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.sole ? product.sole === filters.sole : true) &&
      (filters.size ? product.size === parseInt(filters.size) : true) &&
      (filters.color ? product.color === filters.color : true) &&
      (filters.material ? product.material === filters.material : true) &&
      (filters.brand ? product.brand === filters.brand : true) &&
      (filters.status ? product.status === filters.status : true)
    );
  });

  return (
    <div>
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
              <Form.Control
                placeholder="Tìm tên sản phẩm hoặc mã sản phẩm chi tiết"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Button variant="outline-secondary">Tìm</Button>
            </InputGroup>
          </Col>
        </Row>
        {/* Bộ lọc và các trường khác */}
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
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
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
                    style={{ width: "50px", height: "50px" }}
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
                  <Form.Check
                    type="checkbox"
                    checked={product.selected}
                    onChange={(e) => handleSelectChange(e, product.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ textAlign: "center" }}>
                Không có sản phẩm nào.
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
          size="lg" // Cập nhật kích thước của modal
        >
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCode">
                <Form.Label>Mã sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={editingProduct.code}
                  onChange={handleProductChange}
                />
              </Form.Group>
              <Form.Group controlId="formQuantity">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={editingProduct.quantity}
                  onChange={handleProductChange}
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Giá tiền</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={editingProduct.price}
                  onChange={handleProductChange}
                />
              </Form.Group>
              {/* Thêm các trường thông tin khác */}
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
