import React, { useState, useEffect } from "react";
import {
  Table,
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SoleTypeList() {
  const [soleTypes, setSoleTypes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSoleType, setSelectedSoleType] = useState(null);
  const [status, setStatus] = useState("Đang bán");
  const navigate = useNavigate();

  useEffect(() => {
    const data = [
      {
        id: 1,
        name: "Đế Giày Cao Su",
        description: "Đế giày bền, chống trơn trượt",
        createdAt: "01/06/2024",
        status: "Đang bán",
      },
      {
        id: 2,
        name: "Đế Giày Da",
        description: "Đế giày sang trọng, bền lâu",
        createdAt: "15/07/2024",
        status: "Ngừng bán",
      },
      // Thêm dữ liệu SoleType khác nếu cần
    ];
    setSoleTypes(data);
  }, []);

  // Hàm điều hướng tới trang AddSoleTypePage
  const handleAddSoleType = () => {
    navigate("/product/degiay"); // Đường dẫn của AddSoleTypePage
  };

  // Mở modal chỉnh sửa
  const handleEditSoleType = (soleType) => {
    setSelectedSoleType(soleType);
    setStatus(soleType.status);
    setShowEditModal(true);
  };

  // Xóa đế giày
  const handleDeleteSoleType = (id) => {
    setSoleTypes(soleTypes.filter((soleType) => soleType.id !== id));
  };

  // Cập nhật đế giày
  const handleSaveChanges = () => {
    setSoleTypes(
      soleTypes.map((soleType) =>
        soleType.id === selectedSoleType.id ? { ...soleType, status } : soleType
      )
    );
    setShowEditModal(false);
  };

  return (
    <Container>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Quản lý đế giày
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
          <FaSearch style={{ marginRight: "8px" }} />{" "}
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>Tìm kiếm</span>
        </div>
      </div>
      <hr />

      <div className="filter-section mb-3">
        <Row>
          <Col md={5}>
            <InputGroup>
              <Form.Control placeholder="Tìm đế giày" />
              <Button variant="outline-secondary">
                <FaSearch />
              </Button>
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            Danh sách đế giày
          </span>
          <Button
            style={{ backgroundColor: "#4CAF50", border: "none" }}
            onClick={handleAddSoleType}
          >
            + Thêm đế giày
          </Button>
        </div>
        <hr />
      </div>

      <Table
        striped
        bordered
        hover
        style={{ marginTop: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
      >
        <thead style={{ backgroundColor: "#F8E7CA" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "center" }}>STT</th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Tên đế giày
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>Mô tả</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Ngày tạo</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Trạng thái</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {soleTypes.map((soleType, index) => (
            <tr key={soleType.id}>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {index + 1}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {soleType.name}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {soleType.description}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {soleType.createdAt}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {soleType.status}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <Button
                  variant="link"
                  onClick={() => handleEditSoleType(soleType)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="link"
                  className="text-danger"
                  onClick={() => handleDeleteSoleType(soleType.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal chỉnh sửa */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa đế giày</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="status">
              <Form.Label>Trạng thái</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Đang bán"
                  type="radio"
                  name="status"
                  value="Đang bán"
                  checked={status === "Đang bán"}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <Form.Check
                  inline
                  label="Ngừng bán"
                  type="radio"
                  name="status"
                  value="Ngừng bán"
                  checked={status === "Ngừng bán"}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SoleTypeList;
