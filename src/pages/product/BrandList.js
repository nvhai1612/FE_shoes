import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BrandList() {
  const [brands, setBrands] = useState([]);
  const [editBrandId, setEditBrandId] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');

  useEffect(() => {
    const data = [
      { id: 1, name: "Nike", createdAt: "01/06/2024", status: "Đang bán" },
      { id: 2, name: "Adidas", createdAt: "15/07/2024", status: "Đang bán" },
    ];
    setBrands(data);
  }, []);

  const handleAddBrand = () => {
    setShowAddModal(true);
  };

  const handleSaveNewBrand = () => {
    if (newBrandName.trim()) {
      const newBrand = {
        id: brands.length + 1,
        name: newBrandName,
        createdAt: new Date().toLocaleDateString(),
        status: "Đang bán",
      };
      setBrands([...brands, newBrand]);
      setNewBrandName('');
      setShowAddModal(false);
      toast.success('Thêm thương hiệu mới thành công!');
    } else {
      toast.error('Vui lòng nhập tên thương hiệu');
    }
  };

  const handleEditBrand = (id) => {
    const brand = brands.find(item => item.id === id);
    setEditingBrand(brand);
    setEditBrandId(id);
  };

  const handleSaveChanges = () => {
    setBrands(brands.map(brand => 
      brand.id === editingBrand.id ? editingBrand : brand
    ));
    toast.success('Cập nhật thương hiệu thành công!');
    setEditBrandId(null);
    setEditingBrand(null);
  };

  const handleDeleteBrand = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá thương hiệu này không?')) {
      setBrands(brands.filter(brand => brand.id !== id));
      toast.success('Xoá thương hiệu thành công!');
    }
  };

  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý thương hiệu</h2>

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
              <Form.Control placeholder="Tìm thương hiệu" />
              <Button variant="outline-secondary">Tìm</Button>
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Danh sách thương hiệu</span>
          <Button style={{ backgroundColor: '#4CAF50', border: 'none' }} onClick={handleAddBrand}>+ Thêm thương hiệu</Button>
        </div>
        <hr />
      </div>

      <Table striped bordered hover style={{ marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#F8E7CA' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center' }}>STT</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Tên thương hiệu</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ngày tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Trạng thái</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <tr key={brand.id}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{brand.name}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{brand.createdAt}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{brand.status}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <Button variant="link" onClick={() => handleEditBrand(brand.id)}>
                  <FaEdit />
                </Button>
                <Button variant="link" className="text-danger" onClick={() => handleDeleteBrand(brand.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal chỉnh sửa thương hiệu */}
      {editBrandId && (
        <Modal show={true} onHide={() => setEditBrandId(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa thương hiệu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="brandName">
                <Form.Label>Tên thương hiệu</Form.Label>
                <Form.Control 
                  type="text" 
                  value={editingBrand?.name || ''} 
                  onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="brandStatus" className="mt-3">
                <Form.Label>Trạng thái</Form.Label>
                <div>
                  <Form.Check 
                    type="radio" 
                    label="Đang bán" 
                    name="status" 
                    checked={editingBrand?.status === "Đang bán"} 
                    onChange={() => setEditingBrand({ ...editingBrand, status: "Đang bán" })}
                  />
                  <Form.Check 
                    type="radio" 
                    label="Ngừng bán" 
                    name="status" 
                    checked={editingBrand?.status === "Ngừng bán"} 
                    onChange={() => setEditingBrand({ ...editingBrand, status: "Ngừng bán" })}
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditBrandId(null)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal thêm thương hiệu mới */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới thương hiệu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newBrandName">
              <Form.Label>Thương hiệu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên thương hiệu"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveNewBrand}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default BrandList;
