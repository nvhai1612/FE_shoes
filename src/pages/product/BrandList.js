import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function BrandList() {
  const [brands, setBrands] = useState([]);
  const [editBrandId, setEditBrandId] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const userName = localStorage.getItem('userName') || 'Admin';

  useEffect(() => {
    axios.get('http://localhost:8080/api/thuong-hieu')
        .then(response => setBrands(response.data))
        .catch(() => toast.error('Không thể tải danh sách thương hiệu'));
  }, []);

  const handleAddBrand = () => setShowAddModal(true);

  const handleSaveNewBrand = () => {
    if (newBrandName.trim()) {
      const newBrand = {
        tenThuongHieu: newBrandName,
        trangThai: 1,
        ngayTao: new Date().toISOString(),
        nguoiTao: userName
      };

      axios.post('http://localhost:8080/api/thuong-hieu', newBrand)
          .then(response => {
            setBrands([...brands, response.data]);
            setNewBrandName('');
            setShowAddModal(false);
            toast.success('Thêm thương hiệu mới thành công!');
          })
          .catch(() => toast.error('Lỗi khi thêm thương hiệu mới'));
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
    axios.put(`http://localhost:8080/api/thuong-hieu/${editBrandId}`, editingBrand)
        .then(response => {
          setBrands(brands.map(brand =>
              brand.id === editBrandId ? response.data : brand
          ));
          toast.success('Cập nhật thương hiệu thành công!');
          setEditBrandId(null);
          setEditingBrand(null);
        })
        .catch(() => toast.error('Lỗi khi cập nhật thương hiệu'));
  };

  const handleDeleteBrand = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá thương hiệu này không?')) {
      axios.delete(`http://localhost:8080/api/thuong-hieu/${id}`)
          .then(() => {
            setBrands(brands.filter(brand => brand.id !== id));
            toast.success('Xoá thương hiệu thành công!');
          })
          .catch(() => toast.error('Lỗi khi xoá thương hiệu'));
    }
  };

  return (
      <Container>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '20px'}}>Quản lý thương hiệu</h2>

          <ToastContainer position="top-right" autoClose={3000}/>

          <div className="filter-section mb-3">
              <Row>
                  <Col md={6}>
                      <InputGroup>
                          <Form.Control placeholder="Tìm thương hiệu"/>
                          <Button variant="outline-secondary">Tìm</Button>
                      </InputGroup>
                  </Col>
              </Row>

              <div className="d-flex justify-content-between align-items-center mt-3">
                  <span style={{fontSize: '16px', fontWeight: 'bold'}}>Danh sách thương hiệu</span>
                  <Button style={{backgroundColor: '#4CAF50', border: 'none'}} onClick={handleAddBrand}>+ Thêm thương hiệu
                  </Button>
              </div>
          </div>

          <Table striped bordered hover>
          <thead>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center' }}>STT</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Tên thương hiệu</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ngày tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Người tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Lần cập nhật cuối</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Người cập nhật</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Trạng thái</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
          </thead>
          <tbody>
          {brands.map((brand, index) => (
              <tr key={brand.id}>
                <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{brand.tenThuongHieu}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{new Date(brand.ngayTao).toLocaleDateString()}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{brand.nguoiTao}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{new Date(brand.lanCapNhatCuoi).toLocaleDateString()}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{brand.nguoiCapNhat}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{brand.trangThai === 1 ? "Đang bán" : "Ngừng bán"}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <Button variant="link" onClick={() => handleEditBrand(brand.id)}><FaEdit/></Button>
                  <Button variant="link" className="text-danger" onClick={() => handleDeleteBrand(brand.id)}><FaTrash/></Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        {/* Modal chỉnh sửa thương hiệu */}
        {editBrandId && (
            <Modal show={!!editBrandId} onHide={() => setEditBrandId(null)}>
              <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa thương hiệu</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="brandName">
                    <Form.Label>Tên thương hiệu</Form.Label>
                    <Form.Control
                        type="text"
                        value={editingBrand?.tenThuongHieu || ''}
                        onChange={(e) => setEditingBrand({ ...editingBrand, tenThuongHieu: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="brandStatus" className="mt-3">
                    <Form.Label>Trạng thái</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Đang hoạt động"
                        checked={editingBrand?.trangThai === 1}
                        onChange={() => setEditingBrand({ ...editingBrand, trangThai: 1 })}
                    />
                    <Form.Check
                        type="radio"
                        label="Ngừng hoạt động"
                        checked={editingBrand?.trangThai === 0}
                        onChange={() => setEditingBrand({ ...editingBrand, trangThai: 0 })}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setEditBrandId(null)}>Đóng</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Lưu thay đổi</Button>
              </Modal.Footer>
            </Modal>
        )}

        {/* Modal thêm thương hiệu */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm thương hiệu mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="newBrandName">
                <Form.Label>Tên thương hiệu</Form.Label>
                <Form.Control
                    type="text"
                    value={newBrandName}
                    onChange={(e) => setNewBrandName(e.target.value)}
                    placeholder="Nhập tên thương hiệu"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Đóng</Button>
            <Button variant="primary" onClick={handleSaveNewBrand}>Thêm</Button>
          </Modal.Footer>
        </Modal>
      </Container>
  );
}

export default BrandList;
