import React, { useState, useEffect } from 'react';
import {Table, Form, Button, Container, Modal, Row, Col, InputGroup} from 'react-bootstrap';
import {FaEdit, FaSearch, FaTrash} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function MauSacList() {
  const [mauSacs, setMauSacs] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [editMauSacId, setEditMauSacId] = useState(null);
  const [editingMauSac, setEditingMauSac] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMauSac, setNewMauSac] = useState({ maMauSac: '', tenMauSac: '' });
  const userName = localStorage.getItem('userName') || 'Admin';

  useEffect(() => {
    axios.get('http://localhost:8080/api/mau-sac')
        .then(response => setMauSacs(response.data))
        .catch(error => toast.error('Không thể tải danh sách màu sắc'));
  }, []);
    const handleSearch = () => {
        // Gọi API tìm kiếm đế giày theo tên và trạng thái
        axios.get(`http://localhost:8080/api/mau-sac/search`, {
            params: { ten: searchName }
        })
            .then(response => setMauSacs(response.data))
            .catch(error => toast.error('Lỗi khi tìm kiếm đế giày'));
    };

  const handleAddMauSac = () => setShowAddModal(true);

  const handleSaveNewMauSac = () => {
    if (newMauSac.maMauSac.trim() && newMauSac.tenMauSac.trim()) {
      const newRecord = {
        ...newMauSac,
        ngayTao: new Date().toISOString(),
        nguoiTao: userName,
        trangThai: 1,
      };
      axios.post('http://localhost:8080/api/mau-sac', newRecord)
          .then(response => {
            setMauSacs([...mauSacs, response.data]);
            setNewMauSac({ maMauSac: '', tenMauSac: '' });
            setShowAddModal(false);
            toast.success('Thêm màu sắc mới thành công!');
          })
          .catch(error => toast.error('Lỗi khi thêm màu sắc mới'));
    } else {
      toast.error('Vui lòng nhập mã và tên màu sắc');
    }
  };

  const handleEditMauSac = (id) => {
    const mauSac = mauSacs.find(item => item.id === id);
    setEditingMauSac(mauSac);
    setEditMauSacId(id);
  };

  const handleSaveChanges = () => {
    axios.put(`http://localhost:8080/api/mau-sac/${editMauSacId}`, editingMauSac)
        .then(response => {
          setMauSacs(mauSacs.map(mauSac => mauSac.id === editMauSacId ? response.data : mauSac));
          toast.success('Cập nhật màu sắc thành công!');
          setEditMauSacId(null);
          setEditingMauSac(null);
        })
        .catch(error => toast.error('Lỗi khi cập nhật màu sắc'));
  };

  const handleDeleteMauSac = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá màu sắc này không?')) {
      axios.delete(`http://localhost:8080/api/mau-sac/${id}`)
          .then(() => {
            setMauSacs(mauSacs.filter(mauSac => mauSac.id !== id));
            toast.success('Xoá màu sắc thành công!');
          })
          .catch(error => toast.error('Lỗi khi xoá màu sắc'));
    }
  };

  return (
      <Container>
        <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '20px'}}>Quản lý chất liệu</h2>

        <ToastContainer position="top-right" autoClose={3000}/>

        <div className="filter-section mb-3">
          <Row>
            <Col md={6}>
                <InputGroup>
                    <Form.Control
                        placeholder="Tìm tên màu sắc"
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
            <span style={{fontSize: '16px', fontWeight: 'bold'}}>Danh sách màu sắc</span>
            <Button style={{backgroundColor: '#4CAF50', border: 'none'}} onClick={handleAddMauSac}>+ Thêm màu sắc
              </Button>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center' }}>STT</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Mã màu sắc</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Tên màu sắc</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ngày tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Người tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Lần cập nhật cuối</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Người cập nhật</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Trạng thái</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
          </thead>
          <tbody>
          {mauSacs.map((mauSac, index) => (
              <tr key={mauSac.id}>
                <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{mauSac.maMauSac}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{mauSac.tenMauSac}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{new Date(mauSac.ngayTao).toLocaleDateString()}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{mauSac.nguoiTao}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{new Date(mauSac.lanCapNhatCuoi).toLocaleDateString()}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{mauSac.nguoiCapNhat}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{mauSac.trangThai === 1 ? 'Đang sử dụng' : 'Ngừng sử dụng'}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <Button variant="link" onClick={() => handleEditMauSac(mauSac.id)}>
                    <FaEdit/>
                  </Button>
                  <Button variant="link" className="text-danger" onClick={() => handleDeleteMauSac(mauSac.id)}>
                    <FaTrash/>
                  </Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        {/* Modal chỉnh sửa màu sắc */}
        {editMauSacId && (
            <Modal show={!!editMauSacId} onHide={() => setEditMauSacId(null)}>
              <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa màu sắc</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="maMauSac">
                    <Form.Label>Mã màu sắc</Form.Label>
                    <Form.Control
                        type="text"
                        value={editingMauSac?.maMauSac || ''}
                        onChange={(e) => setEditingMauSac({...editingMauSac, maMauSac: e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group controlId="tenMauSac" className="mt-3">
                    <Form.Label>Tên màu sắc</Form.Label>
                    <Form.Control
                        type="text"
                        value={editingMauSac?.tenMauSac || ''}
                        onChange={(e) => setEditingMauSac({...editingMauSac, tenMauSac: e.target.value})}
                    />
                  </Form.Group>
                  <Form.Group controlId="trangThai" className="mt-3">
                    <Form.Label>Trạng thái</Form.Label>
                    <Form.Check
                        type="radio"
                        label="Đang sử dụng"
                        checked={editingMauSac?.trangThai === 1}
                        onChange={() => setEditingMauSac({...editingMauSac, trangThai: 1})}
                    />
                    <Form.Check
                        type="radio"
                        label="Ngừng sử dụng"
                        checked={editingMauSac?.trangThai === 0}
                        onChange={() => setEditingMauSac({...editingMauSac, trangThai: 0})}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setEditMauSacId(null)}>Đóng</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Lưu thay đổi</Button>
              </Modal.Footer>
            </Modal>
        )}

        {/* Modal thêm màu sắc */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm màu sắc mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="newMaMauSac">
                <Form.Label>Mã màu sắc</Form.Label>
                <Form.Control
                    type="text"
                    value={newMauSac.maMauSac}
                    onChange={(e) => setNewMauSac({...newMauSac, maMauSac: e.target.value})}
                    placeholder="Nhập mã màu sắc"
                />
              </Form.Group>
              <Form.Group controlId="newTenMauSac" className="mt-3">
                <Form.Label>Tên màu sắc</Form.Label>
                <Form.Control
                    type="text"
                    value={newMauSac.tenMauSac}
                    onChange={(e) => setNewMauSac({...newMauSac, tenMauSac: e.target.value})}
                    placeholder="Nhập tên màu sắc"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Đóng</Button>
            <Button variant="primary" onClick={handleSaveNewMauSac}>Thêm</Button>
          </Modal.Footer>
        </Modal>
      </Container>
  );
}

export default MauSacList;
