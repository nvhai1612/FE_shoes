import React, {useEffect, useState} from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import {FaFilter, FaEdit, FaTrash, FaSearch} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";

function CustomerPage() {
  const navigate = useNavigate();
    const [customer, setCustomer] = useState([]);
    const [searchName, setSearchName] = useState('');

  const handleAddCustomer = () => {
    navigate('/taikhoan/khachhang/themkhachhang'); // Đường dẫn đến AddCustomerPage
  };
    useEffect(() => {
        axios.get('http://localhost:8080/api/khach-hang')
            .then(response => setCustomer(response.data))
            .catch(() => toast.error('Không thể tải danh sách khach hang'));
    }, []);
    const handleSearch = () => {
        // Gọi API tìm kiếm đế giày theo tên và trạng thái
        axios.get(`http://localhost:8080/api/khach-hang/search`, {
            params: { ten: searchName }
        })
            .then(response => setCustomer(response.data))
            .catch(error => toast.error('Lỗi khi tìm kiếm khach hang'));
    };
  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Quản lý khách hàng</h2>

      {/* Bộ lọc và Tạo mới */}
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
        <Button style={{ backgroundColor: '#4CAF50', border: 'none' }} onClick={handleAddCustomer}>+ Thêm mới</Button>
      </div>
      <hr />

      {/* Phần tìm kiếm và bộ lọc khách hàng */}
      <div className="filter-section mb-3">
        <Row>
          <Col md={6}>
              <InputGroup>
                  <Form.Control
                      placeholder="Tìm mã nhân viên, tên hoặc SDT"
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

      {/* Tiêu đề và bộ lọc trạng thái khách hàng */}
      <div className="mb-3">
        <h6 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Trạng thái khách hàng</h6>
        <div className="d-flex justify-content-between align-items-center">
          <Form.Select style={{ maxWidth: '200px' }}>
            <option>Tất cả</option>
            <option>Khách sỉ</option>
            <option>Khách lẻ</option>
          </Form.Select>
          <Button variant="secondary">Làm mới</Button>
        </div>
      </div>
      <hr />

      {/* Danh sách khách hàng */}
      <Table striped bordered hover style={{ marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <thead style={{ backgroundColor: '#F8E7CA', textAlign: 'center' }}>
        <tr>
            <th style={{padding: '10px', textAlign: 'center'}}>STT</th>
            <th style={{padding: '10px', textAlign: 'center'}}>Ảnh</th>
            <th style={{padding: '10px', textAlign: 'center'}}>Mã nhân viên</th>
            <th style={{padding: '10px', textAlign: 'center'}}>Tên nhân viên</th>
            <th style={{padding: '10px', textAlign: 'center'}}>Số điện thoại</th>
            <th style={{padding: '10px', textAlign: 'center'}}>Email</th>
            <th style={{padding: '10px', textAlign: 'center'}}>Trạng thái</th>
            <th style={{padding: '10px', textAlign: 'center'}}>Thao tác</th>
        </tr>
        </thead>
          <tbody>
          {customer.map((customer, index) => (
              <tr key={customer.id}>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{index + 1}</td>
                  <td style={{padding: '10px', textAlign: 'center'}}>
                      <img src="https://media-cdn-v2.laodong.vn/storage/newsportal/2024/3/19/1317075/Kim-Ji-Won-6.jpg"
                           alt="Employee" style={{width: '40px', height: '45px', borderRadius: '50%'}}/>
                  </td>

                  <td style={{padding: '10px', textAlign: 'center'}}>{customer.maKhachHang}</td>
                  <td style={{padding: '10px', textAlign: 'center'}}>{customer.hoVaTen}</td>
                  <td style={{padding: '10px', textAlign: 'center' }}>{customer.soDienThoai}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{customer.email}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{customer.trangThai===1?"Đang làm":"Nghi Việc"}</td>
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

export default CustomerPage;
