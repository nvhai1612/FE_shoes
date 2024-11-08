// src/pages/customer/AddCustomerPage.js
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function AddCustomerPage({ onBack }) {
  return (
    <Container style={{ marginTop: '-20px', paddingTop: '0' }}> {/* Điều chỉnh khoảng cách để sát header */}
      {/* Tiêu đề ở trung tâm */}
      <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginTop: '0' }}>Thêm khách hàng</h2>
      <hr style={{ margin: '10px 0 20px 0' }} /> {/* Điều chỉnh khoảng cách hr */}

      <Form>
        {/* Thanh tên khách hàng */}
        <Form.Group controlId="customerName">
          <Form.Label style={{ display: 'flex', alignItems: 'center', fontSize: '18px', marginBottom: '10px' }}>
            Tên khách hàng
          </Form.Label>
          <Form.Control type="text" placeholder="Nhập tên khách hàng" />
        </Form.Group>

        {/* Mã khách hàng */}
        <Form.Group controlId="customerCode" style={{ marginTop: '20px' }}>
          <Form.Label>Mã khách hàng</Form.Label>
          <Form.Control type="text" placeholder="Nhập mã khách hàng" />
        </Form.Group>

        {/* Số điện thoại */}
        <Form.Group controlId="customerPhone" style={{ marginTop: '20px' }}>
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control type="text" placeholder="Nhập số điện thoại" />
        </Form.Group>

        {/* Hai cột với các trường */}
        <Row style={{ marginTop: '10px' }}>
          {/* Cột phải */}
          <Col md={6}>
            <Form.Group controlId="customerDOB" style={{ marginBottom: '10px' }}>
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control type="date" />
            </Form.Group>

            <Form.Group controlId="customerEmail" style={{ marginBottom: '10px' }}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Nhập email" />
            </Form.Group>
          </Col>

          {/* Cột trái */}
          <Col md={6}>
            <Form.Group controlId="customerAddress" style={{ marginBottom: '10px' }}>
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control type="text" placeholder="Nhập địa chỉ" />
            </Form.Group>

            <Form.Group controlId="customerStatus" style={{ marginBottom: '10px' }}>
              <Form.Label>Trạng thái tài khoản</Form.Label>
              <Form.Check inline label="Hoạt động" name="status" type="radio" id="active" />
              <Form.Check inline label="Ngừng hoạt động" name="status" type="radio" id="inactive" />
            </Form.Group>
          </Col>
        </Row>

        {/* Nút thêm */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button variant="primary">Thêm</Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddCustomerPage;
