import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SizeList() {
  const [sizes, setSizes] = useState([]);
  const [editSizeId, setEditSizeId] = useState(null);
  const [editingSize, setEditingSize] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSizeName, setNewSizeName] = useState('');

  useEffect(() => {
    const data = [
      { id: 1, name: "M", createdAt: "01/06/2024", status: "Đang bán" },
      { id: 2, name: "L", createdAt: "15/07/2024", status: "Đang bán" },
    ];
    setSizes(data);
  }, []);

  const handleAddSize = () => {
    setShowAddModal(true);
  };

  const handleSaveNewSize = () => {
    if (newSizeName.trim()) {
      const newSize = {
        id: sizes.length + 1,
        name: newSizeName,
        createdAt: new Date().toLocaleDateString(),
        status: "Đang bán",
      };
      setSizes([...sizes, newSize]);
      setNewSizeName('');
      setShowAddModal(false);
      toast.success('Thêm kích cỡ mới thành công!');
    } else {
      toast.error('Vui lòng nhập tên kích cỡ');
    }
  };

  const handleEditSize = (id) => {
    const size = sizes.find(item => item.id === id);
    setEditingSize(size);
    setEditSizeId(id);
  };

  const handleSaveChanges = () => {
    setSizes(sizes.map(size => 
      size.id === editingSize.id ? editingSize : size
    ));
    toast.success('Cập nhật kích cỡ thành công!');
    setEditSizeId(null);
    setEditingSize(null);
  };

  const handleDeleteSize = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá kích cỡ này không?')) {
      setSizes(sizes.filter(size => size.id !== id));
      toast.success('Xoá kích cỡ thành công!');
    }
  };

  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý kích cỡ</h2>

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
              <Form.Control placeholder="Tìm kích cỡ" />
              <Button variant="outline-secondary">Tìm</Button>
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Danh sách kích cỡ</span>
          <Button style={{ backgroundColor: '#4CAF50', border: 'none' }} onClick={handleAddSize}>+ Thêm kích cỡ</Button>
        </div>
        <hr />
      </div>

      <Table striped bordered hover style={{ marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#F8E7CA' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center' }}>STT</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Tên kích cỡ</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ngày tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Trạng thái</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((size, index) => (
            <tr key={size.id}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{size.name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{size.createdAt}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{size.status}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <Button variant="link" onClick={() => handleEditSize(size.id)}>
                  <FaEdit />
                </Button>
                <Button variant="link" className="text-danger" onClick={() => handleDeleteSize(size.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal chỉnh sửa kích cỡ */}
      {editSizeId && (
        <Modal show={true} onHide={() => setEditSizeId(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa kích cỡ</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="sizeName">
                <Form.Label>Tên kích cỡ</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editingSize?.name || ''} 
                  onChange={(e) => setEditingSize({ ...editingSize, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="sizeStatus" className="mt-3">
                <Form.Label>Trạng thái</Form.Label>
                <div>
                  <Form.Check 
                    type="radio" 
                    label="Đang bán" 
                    name="status" 
                    checked={editingSize?.status === "Đang bán"} 
                    onChange={() => setEditingSize({ ...editingSize, status: "Đang bán" })}
                  />
                  <Form.Check 
                    type="radio" 
                    label="Ngừng bán" 
                    name="status" 
                    checked={editingSize?.status === "Ngừng bán"} 
                    onChange={() => setEditingSize({ ...editingSize, status: "Ngừng bán" })}
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditSizeId(null)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal thêm kích cỡ mới */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới kích cỡ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newSizeName">
              <Form.Label>Kích cỡ</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên kích cỡ"
                value={newSizeName}
                onChange={(e) => setNewSizeName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveNewSize}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SizeList;
