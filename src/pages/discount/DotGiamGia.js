import React, {useEffect, useState} from 'react';
import { Table, Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { FaPlus, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";

function VoucherPage() {
    const navigate = useNavigate();
    const [dotGiamGia, setDotGiamGia] = useState([]);
    const [searchName, setSearchName] = useState('');

    const handleCreateNewVoucher = () => {
        navigate('/giamgia/phieugiamgia/themphieugiamgia'); // Điều hướng đến trang AddVoucherPage
    };
    useEffect(() => {
        axios.get('http://localhost:8080/api/dot-giam-gia')
            .then(response => setDotGiamGia(response.data))
            .catch(() => toast.error('Không thể tải danh sách dot giam gia'));
    }, []);
    const handleSearch = () => {
        // Gọi API tìm kiếm đế giày theo tên và trạng thái
        axios.get(`http://localhost:8080/api/dot-giam-gia/search`, {
            params: { ten: searchName }
        })
            .then(response => setDotGiamGia(response.data))
            .catch(error => toast.error('Lỗi khi tìm kiếm dot giam gia'));
    };
    return (
        <Container fluid style={{ paddingLeft: '20px', paddingRight: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Đợt  giảm giá</h2>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px'
            }}>
                <InputGroup className="mb-3" style={{ maxWidth: '500px' }}>
                    <Form.Control placeholder="Tìm dợt  giảm giá theo mã hoặc tên" />
                    <Button variant="outline-secondary">Tìm</Button>
                </InputGroup>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button variant="success" onClick={handleCreateNewVoucher}><FaPlus /> Tạo mới</Button>
                    <Button variant="outline-primary">Xuất Excel</Button>
                </div>
            </div>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Control type="date" placeholder="Từ ngày" />
                </Col>
                <Col md={3}>
                    <Form.Control type="date" placeholder="Đến ngày" />
                </Col>
                <Col md={3}>
                    <Form.Select>
                        <option>Kiểu</option>
                        <option>Cá nhân</option>
                        <option>Công khai</option>
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select>
                        <option>Loại</option>
                        <option>Giảm giá phần trăm</option>
                        <option>Giảm giá cố định</option>
                    </Form.Select>
                </Col>
            </Row>

            <Table striped bordered hover responsive style={{ marginTop: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <thead style={{ backgroundColor: '#F8E7CA', textAlign: 'center' }}>
                <tr>
                    <th>STT</th>
                    <th>Mã</th>
                    <th>Tên</th>
                    <th>Kiểu</th>
                    <th>Loại</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                </tr>
                </thead>
                <tbody>
                {dotGiamGia.map((dgg, index) => (
                    <tr key={dgg.id}>
                        <td style={{ padding: '10px', textAlign: 'center' }}>{dgg.maNhanVien}</td>
                        <td className="text-center">
                            <Button variant="link"><FaEye /></Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default VoucherPage;
