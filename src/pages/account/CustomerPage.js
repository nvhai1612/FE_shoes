import React from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaFilter, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function CustomerPage() {
  const navigate = useNavigate();

  const handleAddCustomer = () => {
    navigate('/taikhoan/khachhang/themkhachhang'); // Đường dẫn đến AddCustomerPage
  };

  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý khách hàng</h2>

      {/* Bộ lọc và Tạo mới */}
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
        <Button style={{ backgroundColor: '#4CAF50', border: 'none' }} onClick={handleAddCustomer}>+ Thêm mới</Button>
      </div>
      <hr />

      {/* Phần tìm kiếm và bộ lọc khách hàng */}
      <div className="filter-section mb-3">
        <Row>
          <Col md={6}>
            <InputGroup>
              <Form.Control placeholder="Tìm mã nhân viên, tên hoặc SDT" />
              <Button variant="outline-secondary">Tìm</Button>
            </InputGroup>
          </Col>
        </Row>
      </div>

      {/* Tiêu đề và bộ lọc trạng thái khách hàng */}
      <div className="mb-3">
        <h6 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Trạng thái khách hàng</h6>
        <div className="d-flex justify-content-between align-items-center">
          <Form.Select style={{ maxWidth: '200px' }}>
            <option>Tất cả</option>
            <option>Khách sỉ</option>
            <option>Khách lẻ</option>
          </Form.Select>
          <Button variant="secondary">Làm mới</Button>
        </div>
      </div>
      <hr />

      {/* Danh sách khách hàng */}
      <Table striped bordered hover style={{ marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#F8E7CA', textAlign: 'center' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center' }}>STT</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Mã hóa đơn</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Mã khách hàng</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Tên khách hàng</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Số điện thoại</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ngày sinh</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Địa chỉ</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Trạng thái</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>VNA26354897</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>2411362</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>Nguyễn Văn Nam</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>0982666999</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>22/06/2002</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>Hà Nội</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>Khách sỉ</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
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

export default CustomerPage;
