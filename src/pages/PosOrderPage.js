import React, { useState } from "react";
import {
  Table,
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { FaFilter, FaEye, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function PosOrderPage() {
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleViewProductVariants = () => {
    // Điều hướng đến trang chi tiết hóa đơn
    navigate("/hoadon/hoadonchitiet");
  };

  const filterButtons = [
    "Tất cả",
    "Chờ xác nhận",
    "Đã xác nhận",
    "Chờ giao hàng",
    "Đang giao hàng",
    "Đã thanh toán",
    "Đã hủy",
  ];

  return (
    <Container>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Quản lý hóa đơn
      </h2>

      {/* Bộ lọc và Tạo mới */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaFilter style={{ marginRight: "8px" }} />
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>Bộ lọc</span>
        </div>
        <Button style={{ backgroundColor: "#4CAF50", border: "none" }}>
          + Tạo mới
        </Button>
      </div>
      <hr />

      {/* Phần tìm kiếm và bộ lọc hóa đơn */}
      <div className="filter-section mb-3">
        <Row>
          <Col md={6}>
            <InputGroup>
              <Form.Control placeholder="Tìm mã hóa đơn, tên nhân viên, tên hoặc SDT khách hàng" />
              <Button variant="outline-secondary">
                <FaSearch />
              </Button>
            </InputGroup>
          </Col>
        </Row>

        <Row className="mt-2">
          <Col>
            <Form.Label>Loại hóa đơn</Form.Label>
            <Form.Select>
              <option>Tất cả</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Ngày bắt đầu</Form.Label>
            <Form.Control type="date" />
          </Col>
          <Col>
            <Form.Label>Ngày kết thúc</Form.Label>
            <Form.Control type="date" />
          </Col>
          <Col>
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select>
              <option>Tất cả</option>
            </Form.Select>
          </Col>
        </Row>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            Danh sách hoá đơn
          </span>
          <Button
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
            }}
            onClick={() => console.log("Làm mới")}
          >
            Làm mới
          </Button>
        </div>
        <hr />
      </div>

      {/* Bộ lọc theo trạng thái */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {filterButtons.map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? "primary" : "light"}
            onClick={() => handleFilterChange(status)}
            style={{
              flex: "1 1 13%",
              border: "1px solid #ddd",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              fontWeight: filterStatus === status ? "bold" : "normal",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Danh sách hóa đơn */}
      <Table striped bordered hover style={{ marginTop: "20px" }}>
        <thead style={{ backgroundColor: "#F8E7CA" }}>
          <tr>
            <th style={{ padding: "10px", width: "5%" }}>STT</th>
            <th style={{ padding: "10px", width: "10%" }}>Mã HĐ</th>
            <th style={{ padding: "10px", width: "10%" }}>Tên KH</th>
            <th style={{ padding: "10px", width: "15%" }}>SĐT</th>
            <th style={{ padding: "10px", width: "10%" }}>Tổng tiền</th>
            <th style={{ padding: "10px", width: "10%" }}>Loại HĐ</th>
            <th style={{ padding: "10px", width: "15%" }}>Ngày tạo</th>
            <th style={{ padding: "10px", width: "10%" }}>Trạng thái</th>
            <th style={{ padding: "10px", width: "10%" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {index + 1}
              </td>
              <td style={{ padding: "10px", whiteSpace: "nowrap" }}>
                HD{index + 10}
              </td>
              <td style={{ padding: "10px", whiteSpace: "nowrap" }}>
                Nguyễn Văn Nam
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                0123456789
              </td>
              <td style={{ padding: "10px", textAlign: "right" }}>
                2,127,500 ₫
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>Điện tử</td>
              <td
                style={{
                  padding: "10px",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                13:48 21/12/2023
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                Hoàn thành
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <Button variant="link" onClick={handleViewProductVariants}>
                  <FaEye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default PosOrderPage;
