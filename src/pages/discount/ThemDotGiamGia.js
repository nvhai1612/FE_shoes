// src/pages/AddVoucherPage.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup, FormControl, Table, Pagination } from 'react-bootstrap';
import { FaPercentage } from 'react-icons/fa';
import { AiOutlineCalendar } from 'react-icons/ai';

function AddVoucherPage() {
    const [voucherCode, setVoucherCode] = useState('');
    const [voucherName, setVoucherName] = useState('');
    const [discountValue, setDiscountValue] = useState(10);
    const [maxDiscount, setMaxDiscount] = useState(300000);
    const [quantity, setQuantity] = useState(20);
    const [minCondition, setMinCondition] = useState(100000);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [voucherType, setVoucherType] = useState('public');

    const handleChangeVoucherType = (type) => {
        setVoucherType(type);
    };

    return (
        <Container>
            <h2 className="mb-4">Đợt  giảm giá / Tạo đợt  giảm giá</h2>
            <Row>
                <Col md={6}>
                    <Form>
                        <Form.Group controlId="voucherCode" className="mb-3">
                            <Form.Label>Mã phiếu giảm giá</Form.Label>
                            <Form.Control type="text" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="voucherName" className="mb-3">
                            <Form.Label>Tên phiếu giảm giá</Form.Label>
                            <Form.Control type="text" value={voucherName} onChange={(e) => setVoucherName(e.target.value)} />
                        </Form.Group>

                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="discountValue">
                                    <Form.Label>Giá trị</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="number"
                                            value={discountValue}
                                            onChange={(e) => setDiscountValue(e.target.value)}
                                        />
                                        <InputGroup.Text><FaPercentage /></InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId="maxDiscount">
                                    <Form.Label>Giá trị tối đa</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="number"
                                            value={maxDiscount}
                                            onChange={(e) => setMaxDiscount(e.target.value)}
                                        />
                                        <InputGroup.Text>₫</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="quantity">
                                    <Form.Label>Số lượng</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId="minCondition">
                                    <Form.Label>Điều kiện</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="number"
                                            value={minCondition}
                                            onChange={(e) => setMinCondition(e.target.value)}
                                        />
                                        <InputGroup.Text>₫</InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col>
                                <Form.Group controlId="fromDate">
                                    <Form.Label>Từ ngày</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="text"
                                            value={fromDate}
                                            onChange={(e) => setFromDate(e.target.value)}
                                        />
                                        <InputGroup.Text><AiOutlineCalendar /></InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId="toDate">
                                    <Form.Label>Đến ngày</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="text"
                                            value={toDate}
                                            onChange={(e) => setToDate(e.target.value)}
                                        />
                                        <InputGroup.Text><AiOutlineCalendar /></InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="voucherType" className="mb-3">
                            <Form.Label>Kiểu</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    label="Công khai"
                                    name="voucherType"
                                    type="radio"
                                    id="public"
                                    checked={voucherType === 'public'}
                                    onChange={() => handleChangeVoucherType('public')}
                                />
                                <Form.Check
                                    inline
                                    label="Cá nhân"
                                    name="voucherType"
                                    type="radio"
                                    id="private"
                                    checked={voucherType === 'private'}
                                    onChange={() => handleChangeVoucherType('private')}
                                />
                            </div>
                        </Form.Group>
                    </Form>
                </Col>

                <Button variant="outline-secondary" style={{ backgroundColor: '#F8E7CA', color: '#333', borderColor: '#F8E7CA', marginTop: '10px' }}>
                    Thêm mới
                </Button>

            </Row>
        </Container>
    );
}

export default AddVoucherPage;
