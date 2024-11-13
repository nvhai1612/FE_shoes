import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Modal, Row, Col, InputGroup } from 'react-bootstrap';
import {FaEdit, FaSearch, FaTrash} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function KichCoList() {
  const [kichCos, setKichCos] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [editKichCoId, setEditKichCoId] = useState(null);
  const [editingKichCo, setEditingKichCo] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKichCo, setNewKichCo] = useState({ tenKichCo: '' });
  const userName = localStorage.getItem('userName') || 'Admin';

  useEffect(() => {
    axios.get('http://localhost:8080/api/kich-co')
        .then(response => setKichCos(response.data))
        .catch(error => toast.error('Không thể tải danh sách kích cỡ'));
  }, []);
    const handleSearch = () => {
        // Gọi API tìm kiếm đế giày theo tên và trạng thái
        axios.get(`http://localhost:8080/api/kich-co/search`, {
            params: { ten: searchName }
        })
            .then(response => setKichCos(response.data))
            .catch(error => toast.error('Lỗi khi tìm kiếm đế giày'));
    };

  const handleAddKichCo = () => setShowAddModal(true);

  const handleSaveNewKichCo = () => {
    if (newKichCo.tenKichCo.trim()) {
      const newRecord = {
        ...newKichCo,
        ngayTao: new Date().toISOString(),
        nguoiTao: userName,
        trangThai: 1,
      };
      axios.post('http://localhost:8080/api/kich-co', newRecord)
          .then(response => {
            setKichCos([...kichCos, response.data]);
            setNewKichCo({ tenKichCo: '' });
            setShowAddModal(false);
            toast.success('Thêm kích cỡ mới thành công!');
          })
          .catch(error => toast.error('Lỗi khi thêm kích cỡ mới'));
    } else {
      toast.error('Vui lòng nhập tên kích cỡ');
    }
  };

  const handleEditKichCo = (id) => {
    const kichCo = kichCos.find(item => item.id === id);
    setEditingKichCo(kichCo);
    setEditKichCoId(id);
  };

  const handleSaveChanges = () => {
    axios.put(`http://localhost:8080/api/kich-co/${editKichCoId}`, editingKichCo)
        .then(response => {
          setKichCos(kichCos.map(kichCo => kichCo.id === editKichCoId ? response.data : kichCo));
          toast.success('Cập nhật kích cỡ thành công!');
          setEditKichCoId(null);
          setEditingKichCo(null);
        })
        .catch(error => toast.error('Lỗi khi cập nhật kích cỡ'));
  };

  const handleDeleteKichCo = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá kích cỡ này không?')) {
      axios.delete(`http://localhost:8080/api/kich-co/${id}`)
          .then(() => {
            setKichCos(kichCos.filter(kichCo => kichCo.id !== id));
            toast.success('Xoá kích cỡ thành công!');
          })
          .catch(error => toast.error('Lỗi khi xoá kích cỡ'));
    }
  };

  return (
      <Container>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý kích cỡ</h2>

        <ToastContainer position="top-right" autoClose={3000} />

        <div className="filter-section mb-3">
          <Row>
            <Col md={6}>
                <InputGroup>
                    <Form.Control
                        placeholder="Tìm kiêm kích cỡ"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <Button variant="outline-secondary" onClick={handleSearch}>
                        <FaSearch /> Tìm
                    </Button>
                </InputGroup>
            </Col>
          </Row>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Danh sách kích cỡ</span>
            <Button style={{ backgroundColor: '#4CAF50', border: 'none' }} onClick={handleAddKichCo}>+ Thêm kích cỡ</Button>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center' }}>STT</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Tên kích cỡ</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ngày tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Người tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Lần cập nhật cuối</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Người cập nhật</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Trạng thái</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
          </thead>
          <tbody>
          {kichCos.map((kichCo, index) => (
              <tr key={kichCo.id}>
                <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{kichCo.tenKichCo}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{new Date(kichCo.ngayTao).toLocaleDateString()}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{kichCo.nguoiTao}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{new Date(kichCo.lanCapNhatCuoi).toLocaleDateString()}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{kichCo.nguoiCapNhat}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{kichCo.trangThai === 1 ? 'Đang sử dụng' : 'Ngừng sử dụng'}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <Button variant="link" onClick={() => handleEditKichCo(kichCo.id)}>
                    <FaEdit />
                  </Button>
                  <Button variant="link" className="text-danger" onClick={() => handleDeleteKichCo(kichCo.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        {/* Modal chỉnh sửa kích cỡ */}
        {editKichCoId && (
            <Modal show={!!editKichCoId} onHide={() => setEditKichCoId(null)}>
              <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa kích cỡ</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="tenKichCo">
                    <Form.Label>Tên kích cỡ</Form.Label>
                    <Form.Control
                        type="text"
                        value={editingKichCo?.tenKichCo || ''}
                        onChange={(e) => setEditingKichCo({ ...editingKichCo, tenKichCo: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group controlId="trangThai" className="mt-3">
                    <Form.Label>Trạng thái</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Đang sử dụng"
                        checked={editingKichCo?.trangThai === 1}
                        onChange={() => setEditingKichCo({ ...editingKichCo, trangThai: 1 })}
                    />
                    <Form.Check
                        type="radio"
                        label="Ngừng sử dụng"
                        checked={editingKichCo?.trangThai === 0}
                        onChange={() => setEditingKichCo({ ...editingKichCo, trangThai: 0 })}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setEditKichCoId(null)}>Đóng</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Lưu thay đổi</Button>
              </Modal.Footer>
            </Modal>
        )}

        {/* Modal thêm kích cỡ */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm kích cỡ mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="tenKichCo">
                <Form.Label>Tên kích cỡ</Form.Label>
                <Form.Control
                    type="text"
                    value={newKichCo.tenKichCo}
                    onChange={(e) => setNewKichCo({ ...newKichCo, tenKichCo: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Đóng</Button>
            <Button variant="primary" onClick={handleSaveNewKichCo}>Lưu</Button>
          </Modal.Footer>
        </Modal>
      </Container>
  );
}

export default KichCoList;
