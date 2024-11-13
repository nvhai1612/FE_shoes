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
import { AiOutlineCalendar } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddDiscountCampaign() {
  const [campaignName, setCampaignName] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [status, setStatus] = useState("active"); // Trạng thái mặc định là "active"

  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  const openFromDatePicker = () => fromDateRef.current.setOpen(true);
  const openToDatePicker = () => toDateRef.current.setOpen(true);

  return (
    <Container>
      <h2 className="mb-4">Thêm đợt giảm giá</h2>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="campaignName" className="mb-3">
              <Form.Label>Tên đợt giảm giá</Form.Label>
              <Form.Control
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="discountValue" className="mb-3">
              <Form.Label>Giá trị giảm giá</Form.Label>
              <InputGroup>
                <FormControl
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
            </Form.Group>

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

            {/* Thêm radio button cho trạng thái */}
            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Đang hoạt động"
                  name="status"
                  value="active"
                  checked={status === "active"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Ngừng hoạt động"
                  name="status"
                  value="inactive"
                  checked={status === "inactive"}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
            </Form.Group>

            <Button variant="primary" className="mt-3">
              Tạo mới
            </Button>
          </Form>
        </Col>

        {/* Danh sách sản phẩm */}
        <Col md={6}>
          <Form.Group controlId="searchProduct" className="mb-3">
            <Form.Control type="text" placeholder="Tìm tên sản phẩm" />
          </Form.Group>

          <Table bordered hover>
            <thead>
              <tr>
                <th>
                  <Form.Check />
                </th>
                <th>STT</th>
                <th>Tên sản phẩm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Form.Check />
                </td>
                <td>1</td>
                <td>Product 1</td>
              </tr>
              <tr>
                <td>
                  <Form.Check />
                </td>
                <td>2</td>
                <td>Product 2</td>
              </tr>
            </tbody>
          </Table>

          <Pagination className="justify-content-center">
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Next />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default AddDiscountCampaign;
