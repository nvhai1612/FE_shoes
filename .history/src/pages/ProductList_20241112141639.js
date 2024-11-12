import React, { useState, useEffect } from "react";
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
import { FaSearch, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const navigate = useNavigate();

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
      // Thêm dữ liệu sản phẩm khác nếu cần
    ];
    setProducts(data);
  }, []);

  // Hàm điều hướng tới trang ProductVariantsPage
  const handleViewProductVariants = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  // Hàm điều hướng tới trang AddProductPage
  const handleAddProduct = () => {
    navigate("/sanpham/danhsachsanpham/themsanpham");
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
          <Button
            style={{ backgroundColor: "#4CAF50", border: "none" }}
            onClick={handleAddProduct}
          >
            + Thêm sản phẩm
          </Button>
        </div>
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
                  onClick={() => handleViewProductVariants(product)}
                >
                  <FaEye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal hiển thị chi tiết sản phẩm */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <p>
                <strong>Tên sản phẩm:</strong> {selectedProduct.name}
              </p>
              <p>
                <strong>Ngày tạo:</strong> {selectedProduct.date}
              </p>
              <p>
                <strong>Số lượng:</strong> {selectedProduct.quantity}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedProduct.status}
              </p>
              {/* Thêm các thuộc tính khác của sản phẩm nếu cần */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductList;
