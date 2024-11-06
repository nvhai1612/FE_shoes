// src/pages/product/AddProductPage.js
import React from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

function AddProductPage({ onBack }) {
  return (
    <Container style={{ marginTop: '-20px', paddingTop: '0' }}> {/* Điều chỉnh khoảng cách để sát header */}
      {/* Tiêu đề ở trung tâm */}
      <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', marginTop: '0' }}>Thêm sản phẩm</h2>
      <hr style={{ margin: '10px 0 20px 0' }} /> {/* Điều chỉnh khoảng cách hr */}

      <Form>
        {/* Thanh tên sản phẩm */}
        <Form.Group controlId="productName">
          <Form.Label style={{ display: 'flex', alignItems: 'center', fontSize: '18px', marginBottom: '10px' }}>
            Tên sản phẩm
          </Form.Label>
          <Form.Control type="text" placeholder="Nhập tên sản phẩm" />
        </Form.Group>

        {/* Radio Giới tính */}
        <Form.Group controlId="productGender" style={{ marginTop: '20px' }}>
          <Form.Label>Giới tính</Form.Label>
          <div>
            <Form.Check inline label="Nam" name="gender" type="radio" id="male" />
            <Form.Check inline label="Nữ" name="gender" type="radio" id="female" />
          </div>
        </Form.Group>

        {/* Mô tả */}
        <Form.Group controlId="productDescription" style={{ marginTop: '20px' }}>
          <Form.Label>Mô tả</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Nhập mô tả sản phẩm" />
        </Form.Group>

        {/* Hai cột với các trường */}
        <Row style={{ marginTop: '10px' }}>
          {/* Cột phải */}
          <Col md={6}>
            <Form.Group controlId="productBrand" style={{ marginBottom: '10px' }}>
              <Form.Label>Thương Hiệu</Form.Label>
              <InputGroup>
                <Form.Control type="text" placeholder="Thương hiệu" />
                <Button variant="outline-secondary"><FaPlus /></Button>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="productMaterial" style={{ marginBottom: '10px' }}>
              <Form.Label>Chất liệu</Form.Label>
              <InputGroup>
                <Form.Control type="text" placeholder="Chất liệu" />
                <Button variant="outline-secondary"><FaPlus /></Button>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="productSole" style={{ marginBottom: '10px' }}>
              <Form.Label>Đế giày</Form.Label>
              <InputGroup>
                <Form.Control type="text" placeholder="Đế giày" />
                <Button variant="outline-secondary"><FaPlus /></Button>
              </InputGroup>
            </Form.Group>
          </Col>

          {/* Cột trái */}
          <Col md={6}>
            <Form.Group controlId="productColor" style={{ marginBottom: '10px' }}>
              <Form.Label>Màu sắc</Form.Label>
              <InputGroup>
                <Form.Control type="text" placeholder="Màu sắc" />
                <Button variant="outline-secondary"><FaPlus /></Button>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="productSize" style={{ marginBottom: '10px' }}>
              <Form.Label>Kích cỡ</Form.Label>
              <InputGroup>
                <Form.Control type="text" placeholder="Kích cỡ" />
                <Button variant="outline-secondary"><FaPlus /></Button>
              </InputGroup>
            </Form.Group>

            <div style={{ marginTop: '40px' }}>
              <Button variant="primary">Thêm</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default AddProductPage;
