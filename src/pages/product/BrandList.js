import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Form, Modal } from 'react-bootstrap';

const ThuongHieuManagement = () => {
  const [thuongHieus, setThuongHieus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedThuongHieu, setSelectedThuongHieu] = useState(null);
  const [tenThuongHieu, setTenThuongHieu] = useState('');
  const [trangThai, setTrangThai] = useState(true); // true = active, false = inactive
  const [nguoiTao, setNguoiTao] = useState('');
  const [nguoiCapNhat, setNguoiCapNhat] = useState('');
  const [lanCapNhatCuoi, setLanCapNhatCuoi] = useState('');
  const [ngayTao, setNgayTao] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  // Fetch danh sách thương hiệu
  const fetchThuongHieus = () => {
    axios.get('http://localhost:8080/api/thuong-hieu')
      .then(response => {
        setThuongHieus(response.data);
      })
      .catch(error => {
        console.error('Error fetching Thuong Hieu', error);
      });
  };

  useEffect(() => {
    fetchThuongHieus();
  }, []);

  // Xử lý mở modal để thêm hoặc sửa thương hiệu
  const handleOpenModal = (thuongHieu = null) => {
    if (thuongHieu) {
      setSelectedThuongHieu(thuongHieu);
      setTenThuongHieu(thuongHieu.tenThuongHieu);
      setTrangThai(thuongHieu.trangThai);
      setNguoiTao(thuongHieu.nguoiTao);
      setNguoiCapNhat(thuongHieu.nguoiCapNhat);
      setLanCapNhatCuoi(thuongHieu.lanCapNhatCuoi);
      setNgayTao(thuongHieu.ngayTao);
      setIsEdit(true);
    } else {
      setSelectedThuongHieu(null);
      setTenThuongHieu('');
      setTrangThai(true);
      setNguoiTao('');
      setNguoiCapNhat('');
      setLanCapNhatCuoi('');
      setNgayTao('');
      setIsEdit(false);
    }
    setShowModal(true);
  };

  // Xử lý lưu dữ liệu (thêm/sửa)
  const handleSave = () => {
    const data = {
      tenThuongHieu,
      trangThai,
      nguoiTao,
      nguoiCapNhat,
      lanCapNhatCuoi,
      ngayTao
    };

    if (isEdit && selectedThuongHieu) {
      // Cập nhật thương hiệu
      axios.put(`http://localhost:8080/api/thuong-hieu/${selectedThuongHieu.id}`, data)
        .then(() => {
          fetchThuongHieus();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error updating Thuong Hieu', error);
        });
    } else {
      // Tạo mới thương hiệu
      axios.post('http://localhost:8080/api/thuong-hieu', data)
        .then(() => {
          fetchThuongHieus();
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error creating Thuong Hieu', error);
        });
    }
  };

  // Xử lý xóa thương hiệu
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/thuong-hieu/${id}`)
      .then(() => {
        fetchThuongHieus();
      })
      .catch(error => {
        console.error('Error deleting Thuong Hieu', error);
      });
  };

  return (
    <div>
      <h2>Quản lý Thương Hiệu</h2>
      <Button variant="primary" onClick={() => handleOpenModal()}>
        Thêm Mới
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Thương Hiệu</th>
            <th>Trạng Thái</th>
            <th>Ngày Tạo</th>
            <th>Người Tạo</th>
            <th>Ngày Cập Nhật Cuối</th>
            <th>Người Cập Nhật</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {thuongHieus.map((th) => (
            <tr key={th.id}>
              <td>{th.id}</td>
              <td>{th.tenThuongHieu}</td>
              <td>{th.trangThai ? 'Kích Hoạt' : 'Tạm Dừng'}</td>
              <td>{th.ngayTao}</td>
              <td>{th.nguoiTao}</td>
              <td>{th.lanCapNhatCuoi}</td>
              <td>{th.nguoiCapNhat}</td>
              <td>
                <Button variant="warning" onClick={() => handleOpenModal(th)}>Sửa</Button>
                <Button variant="danger" onClick={() => handleDelete(th.id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal để thêm/sửa thương hiệu */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Cập Nhật Thương Hiệu' : 'Thêm Mới Thương Hiệu'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTenThuongHieu">
              <Form.Label>Tên Thương Hiệu</Form.Label>
              <Form.Control
                type="text"
                value={tenThuongHieu}
                onChange={(e) => setTenThuongHieu(e.target.value)}
                placeholder="Nhập tên thương hiệu"
              />
            </Form.Group>

            <Form.Group controlId="formNguoiTao">
              <Form.Label>Người Tạo</Form.Label>
              <Form.Control
                type="text"
                value={nguoiTao}
                onChange={(e) => setNguoiTao(e.target.value)}
                placeholder="Nhập người tạo"
              />
            </Form.Group>

            <Form.Group controlId="formNguoiCapNhat">
              <Form.Label>Người Cập Nhật</Form.Label>
              <Form.Control
                type="text"
                value={nguoiCapNhat}
                onChange={(e) => setNguoiCapNhat(e.target.value)}
                placeholder="Nhập người cập nhật"
              />
            </Form.Group>

            <Form.Group controlId="formLanCapNhatCuoi">
              <Form.Label>Lần Cập Nhật Cuối</Form.Label>
              <Form.Control
                type="text"
                value={lanCapNhatCuoi}
                onChange={(e) => setLanCapNhatCuoi(e.target.value)}
                placeholder="Nhập lần cập nhật cuối"
              />
            </Form.Group>

            <Form.Group controlId="formNgayTao">
              <Form.Label>Ngày Tạo</Form.Label>
              <Form.Control
                type="text"
                value={ngayTao}
                onChange={(e) => setNgayTao(e.target.value)}
                placeholder="Nhập ngày tạo"
              />
            </Form.Group>

            <Form.Group controlId="formTrangThai">
              <Form.Label>Trạng Thái</Form.Label>
              <Form.Check
                type="radio"
                label="Kích Hoạt"
                checked={trangThai === true}
                onChange={() => setTrangThai(true)}
              />
              <Form.Check
                type="radio"
                label="Tạm Dừng"
                checked={trangThai === false}
                onChange={() => setTrangThai(false)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEdit ? 'Cập Nhật' : 'Lưu'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ThuongHieuManagement;
