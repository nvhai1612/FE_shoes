import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup, Modal } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function SoleTypeList() {
  const [soleTypes, setSoleTypes] = useState([]);
  const [editSoleTypeId, setEditSoleTypeId] = useState(null);
  const [editingSoleType, setEditingSoleType] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSoleTypeName, setNewSoleTypeName] = useState('');

  useEffect(() => {
    // Gọi API backend để lấy dữ liệu đế giày
    axios.get('/api/de-giay')
      .then((response) => {
        setSoleTypes(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the sole types!", error);
        toast.error('Không thể tải danh sách đế giày');
      });
  }, []);

  const handleAddSoleType = () => {
    setShowAddModal(true);
  };

  const handleSaveNewSoleType = () => {
    if (newSoleTypeName.trim()) {
      const newSoleType = {
        tenDeGiay: newSoleTypeName,
        trangThai: "Đang bán", // Trạng thái mặc định là "Đang bán"
      };

      axios.post('/api/de-giay', newSoleType)
        .then((response) => {
          setSoleTypes([...soleTypes, response.data]);
          setNewSoleTypeName('');
          setShowAddModal(false);
          toast.success('Thêm đế giày mới thành công!');
        })
        .catch((error) => {
          toast.error('Lỗi khi thêm đế giày mới');
        });
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
    axios.put(`/api/de-giay/${editSoleTypeId}`, editingSoleType)
      .then((response) => {
        setSoleTypes(soleTypes.map(soleType => 
          soleType.id === editSoleTypeId ? response.data : soleType
        ));
        toast.success('Cập nhật đế giày thành công!');
        setEditSoleTypeId(null);
        setEditingSoleType(null);
      })
      .catch((error) => {
        toast.error('Lỗi khi cập nhật đế giày');
      });
  };

  const handleDeleteSoleType = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá đế giày này không?')) {
      axios.delete(`/api/de-giay/${id}`)
        .then(() => {
          setSoleTypes(soleTypes.filter(soleType => soleType.id !== id));
          toast.success('Xoá đế giày thành công!');
        })
        .catch((error) => {
          toast.error('Lỗi khi xoá đế giày');
        });
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
            <th style={{ padding: '10px', textAlign: 'center' }}>Người tạo</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Lần cập nhật cuối</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Người cập nhật</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Trạng thái</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {soleTypes.map((soleType, index) => (
            <tr key={soleType.id}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{soleType.tenDeGiay}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{new Date(soleType.ngayTao).toLocaleDateString()}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{soleType.nguoiTao}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{new Date(soleType.lanCapNhatCuoi).toLocaleDateString()}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{soleType.nguoiCapNhat}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{soleType.trangThai}</td>
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
                  value={editingSoleType?.tenDeGiay || ''} 
                  onChange={(e) => setEditingSoleType({ ...editingSoleType, tenDeGiay: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="soleTypeStatus" className="mt-3">
                <Form.Label>Trạng thái</Form.Label>
                <div>
                  <Form.Check 
                    type="radio" 
                    label="Đang bán" 
                    name="status" 
                    checked={editingSoleType?.trangThai === "Đang bán"} 
                    onChange={() => setEditingSoleType({ ...editingSoleType, trangThai: "Đang bán" })}
                  />
                  <Form.Check 
                    type="radio" 
                    label="Ngừng bán" 
                    name="status" 
                    checked={editingSoleType?.trangThai === "Ngừng bán"} 
                    onChange={() => setEditingSoleType({ ...editingSoleType, trangThai: "Ngừng bán" })}
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditSoleTypeId(null)}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal thêm đế giày */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm đế giày mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newSoleTypeName">
              <Form.Label>Tên đế giày</Form.Label>
              <Form.Control 
                type="text" 
                value={newSoleTypeName} 
                onChange={(e) => setNewSoleTypeName(e.target.value)} 
                placeholder="Nhập tên đế giày" 
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
