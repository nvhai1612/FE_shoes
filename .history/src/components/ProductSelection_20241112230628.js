import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
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
      image: "https://via.placeholder.com/50", // Thêm URL hình ảnh giả lập
    },
    // Add more products here
  ]);

  // State for filter
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 700000]);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value.split(",").map(Number);
    setPriceRange(value);
  };

  // Filter products based on search term and price range
  const filteredProducts = products.filter((product) => {
    const productPrice = parseFloat(
      product.price.replace(" VND", "").replace(".", "")
    );
    return (
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) &&
      productPrice >= priceRange[0] &&
      productPrice <= priceRange[1]
    );
  });

  return (
    <div>
      <h2>Chọn sản phẩm</h2>

      {/* Search and Price Range Filters */}
      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Col>
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Khoảng giá (VNĐ)"
              value={priceRange.join(",")}
              onChange={handlePriceChange}
            />
          </InputGroup>
        </Col>
      </Row>

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
                    variant="primary"
                    onClick={() => handleEditClick(product)} // Mở modal chỉnh sửa
                  >
                    Chọn
                  </Button>
                  <Button
                    variant="danger"
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDeleteClick(product.id)} // Xoá sản phẩm
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
