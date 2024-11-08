import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ColorList() {
  const [colors, setColors] = useState([]);
  const [editColorId, setEditColorId] = useState(null);
  const [editingColor, setEditingColor] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newColorName, setNewColorName] = useState('');
  const [newColorCode, setNewColorCode] = useState('');

  useEffect(() => {
    const data = [
      { id: 1, colorCode: '#FFFF00', name: "Vàng", createdAt: "01/06/2024", status: "Đang bán" },
      { id: 2, colorCode: '#0000FF', name: "Xanh", createdAt: "15/07/2024", status: "Đang bán" },
    ];
    setColors(data);
  }, []);

  const handleAddColor = () => {
    setShowAddModal(true);
  };

  const handleSaveNewColor = () => {
    if (newColorName.trim() && newColorCode.trim()) {
      const newColor = {
        id: colors.length + 1,
        name: newColorName,
        colorCode: newColorCode,
        createdAt: new Date().toLocaleDateString(),
        status: "Đang bán",
      };
      setColors([...colors, newColor]);
      setNewColorName('');
      setNewColorCode('');
      setShowAddModal(false);
      toast.success('Thêm màu mới thành công!');
    } else {
      toast.error('Vui lòng nhập tên và mã màu');
    }
  };

  const handleEditColor = (id) => {
    const color = colors.find(item => item.id === id);
    setEditingColor(color);
    setEditColorId(id);
  };

  const handleSaveChanges = () => {
    setColors(colors.map(color => 
      color.id === editingColor.id ? editingColor : color
    ));
    toast.success('Cập nhật màu thành công!');
    setEditColorId(null);
    setEditingColor(null);
  };

  const handleDeleteColor = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá màu này không?')) {
      setColors(colors.filter(color => color.id !== id));
      toast.success('Xoá màu thành công!');
    }
  };

  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý màu sắc</h2>

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
              <Form.Control placeholder="Tìm màu sắc" />
              <Button variant="outline-secondary">Tìm</Button>
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Danh sách màu sắc</span>
          <Button style={{ backgroundColor: '#4CAF50', border: 'none' }} onClick={handleAddColor}>+ Thêm màu</Button>
        </div>
        <hr />
      </div>

      <Table striped bordered hover style={{ marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#F8E7CA' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center' }}>STT</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Mã màu</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Tên màu</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ngày tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Trạng thái</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, index) => (
            <tr key={color.id}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{color.colorCode}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{color.name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{color.createdAt}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{color.status}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <Button variant="link" onClick={() => handleEditColor(color.id)}>
                  <FaEdit />
                </Button>
                <Button variant="link" className="text-danger" onClick={() => handleDeleteColor(color.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal chỉnh sửa màu */}
      {editColorId && (
        <Modal show={true} onHide={() => setEditColorId(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa màu sắc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="colorName">
                <Form.Label>Tên màu</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editingColor?.name || ''} 
                  onChange={(e) => setEditingColor({ ...editingColor, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="colorCode" className="mt-3">
                <Form.Label>Mã màu</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editingColor?.colorCode || ''} 
                  onChange={(e) => setEditingColor({ ...editingColor, colorCode: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="colorStatus" className="mt-3">
                <Form.Label>Trạng thái</Form.Label>
                <div>
                  <Form.Check 
                    type="radio" 
                    label="Đang bán" 
                    name="status" 
                    checked={editingColor?.status === "Đang bán"} 
                    onChange={() => setEditingColor({ ...editingColor, status: "Đang bán" })}
                  />
                  <Form.Check 
                    type="radio" 
                    label="Ngừng bán" 
                    name="status" 
                    checked={editingColor?.status === "Ngừng bán"} 
                    onChange={() => setEditingColor({ ...editingColor, status: "Ngừng bán" })}
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditColorId(null)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal thêm màu mới */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới màu sắc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newColorName">
              <Form.Label>Tên màu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên màu"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newColorCode" className="mt-3">
              <Form.Label>Mã màu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mã màu"
                value={newColorCode}
                onChange={(e) => setNewColorCode(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveNewColor}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ColorList;
