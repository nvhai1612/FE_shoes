import React, {useEffect, useState} from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import {FaFilter, FaEdit, FaTrash, FaSearch} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";

function EmployeePage() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const [searchName, setSearchName] = useState('');

  const handleAddEmployee = () => {
    navigate('/taikhoan/nhanvien/themnhanvien');
  };

  useEffect(() => {
    axios.get('http://localhost:8080/api/nhan-vien')
        .then(response => setEmployee(response.data))
        .catch(() => toast.error('Không thể tải danh sách nhân viên'));
  }, []);
  const handleSearch = () => {
    // Gọi API tìm kiếm đế giày theo tên và trạng thái
    axios.get(`http://localhost:8080/api/nhan-vien/search`, {
      params: { ten: searchName }
    })
        .then(response => setEmployee(response.data))
        .catch(error => toast.error('Lỗi khi tìm kiếm nhân viên'));
  };

  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý nhân viên</h2>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaFilter style={{ marginRight: '8px' }} />
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Bộ lọc</span>
        </div>
        <Button style={{ backgroundColor: '#4CAF50', border: 'none' }} onClick={handleAddEmployee}>+ Thêm nhân viên</Button>
      </div>
      <hr />

      <div className="filter-section mb-3">
        <Row>
          <Col md={6}>
            <InputGroup>
              <Form.Control
                  placeholder="Tìm mã nhân viên, tên hoặc số điện thoại"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
              />
              <Button variant="outline-secondary" onClick={handleSearch}>
                <FaSearch /> Tìm
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </div>

      <div className="mb-3">
        <h6 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Trạng thái nhân viên</h6>
        <Row className="d-flex justify-content-between align-items-center">
          <Col md={3}>
            <Form.Select>
              <option>Tất cả</option>
              <option>Đang làm việc</option>
              <option>Đã nghỉ việc</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select>
              <option>Tất cả chức vụ</option>
              <option>Quản lý</option>
              <option>Nhân viên</option>
            </Form.Select>
          </Col>
          {/*<Col md={3}>*/}
          {/*  <Form.Select>*/}
          {/*    <option>Tất cả giới tính</option>*/}
          {/*    <option>Nam</option>*/}
          {/*    <option>Nữ</option>*/}
          {/*  </Form.Select>*/}
          {/*</Col>*/}
          <Col md="auto">
            <Button variant="secondary">Làm mới</Button>
          </Col>
        </Row>
      </div>
      <hr />

      <Table striped bordered hover style={{ marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#F8E7CA', textAlign: 'center' }}>
          <tr>
            <th style={{ padding: '10px', textAlign: 'center' }}>STT</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Ảnh</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Mã nhân viên</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Tên nhân viên</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Số điện thoại</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Vai trò</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Trạng thái</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
        {employee.map((employee, index) => (
            <tr key={employee.id}>
              <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
              <td style={{padding: '10px', textAlign: 'center'}}>
                <img src="https://media-cdn-v2.laodong.vn/storage/newsportal/2024/3/19/1317075/Kim-Ji-Won-6.jpg"
                     alt="Employee" style={{width: '40px', height: '45px', borderRadius: '50%'}}/>
              </td>

              <td style={{padding: '10px', textAlign: 'center'}}>{employee.maNhanVien}</td>
              <td style={{padding: '10px', textAlign: 'center'}}>{employee.hoVaTen}</td>
              <td style={{padding: '10px', textAlign: 'center' }}>{employee.soDienThoai}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{employee.email}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{employee.vaiTro===1?"Nhân Viên":"Quản Lý"}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{employee.trangThai===1?"Đang làm":"Nghi Việc"}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <Button variant="link"><FaEdit /></Button>
                <Button variant="link" className="text-danger"><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default EmployeePage;
