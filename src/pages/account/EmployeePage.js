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
import { FaSearch, FaFilter, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function EmployeePage() {
  const navigate = useNavigate();

  const handleAddEmployee = () => {
    navigate("/taikhoan/nhanvien/themnhanvien");
  };

  return (
    <Container>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Quản lý nhân viên
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
          onClick={handleAddEmployee}
        >
          + Thêm nhân viên
        </Button>
      </div>
      <hr />

      <div className="filter-section mb-3">
        <Row>
          <Col md={5}>
            <InputGroup>
              <Form.Control placeholder="Tìm mã nhân viên, tên hoặc SDT" />
              <Button variant="outline-secondary">
                <FaSearch />
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </div>

      <div className="mb-3">
        <h6
          style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "5px" }}
        >
          Trạng thái nhân viên
        </h6>
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
          <Col md={3}>
            <Form.Select>
              <option>Tất cả giới tính</option>
              <option>Nam</option>
              <option>Nữ</option>
            </Form.Select>
          </Col>
          <Col md="auto">
            <Button variant="secondary">Làm mới</Button>
          </Col>
        </Row>
      </div>
      <hr />

      <Table
        striped
        bordered
        hover
        style={{ marginTop: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
      >
        <thead style={{ backgroundColor: "#F8E7CA", textAlign: "center" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "center" }}>STT</th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Mã nhân viên
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Tên nhân viên
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Số điện thoại
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>Ngày sinh</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Giới tính</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Chức vụ</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Trạng thái</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {index + 1}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                NV{1 + index}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                Nguyễn Văn Hải
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                0982666999
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                16/12/2003
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>Nam</td>
              <td style={{ padding: "10px", textAlign: "center" }}>Quản lý</td>
              <td style={{ padding: "10px", textAlign: "center" }}>Đang làm</td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <Button variant="link">
                  <FaEdit />
                </Button>
                <Button variant="link" className="text-danger">
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default EmployeePage;
