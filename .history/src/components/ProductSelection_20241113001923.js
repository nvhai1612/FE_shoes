import React, { useState } from "react";
import { Table, Form, Row, Col, Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import ProductTable from "./ProductTable"; // Đảm bảo bạn đã import ProductTable

function ProductSelectionPage() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    sole: "",
    size: "",
    color: "",
    material: "",
    brand: "",
    status: "",
  });

  const products = [
    {
      id: 1,
      name: "Nike Air Max",
      quantity: 200,
      price: "920.000 VND",
      brand: "Nike",
      material: "Da",
      sole: "Cao su",
      size: 42,
      color: "Trắng",
      image: "https://via.placeholder.com/50",
      status: "Còn hàng",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      quantity: 150,
      price: "820.000 VND",
      brand: "Adidas",
      material: "Vải",
      sole: "Cao su",
      size: 41,
      color: "Đen",
      image: "https://via.placeholder.com/50",
      status: "Còn hàng",
    },
    // Add more products here
  ];

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
    const { checked } = e.target;
    if (checked) {
      setSelectedProducts((prevSelected) => [...prevSelected, productId]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((id) => id !== productId)
      );
    }
  };

  const handleAddProducts = () => {
    // Lọc các sản phẩm đã chọn
    const selectedProductDetails = products.filter((product) =>
      selectedProducts.includes(product.id)
    );
    // Truyền các sản phẩm đã chọn sang bảng sản phẩm
    setSelectedProducts(selectedProductDetails);
  };

  const filteredProducts = products.filter((product) => {
    const productName = product.name ? product.name.toLowerCase() : "";
    return (
      productName.includes(searchTerm.toLowerCase()) &&
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

      <div className="filter-section mb-3">
        <Row>
          <Col md={6}>
            <Form.Control
              placeholder="Tìm tên sản phẩm hoặc mã sản phẩm chi tiết"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
        </Row>

        <Row className="mt-2">{/* Các bộ lọc */}</Row>
        <hr />
      </div>

      {/* Bảng sản phẩm */}
      <Table
        striped
        bordered
        hover
        style={{
          marginTop: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          width: "100%",
        }}
      >
        <thead style={{ backgroundColor: "#F8E7CA", textAlign: "center" }}>
          <tr>
            <th>STT</th>
            <th>Ảnh</th>
            <th>Số lượng</th>
            <th>Giá tiền</th>
            <th>Thương hiệu</th>
            <th>Chất liệu</th>
            <th>Đế giày</th>
            <th>Kích cỡ</th>
            <th>Màu sắc</th>
            <th>Chọn</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "center" }}>
          {filteredProducts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                    margin: "0 auto",
                  }}
                />
              </td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>{product.material}</td>
              <td>{product.sole}</td>
              <td>{product.size}</td>
              <td>{product.color}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={(e) => handleSelectChange(e, product.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={handleAddProducts} variant="primary">
        Thêm sản phẩm đã chọn
      </Button>

      {/* Hiển thị bảng sản phẩm đã chọn */}
      <ProductTable products={selectedProducts} />
    </div>
  );
}

export default ProductSelectionPage;
