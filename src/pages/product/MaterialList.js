import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const [editMaterialId, setEditMaterialId] = useState(null);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMaterialName, setNewMaterialName] = useState('');

  useEffect(() => {
    const data = [
      { id: 1, name: "Da", createdAt: "01/06/2024", status: "Đang có" },
      { id: 2, name: "Vải", createdAt: "15/07/2024", status: "Đang có" },
    ];
    setMaterials(data);
  }, []);

  const handleAddMaterial = () => {
    setShowAddModal(true);
  };

  const handleSaveNewMaterial = () => {
    if (newMaterialName.trim()) {
      const newMaterial = {
        id: materials.length + 1,
        name: newMaterialName,
        createdAt: new Date().toLocaleDateString(),
        status: "Đang có",
      };
      setMaterials([...materials, newMaterial]);
      setNewMaterialName('');
      setShowAddModal(false);
      toast.success('Thêm chất liệu mới thành công!');
    } else {
      toast.error('Vui lòng nhập tên chất liệu');
    }
  };

  const handleEditMaterial = (id) => {
    const material = materials.find(item => item.id === id);
    setEditingMaterial(material);
    setEditMaterialId(id);
  };

  const handleSaveChanges = () => {
    setMaterials(materials.map(material => 
      material.id === editingMaterial.id ? editingMaterial : material
    ));
    toast.success('Cập nhật chất liệu thành công!');
    setEditMaterialId(null);
    setEditingMaterial(null);
  };

  const handleDeleteMaterial = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá chất liệu này không?')) {
      setMaterials(materials.filter(material => material.id !== id));
      toast.success('Xoá chất liệu thành công!');
    }
  };

  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý chất liệu</h2>

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
              <Form.Control placeholder="Tìm chất liệu" />
              <Button variant="outline-secondary">Tìm</Button>
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Danh sách chất liệu</span>
          <Button style={{ backgroundColor: '#4CAF50', border: 'none' }} onClick={handleAddMaterial}>+ Thêm chất liệu</Button>
        </div>
        <hr />
      </div>

      <Table striped bordered hover style={{ marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#F8E7CA' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center' }}>STT</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Tên chất liệu</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ngày tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Trạng thái</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material, index) => (
            <tr key={material.id}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{material.name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{material.createdAt}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{material.status}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <Button variant="link" onClick={() => handleEditMaterial(material.id)}>
                  <FaEdit />
                </Button>
                <Button variant="link" className="text-danger" onClick={() => handleDeleteMaterial(material.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal chỉnh sửa chất liệu */}
      {editMaterialId && (
        <Modal show={true} onHide={() => setEditMaterialId(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa chất liệu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="materialName">
                <Form.Label>Tên chất liệu</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editingMaterial?.name || ''} 
                  onChange={(e) => setEditingMaterial({ ...editingMaterial, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="materialStatus" className="mt-3">
                <Form.Label>Trạng thái</Form.Label>
                <div>
                  <Form.Check 
                    type="radio" 
                    label="Đang có" 
                    name="status" 
                    checked={editingMaterial?.status === "Đang có"} 
                    onChange={() => setEditingMaterial({ ...editingMaterial, status: "Đang có" })}
                  />
                  <Form.Check 
                    type="radio" 
                    label="Ngừng cung cấp" 
                    name="status" 
                    checked={editingMaterial?.status === "Ngừng cung cấp"} 
                    onChange={() => setEditingMaterial({ ...editingMaterial, status: "Ngừng cung cấp" })}
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditMaterialId(null)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal thêm chất liệu mới */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới chất liệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newMaterialName">
              <Form.Label>Chất liệu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên chất liệu"
                value={newMaterialName}
                onChange={(e) => setNewMaterialName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveNewMaterial}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default MaterialList;
