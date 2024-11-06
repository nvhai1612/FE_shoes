import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch, FaEye } from 'react-icons/fa'; // Đổi từ FaFilter thành FaSearch
import { useNavigate } from 'react-router-dom';

function SoleTypeList() {
  const [soleTypes, setSoleTypes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = [
      { id: 1, name: "Đế Giày Cao Su", description: "Đế giày bền, chống trơn trượt", createdAt: "01/06/2024" },
      { id: 2, name: "Đế Giày Da", description: "Đế giày sang trọng, bền lâu", createdAt: "15/07/2024" },
      // Thêm dữ liệu SoleType khác nếu cần
    ];
    setSoleTypes(data);
  }, []);

  // Hàm điều hướng tới trang AddSoleTypePage
  const handleAddSoleType = () => {
    navigate('/product/degiay'); // Đường dẫn của AddSoleTypePage
  };

  // Hàm điều hướng tới trang ViewSoleTypePage
  const handleViewSoleType = () => {
    navigate('/product/degiay/themdegiay');
  };

  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý đế giày</h2>

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
              <Form.Control placeholder="Tìm đế giày" />
              <Button variant="outline-secondary">Tìm</Button>
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Danh sách đế giày</span>
          <Button style={{ backgroundColor: '#4CAF50', border: 'none' }} onClick={handleAddSoleType}>+ Thêm đế giày</Button>
        </div>
        <hr />
      </div>

      <Table striped bordered hover style={{ marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#F8E7CA' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center' }}>STT</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Tên đế giày</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Mô tả</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ngày tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {soleTypes.map((soleType, index) => (
            <tr key={soleType.id}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{soleType.name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{soleType.description}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{soleType.createdAt}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <Button variant="link" onClick={handleViewSoleType}><FaEye /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default SoleTypeList;
