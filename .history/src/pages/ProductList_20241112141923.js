import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { FaSearch, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    date: "",
    quantity: "",
    status: "Đang bán",
  });

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "Giày Sneaker BerryShoes",
        date: "22/06/2024",
        quantity: 160,
        status: "Đang bán",
      },
      {
        id: 2,
        name: "Giày Running BerryShoes",
        date: "25/07/2024",
        quantity: 100,
        status: "Đang bán",
      },
    ];
    setProducts(data);
  }, []);

  const handleAddProduct = () => {
    // Thêm sản phẩm mới vào danh sách sản phẩm
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    // Xóa dữ liệu sau khi thêm
    setNewProduct({ name: "", date: "", quantity: "", status: "Đang bán" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Quản lý sản phẩm
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
          <FaSearch style={{ marginRight: "8px" }} />
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>Tìm kiếm</span>
        </div>
      </div>
      <hr />

      <div className="filter-section mb-3">
        <Row>
          <Col md={6}>
            <InputGroup>
              <Form.Control placeholder="Tìm mã sản phẩm, tên sản phẩm" />
              <Button variant="outline-secondary">Tìm</Button>
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            Danh sách sản phẩm
          </span>
        </div>
        <hr />
      </div>

      {/* Form thêm sản phẩm */}
      <Form className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Tên sản phẩm"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Ngày tạo"
              name="date"
              value={newProduct.date}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="number"
              placeholder="Số lượng"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
            />
          </Col>
          <Col md={3}>
            <Button
              style={{ backgroundColor: "#4CAF50", border: "none" }}
              onClick={handleAddProduct}
            >
              + Thêm sản phẩm
            </Button>
          </Col>
        </Row>
      </Form>

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
              Tên sản phẩm
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>Ngày tạo</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Số lượng</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Trạng thái</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {index + 1}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {product.name}
              </td>
              <td
                style={{
                  padding: "10px",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                {product.date}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {product.quantity}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {product.status}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <Button
                  variant="link"
                  onClick={() =>
                    console.log("Xem biến thể sản phẩm:", product.id)
                  }
                >
                  <FaEye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductList;
