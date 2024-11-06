import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEye } from 'react-icons/fa'; // Đổi từ FaFilter thành FaSearch
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = [
      { id: 1, code: "P2066123", name: "Giày Sneaker BerryShoes", quantity: 160, price: "500,000 VND", date: "22/06/2024" },
      { id: 2, code: "P2066124", name: "Giày Running BerryShoes", quantity: 100, price: "600,000 VND", date: "25/07/2024" },
      // Thêm dữ liệu sản phẩm khác nếu cần
    ];
    setProducts(data);
  }, []);

  // Hàm điều hướng tới trang ProductVariantsPage
  const handleViewProductVariants = () => {
    navigate('/product/quanlybienthesanpham');
  };

  // Hàm điều hướng tới trang AddProductPage
  const handleAddProduct = () => {
    navigate('/product/danhsachsanpham/themsanpham'); // Đường dẫn của AddProductPage
  };

  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý sản phẩm</h2>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaSearch style={{ marginRight: '8px' }} /> {/* Biểu tượng tìm kiếm */}
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Tìm kiếm</span>
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
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Danh sách sản phẩm</span>
          <Button style={{ backgroundColor: '#4CAF50', border: 'none' }} onClick={handleAddProduct}>+ Thêm sản phẩm</Button>
        </div>
        <hr />
      </div>

      <Table striped bordered hover style={{ marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#F8E7CA' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center' }}>STT</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Mã sản phẩm</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Tên sản phẩm</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Số lượng tồn</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Giá bán</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ngày tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', whiteSpace: 'nowrap', textAlign: 'center' }}>{product.code}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{product.name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{product.quantity}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{product.price}</td>
              <td style={{ padding: '10px', whiteSpace: 'nowrap', textAlign: 'center' }}>{product.date}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <Button variant="link" onClick={handleViewProductVariants}><FaEye /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductList;
