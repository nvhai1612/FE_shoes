import React, { useState } from "react";
import { Table, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

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
    },
  ]);

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
              onChange={handleFilterChange}
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
              onChange={handleFilterChange}
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
              onChange={handleFilterChange}
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
              onChange={handleFilterChange}
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
              onChange={handleFilterChange}
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
              onChange={handleFilterChange}
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
            <th style={{ padding: "10px", textAlign: "center" }}>Chọn</th>
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
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={product.id}>
              <td style={{ textAlign: "center" }}>
                <Form.Check
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={(e) => handleSelectChange(e, product.id)}
                />
              </td>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td>{product.code}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.code}
                  width="50"
                  height="50"
                />
              </td>
              <td style={{ textAlign: "center" }}>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>{product.material}</td>
              <td>{product.sole}</td>
              <td>{product.size}</td>
              <td>{product.color}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Các sản phẩm được chọn */}
      <div style={{ marginTop: "20px" }}>
        <h5>Sản phẩm đã chọn:</h5>
        <ul>
          {selectedProducts.map((productId) => {
            const product = products.find((p) => p.id === productId);
            return (
              <li key={product.id}>
                {product.code} - {product.brand} - {product.price}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Thêm sản phẩm */}
      <Button
        variant="primary"
        style={{ marginTop: "20px" }}
        onClick={() => {
          alert("Thêm sản phẩm vào giỏ hàng");
        }}
      >
        Thêm sản phẩm
      </Button>
    </div>
  );
}

export default ProductSelectionPage;
