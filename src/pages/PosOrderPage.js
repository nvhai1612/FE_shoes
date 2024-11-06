// src/pages/PosOrderPage.js
import React from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaFilter, FaEdit, FaTrash } from 'react-icons/fa';

function PosOrderPage() {
  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý hóa đơn</h2>

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
        <Button style={{ backgroundColor: '#4CAF50', border: 'none' }}>+ Tạo mới</Button>
      </div>
      <hr />

      {/* Phần tìm kiếm và bộ lọc hóa đơn */}
      <div className="filter-section mb-3">
        <Row>
          <Col md={6}>
            <InputGroup>
              <Form.Control placeholder="Tìm mã hóa đơn, mã nhân viên, tên hoặc SDT khách hàng" />
              <Button variant="outline-secondary">Tìm</Button>
            </InputGroup>
          </Col>
        </Row>
        
        <Row className="mt-2">
          <Col><Form.Label>Loại hóa đơn</Form.Label><Form.Select><option>Tất cả</option></Form.Select></Col>
          <Col><Form.Label>Ngày bắt đầu</Form.Label><Form.Control type="date" /></Col>
          <Col><Form.Label>Ngày kết thúc</Form.Label><Form.Control type="date" /></Col>
          <Col><Form.Label>Trạng thái</Form.Label><Form.Select><option>Tất cả</option></Form.Select></Col>
        </Row>
        <hr/>

        {/* Nút "Tất cả" và "Tìm kiếm" */}
        <div className="text-end mt-3">
          <Button variant="secondary" className="me-2">Tất cả</Button>
          <Button variant="primary">Tìm kiếm</Button>
        </div>
        <hr/>
      </div>

      {/* Danh sách hóa đơn */}
      <Table striped bordered hover style={{ marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#F8E7CA' }}>
          <tr>
            <th style={{ padding: '10px', width: '5%' }}>STT</th>
            <th style={{ padding: '10px', width: '15%' }}>Mã hóa đơn</th>
            <th style={{ padding: '10px', width: '10%' }}>Mã nhân viên</th>
            <th style={{ padding: '10px', width: '15%' }}>Tên khách hàng</th>
            <th style={{ padding: '10px', width: '15%' }}>SDT khách hàng</th>
            <th style={{ padding: '10px', width: '10%' }}>Loại HD</th>
            <th style={{ padding: '10px', width: '10%' }}>Tổng tiền</th>
            <th style={{ padding: '10px', width: '10%' }}>Ngày tạo</th>
            <th style={{ padding: '10px', width: '10%' }}>Trạng thái</th>
            <th style={{ padding: '10px', width: '10%' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>VNA26354897</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>2411362</td>
              <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>Nguyễn Văn Nam</td>
              <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>0982666999</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>Điện tử</td>
              <td style={{ padding: '10px', textAlign: 'right' }}>920.000 VND</td>
              <td style={{ padding: '10px', whiteSpace: 'nowrap', textAlign: 'center' }}>22/06/2024</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>Đã bán</td>
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

export default PosOrderPage;
