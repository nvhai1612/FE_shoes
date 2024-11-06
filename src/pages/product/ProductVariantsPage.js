// src/pages/product/ProductVariantsPage.js
import React from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaEdit, FaTrash, FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate để điều hướng
import shoeImage from '../../assets/logo.png';

function ProductVariantsPage() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      code: 'VNA26354897',
      image: shoeImage,
      quantity: 200,
      price: '920.000 VND',
      brand: 'Nike',
      material: 'Da',
      sole: 'Cao su',
      size: 42,
      color: 'Trắng',
    },
  ];

  // Hàm để điều hướng tới trang AddProductPage
  const handleAddNew = () => {
    navigate('/product/quanlybienthesanpham/addproducts');
  };

  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý biến thể sản phẩm</h2>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaFilter style={{ marginRight: '8px' }} />
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Bộ lọc</span>
        </div>
        <Button style={{ backgroundColor: '#4CAF50', border: 'none' }} onClick={handleAddNew}>
          + Thêm mới
        </Button>
      </div>
      <hr />

      {/* Phần tìm kiếm và bộ lọc sản phẩm */}
      <div className="filter-section mb-3">
        <Row>
          <Col md={6}>
            <InputGroup>
              <Form.Control placeholder="Tìm tên sản phẩm hoặc mã sản phẩm chi tiết" />
              <Button variant="outline-secondary">Tìm</Button>
            </InputGroup>
          </Col>
        </Row>
        
        <Row className="mt-2">
          <Col><Form.Label>Đế giày</Form.Label><Form.Select><option>Tất cả</option></Form.Select></Col>
          <Col><Form.Label>Kích cỡ</Form.Label><Form.Select><option>Tất cả</option></Form.Select></Col>
          <Col><Form.Label>Màu sắc</Form.Label><Form.Select><option>Tất cả</option></Form.Select></Col>
          <Col><Form.Label>Chất liệu</Form.Label><Form.Select><option>Tất cả</option></Form.Select></Col>
          <Col><Form.Label>Giới tính</Form.Label><Form.Select><option>Tất cả</option></Form.Select></Col>
          <Col><Form.Label>Trạng thái</Form.Label><Form.Select><option>Tất cả</option></Form.Select></Col>
          <Col><Form.Label>Thương hiệu</Form.Label><Form.Select><option>Tất cả</option></Form.Select></Col>
        </Row>
        <hr/>

        <div className="text-end mt-3">
          <Button variant="secondary" className="me-2">Tất cả</Button>
          <Button variant="primary">Chỉnh số lượng và giá chung</Button>
        </div>
        <hr/>
      </div>

      {/* Danh sách biến thể sản phẩm */}
      <Table striped bordered hover style={{ marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#F8E7CA' }}>
          <tr>
            <th style={{ padding: '10px' }}>STT</th>
            <th style={{ padding: '10px' }}>Mã sản phẩm</th>
            <th style={{ padding: '10px' }}>Ảnh</th>
            <th style={{ padding: '10px' }}>Số lượng</th>
            <th style={{ padding: '10px' }}>Giá tiền</th>
            <th style={{ padding: '10px' }}>Thương hiệu</th>
            <th style={{ padding: '10px' }}>Chất liệu</th>
            <th style={{ padding: '10px' }}>Đế giày</th>
            <th style={{ padding: '10px' }}>Kích cỡ</th>
            <th style={{ padding: '10px' }}>Màu sắc</th>
            <th style={{ padding: '10px' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td style={{ padding: '10px' }}>{index + 1}</td>
              <td style={{ padding: '10px' }}>{product.code}</td>
              <td style={{ padding: '10px' }}><img src={product.image} alt={product.name} style={{ width: '50px' }} /></td>
              <td style={{ padding: '10px' }}>{product.quantity}</td>
              <td style={{ padding: '10px' }}>{product.price}</td>
              <td style={{ padding: '10px' }}>{product.brand}</td>
              <td style={{ padding: '10px' }}>{product.material}</td>
              <td style={{ padding: '10px' }}>{product.sole}</td>
              <td style={{ padding: '10px' }}>{product.size}</td>
              <td style={{ padding: '10px' }}>{product.color}</td>
              <td style={{ padding: '10px' }}>
                <Button variant="link"><FaEdit /></Button>
                <Button variant="link" className="text-danger"><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductVariantsPage;
