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
      image: "https://via.placeholder.com/50", // Thêm URL hình ảnh giả lập
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
      image: "https://via.placeholder.com/50", // Thêm URL hình ảnh giả lập
    },
  ]);

  // State for filter
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 700000]);
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on search term and price range
  const filteredProducts = products.filter((product) => {
    const productPrice = parseFloat(
      product.price.replace(" VND", "").replace(".", "")
    );
    return (
      product.code.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.sole ? product.sole === filters.sole : true) &&
      (filters.size ? product.size === parseInt(filters.size) : true) &&
      (filters.color ? product.color === filters.color : true) &&
      (filters.material ? product.material === filters.material : true) &&
      (filters.brand ? product.brand === filters.brand : true) &&
      (filters.status ? product.status === filters.status : true) &&
      productPrice >= priceRange[0] &&
      productPrice <= priceRange[1]
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

        <Row className="mt-2">
          <Col>
            <Form.Label>Đế giày</Form.Label>
            <Form.Select
              name="sole"
              value={filters.sole || ""}
              onChange={handleChange}
            >
              <option value="">Tất cả</option>
              <option value="Cao su">Cao su</option>
              <option value="Nhựa">Nhựa</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Kích cỡ</Form.Label>
            <Form.Select
              name="size"
              value={filters.size || ""}
              onChange={handleChange}
            >
              <option value="">Tất cả</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Màu sắc</Form.Label>
            <Form.Select
              name="color"
              value={filters.color || ""}
              onChange={handleChange}
            >
              <option value="">Tất cả</option>
              <option value="Trắng">Trắng</option>
              <option value="Đen">Đen</option>
              <option value="Đỏ">Đỏ</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Chất liệu</Form.Label>
            <Form.Select
              name="material"
              value={filters.material || ""}
              onChange={handleChange}
            >
              <option value="">Tất cả</option>
              <option value="Da">Da</option>
              <option value="Vải">Vải</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Thương hiệu</Form.Label>
            <Form.Select
              name="brand"
              value={filters.brand || ""}
              onChange={handleChange}
            >
              <option value="">Tất cả</option>
              <option value="Nike">Nike</option>
              <option value="Adidas">Adidas</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select
              name="status"
              value={filters.status || ""}
              onChange={handleChange}
            >
              <option value="">Tất cả</option>
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
            </Form.Select>
          </Col>
        </Row>
        <hr />
      </div>

      {/* Bảng sản phẩm */}
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
                    variant="outline-primary"
                    onClick={() => handleEditClick(product)}
                  >
                    Chọn
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ textAlign: "center" }}>
                Không có sản phẩm nào
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Edit Product Modal */}
      {showEditModal && (
        <Modal show={showEditModal} onHide={handleCloseModal}>
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
                  value={editingProduct?.code || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="productQuantity">
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={editingProduct?.quantity || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="productPrice">
                <Form.Label>Giá tiền</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={editingProduct?.price || ""}
                  onChange={handleChange}
                />
              </Form.Group>
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
    </div>
  );
}

export default ProductSelectionPage;
