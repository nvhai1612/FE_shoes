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
import { FaPlus, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function DiscountCampaignPage() {
  const navigate = useNavigate();

  const handleCreateNewCampaign = () => {
    navigate("/giamgia/dotgiamgia/themdotgiamgia"); // Điều hướng đến trang AddDiscountCampaignPage
  };

  return (
    <Container fluid style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Đợt giảm giá
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <InputGroup className="mb-3" style={{ maxWidth: "500px" }}>
          <Form.Control placeholder="Tìm đợt giảm giá theo tên" />
          <Button variant="outline-secondary">Tìm</Button>
        </InputGroup>

        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="success" onClick={handleCreateNewCampaign}>
            <FaPlus /> Thêm mới
          </Button>
          <Button variant="outline-primary">Xuất Excel</Button>
        </div>
      </div>

      <Row className="mb-3">
        <Col md={3}>
          <Form.Control type="date" placeholder="Ngày bắt đầu" />
        </Col>
        <Col md={3}>
          <Form.Control type="date" placeholder="Ngày kết thúc" />
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>Trạng thái</option>
            <option>Đang diễn ra</option>
            <option>Đã kết thúc</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select>
            <option>Giá trị</option>
            <option>0-10%</option>
            <option>10-20%</option>
            <option>20-30%</option>
          </Form.Select>
        </Col>
      </Row>

      <Table
        striped
        bordered
        hover
        responsive
        style={{ marginTop: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
      >
        <thead style={{ backgroundColor: "#F8E7CA", textAlign: "center" }}>
          <tr>
            <th>STT</th>
            <th>Tên đợt giảm giá</th>
            <th>Giá trị</th>
            <th>Trạng thái</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày kết thúc</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">Đợt giảm giá {index + 1}</td>
              <td className="text-center">{index % 2 === 0 ? "10%" : "20%"}</td>
              <td
                className="text-center"
                style={{ color: index % 2 === 0 ? "#4CAF50" : "#FF5722" }}
              >
                {index % 2 === 0 ? "Đang diễn ra" : "Đã kết thúc"}
              </td>
              <td className="text-center">21/12/2023 00:00</td>
              <td className="text-center">30/12/2023 00:00</td>
              <td className="text-center">
                <Button variant="link">
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

export default DiscountCampaignPage;
