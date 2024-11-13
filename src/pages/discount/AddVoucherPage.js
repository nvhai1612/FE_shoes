import React, { useState, useRef } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Table,
  Pagination,
} from "react-bootstrap";
import { FaPercentage } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddVoucherPage() {
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherName, setVoucherName] = useState("");
  const [discountValue, setDiscountValue] = useState(10);
  const [maxDiscount, setMaxDiscount] = useState(300000);
  const [quantity, setQuantity] = useState(20);
  const [minCondition, setMinCondition] = useState(100000);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [voucherType, setVoucherType] = useState("public");

  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  const openFromDatePicker = () => {
    fromDateRef.current.setOpen(true); // Open the date picker
  };

  const openToDatePicker = () => {
    toDateRef.current.setOpen(true); // Open the date picker
  };

  const handleChangeVoucherType = (type) => {
    setVoucherType(type);
  };

  return (
    <Container>
      <h2 className="mb-4">Thêm phiếu giảm giá</h2>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="voucherCode" className="mb-3">
              <Form.Label>Mã phiếu giảm giá</Form.Label>
              <Form.Control
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="voucherName" className="mb-3">
              <Form.Label>Tên phiếu giảm giá</Form.Label>
              <Form.Control
                type="text"
                value={voucherName}
                onChange={(e) => setVoucherName(e.target.value)}
              />
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
                    <InputGroup.Text>
                      <FaPercentage />
                    </InputGroup.Text>
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
                      value={fromDate ? fromDate.toLocaleString("vi-VN") : ""}
                      readOnly
                      placeholder="Chọn ngày và giờ"
                    />
                    <InputGroup.Text
                      onClick={openFromDatePicker}
                      style={{ cursor: "pointer" }}
                    >
                      <AiOutlineCalendar />
                    </InputGroup.Text>
                    <DatePicker
                      ref={fromDateRef}
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                      dateFormat="dd-MM-yyyy HH:mm"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      className="d-none"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="toDate">
                  <Form.Label>Đến ngày</Form.Label>
                  <InputGroup>
                    <FormControl
                      type="text"
                      value={toDate ? toDate.toLocaleString("vi-VN") : ""}
                      readOnly
                      placeholder="Chọn ngày và giờ"
                    />
                    <InputGroup.Text
                      onClick={openToDatePicker}
                      style={{ cursor: "pointer" }}
                    >
                      <AiOutlineCalendar />
                    </InputGroup.Text>
                    <DatePicker
                      ref={toDateRef}
                      selected={toDate}
                      onChange={(date) => setToDate(date)}
                      dateFormat="dd-MM-yyyy HH:mm"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      className="d-none"
                    />
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
                  checked={voucherType === "public"}
                  onChange={() => handleChangeVoucherType("public")}
                />
                <Form.Check
                  inline
                  label="Cá nhân"
                  name="voucherType"
                  type="radio"
                  id="private"
                  checked={voucherType === "private"}
                  onChange={() => handleChangeVoucherType("private")}
                />
              </div>
            </Form.Group>
          </Form>
        </Col>

        {/* Danh sách khách hàng */}
        <Col md={6}>
          <Form.Group controlId="searchCustomer" className="mb-3">
            <Form.Control type="text" placeholder="Tìm kiếm khách hàng" />
          </Form.Group>

          <Table bordered hover>
            <thead>
              <tr>
                <th>
                  <Form.Check />
                </th>
                <th>Tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Ngày sinh</th>
              </tr>
            </thead>
            <tbody>
              {/* Dữ liệu mẫu */}
              <tr>
                <td>
                  <Form.Check />
                </td>
                <td>Nguyễn Văn Nhật</td>
                <td>0261748212</td>
                <td>nhatnguyendzpro@gmail.com</td>
                <td>01-01-1990</td>
              </tr>
              <tr>
                <td>
                  <Form.Check />
                </td>
                <td>Anh Lê</td>
                <td>0562718362</td>
                <td>anhle@gmail.com</td>
                <td>20-12-2001</td>
              </tr>
              {/* Các hàng dữ liệu tiếp theo */}
            </tbody>
          </Table>

          <Pagination className="justify-content-center">
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Next />
          </Pagination>

          <Button
            variant="outline-secondary"
            style={{
              backgroundColor: "#F8E7CA",
              color: "#333",
              borderColor: "#F8E7CA",
              marginTop: "10px",
            }}
          >
            Thêm mới
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AddVoucherPage;
