import React from "react";
import {
  Table,
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { FaSearch, FaFilter, FaEye, FaSync } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CustomerPage() {
  const navigate = useNavigate();

  const handleAddCustomer = () => {
    navigate("/taikhoan/khachhang/themkhachhang"); // Đường dẫn đến AddCustomerPage
  };

  const handleViewCustomer = (customerId) => {
    navigate(`/taikhoan/khachhang/thongtinkhachhang/${customerId}`); // Đường dẫn đến CustomerInfo
  };

  const handleRefresh = () => {
    console.log("Làm mới danh sách khách hàng");
  };

  return (
    <Container>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Quản lý khách hàng
      </h2>

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
        <Button
          style={{ backgroundColor: "#4CAF50", border: "none" }}
          onClick={handleAddCustomer}
        >
          + Thêm mới
        </Button>
      </div>
      <hr />

      <div className="filter-section mb-3">
        <Row>
          <Col md={5}>
            <InputGroup>
              <Form.Control placeholder="Tìm tên hoặc SDT khách hàng" />
              <Button variant="outline-secondary">
                <FaSearch />
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </div>

      <div className="d-flex mb-3">
        <Form.Group
          controlId="genderFilter"
          style={{ marginRight: "10px", width: "20%" }}
        >
          <Form.Label style={{ fontSize: "16px", fontWeight: "bold" }}>
            Giới tính
          </Form.Label>
          <Form.Select>
            <option>Tất cả</option>
            <option>Nam</option>
            <option>Nữ</option>
          </Form.Select>
        </Form.Group>
        <Form.Group
          controlId="statusFilter"
          style={{ marginRight: "10px", width: "20%" }}
        >
          <Form.Label style={{ fontSize: "16px", fontWeight: "bold" }}>
            Trạng thái
          </Form.Label>
          <Form.Select>
            <option>Tất cả</option>
            <option>Hoạt động</option>
            <option>Dừng Hoạt động</option>
          </Form.Select>
        </Form.Group>

        <Button
          variant="outline-primary"
          onClick={handleRefresh}
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "auto",
            height: "fit-content",
            marginTop: "auto",
          }}
        >
          <FaSync style={{ marginRight: "5px" }} /> Làm mới
        </Button>
      </div>
      <hr />

      <Table
        bordered
        hover
        style={{ marginTop: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
      >
        <thead style={{ backgroundColor: "#F8E7CA", textAlign: "center" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "center" }}>STT</th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Mã khách hàng
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Tên khách hàng
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Số điện thoại
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>Email</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Ngày sinh</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Trạng thái</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index} style={{ backgroundColor: "#FFFFFF" }}>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {index + 1}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                KH{index + 1001}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                Nguyễn Văn {index % 2 === 0 ? "A" : "B"}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                0988{index + 100000}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                nguyenvan{index}@gmail.com
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                22/06/2002
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                Hoạt động
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <Button
                  variant="link"
                  onClick={() => handleViewCustomer(index + 1001)}
                >
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

export default CustomerPage;
