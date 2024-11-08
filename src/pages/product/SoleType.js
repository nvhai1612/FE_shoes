import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SoleTypeList() {
  const [soleTypes, setSoleTypes] = useState([]);
  const [editSoleTypeId, setEditSoleTypeId] = useState(null);
  const [editingSoleType, setEditingSoleType] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSoleTypeName, setNewSoleTypeName] = useState('');

  useEffect(() => {
    const data = [
      { id: 1, name: "Đế Giày Cao Su", createdAt: "01/06/2024", status: "Đang bán" },
      { id: 2, name: "Đế Giày Da", createdAt: "15/07/2024", status: "Đang bán" },
    ];
    setSoleTypes(data);
  }, []);

  const handleAddSoleType = () => {
    setShowAddModal(true);
  };

  const handleSaveNewSoleType = () => {
    if (newSoleTypeName.trim()) {
      const newSoleType = {
        id: soleTypes.length + 1,
        name: newSoleTypeName,
        createdAt: new Date().toLocaleDateString(),
        status: "Đang bán",
      };
      setSoleTypes([...soleTypes, newSoleType]);
      setNewSoleTypeName('');
      setShowAddModal(false);
      toast.success('Thêm đế giày mới thành công!');
    } else {
      toast.error('Vui lòng nhập tên đế giày');
    }
  };

  const handleEditSoleType = (id) => {
    const soleType = soleTypes.find(item => item.id === id);
    setEditingSoleType(soleType);
    setEditSoleTypeId(id);
  };

  const handleSaveChanges = () => {
    setSoleTypes(soleTypes.map(soleType => 
      soleType.id === editingSoleType.id ? editingSoleType : soleType
    ));
    toast.success('Cập nhật đế giày thành công!');
    setEditSoleTypeId(null);
    setEditingSoleType(null);
  };

  const handleDeleteSoleType = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá đế giày này không?')) {
      setSoleTypes(soleTypes.filter(soleType => soleType.id !== id));
      toast.success('Xoá đế giày thành công!');
    }
  };

  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý đế giày</h2>

      <ToastContainer position="top-right" autoClose={3000} />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaSearch style={{ marginRight: '8px' }} />
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
            <th style={{ padding: '10px', textAlign: 'center' }}>Ngày tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Trạng thái</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {soleTypes.map((soleType, index) => (
            <tr key={soleType.id}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{soleType.name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{soleType.createdAt}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{soleType.status}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <Button variant="link" onClick={() => handleEditSoleType(soleType.id)}>
                  <FaEdit />
                </Button>
                <Button variant="link" className="text-danger" onClick={() => handleDeleteSoleType(soleType.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal chỉnh sửa đế giày */}
      {editSoleTypeId && (
        <Modal show={true} onHide={() => setEditSoleTypeId(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa đế giày</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="soleTypeName">
                <Form.Label>Tên đế giày</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editingSoleType?.name || ''} 
                  onChange={(e) => setEditingSoleType({ ...editingSoleType, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="soleTypeStatus" className="mt-3">
                <Form.Label>Trạng thái</Form.Label>
                <div>
                  <Form.Check 
                    type="radio" 
                    label="Đang bán" 
                    name="status" 
                    checked={editingSoleType?.status === "Đang bán"} 
                    onChange={() => setEditingSoleType({ ...editingSoleType, status: "Đang bán" })}
                  />
                  <Form.Check 
                    type="radio" 
                    label="Ngừng bán" 
                    name="status" 
                    checked={editingSoleType?.status === "Ngừng bán"} 
                    onChange={() => setEditingSoleType({ ...editingSoleType, status: "Ngừng bán" })}
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditSoleTypeId(null)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal thêm đế giày mới */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới đế giày</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newSoleTypeName">
              <Form.Label>Đế giày</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên đế giày"
                value={newSoleTypeName}
                onChange={(e) => setNewSoleTypeName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveNewSoleType}>
            Thêm
          </Button>
          </Modal.Footer>
        </Modal>
    </Container>
  );
}

export default SoleTypeList;
