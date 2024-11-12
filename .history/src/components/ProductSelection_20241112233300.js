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
import { FaCheckCircle } from "react-icons/fa"; // Dùng icon chọn

function ProductSelectionPage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([
    // Mảng sản phẩm của bạn
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

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleSaveChanges = () => {
    // Kiểm tra nếu có thay đổi gì trong thông tin sản phẩm
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

  // Lọc sản phẩm theo các bộ lọc và giá tiền
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
      {/* Bộ lọc */}
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

      <div className="filter-section mb-3">{/* Các bộ lọc */}</div>

      {/* Bảng sản phẩm */}
      <Table
        striped
        bordered
        hover
        style={{
          marginTop: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          tableLayout: "fixed", // Đảm bảo bảng có kích thước cố định
        }}
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
                  <Button
                    variant="outline-primary"
                    onClick={() => handleEditClick(product)}
                  >
                    <FaCheckCircle /> {/* Icon chọn */}
                    Chọn
                  </Button>
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
          size="lg" // Kích thước modal linh hoạt, có thể chỉnh theo nhu cầu
        >
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="productCode">
                <Form.Label>Mã sản phẩm</Form.Label>
                <Form.Control
                  type="text"
                  name="code"
                  value={editingProduct.code}
                  onChange={handleProductChange}
                />
              </Form.Group>

              {/* Các trường khác của form */}
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
