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

function SoleTypeList() {
  const [soleTypes, setSoleTypes] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSoleType, setSelectedSoleType] = useState(null);
  const [status, setStatus] = useState("Đang bán");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSoleTypeName, setNewSoleTypeName] = useState("");
  const [newSoleTypeStatus, setNewSoleTypeStatus] = useState("Đang bán");
  const [editSoleTypeName, setEditSoleTypeName] = useState(""); // Thêm biến cho tên chỉnh sửa

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
    ];
    setSoleTypes(data);
  }, []);

  const handleAddSoleType = () => {
    setShowAddModal(true);
  };

  const handleSaveNewSoleType = () => {
    if (newSoleTypeName.trim()) {
      const newSoleType = {
        id: soleTypes.length + 1,
        name: newSoleTypeName,
        createdAt: new Date().toLocaleDateString(),
        status: newSoleTypeStatus,
      };
      setSoleTypes([...soleTypes, newSoleType]);
      setNewSoleTypeName("");
      setNewSoleTypeStatus("Đang bán");
      setShowAddModal(false);
    } else {
      alert("Vui lòng nhập tên đế giày.");
    }
  };

  const handleEditSoleType = (soleType) => {
    setSelectedSoleType(soleType);
    setEditSoleTypeName(soleType.name); // Thiết lập tên khi chỉnh sửa
    setStatus(soleType.status);
    setShowEditModal(true);
  };

  const handleDeleteSoleType = (id) => {
    setSoleTypes(soleTypes.filter((soleType) => soleType.id !== id));
  };

  const handleSaveChanges = () => {
    if (editSoleTypeName.trim()) {
      setSoleTypes(
        soleTypes.map((soleType) =>
          soleType.id === selectedSoleType.id
            ? { ...soleType, name: editSoleTypeName, status }
            : soleType
        )
      );
      setShowEditModal(false);
    } else {
      alert("Vui lòng nhập tên đế giày.");
    }
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
          <FaSearch style={{ marginRight: "8px" }} />
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

      <Table striped bordered hover style={{ marginTop: "20px" }}>
        <thead style={{ backgroundColor: "#F8E7CA" }}>
          <tr>
            <th style={{ textAlign: "center" }}>STT</th>
            <th style={{ textAlign: "center" }}>Tên đế giày</th>
            <th style={{ textAlign: "center" }}>Ngày tạo</th>
            <th style={{ textAlign: "center" }}>Trạng thái</th>
            <th style={{ textAlign: "center" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {soleTypes.map((soleType, index) => (
            <tr key={soleType.id}>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td style={{ textAlign: "center" }}>{soleType.name}</td>
              <td style={{ textAlign: "center" }}>{soleType.createdAt}</td>
              <td style={{ textAlign: "center" }}>{soleType.status}</td>
              <td style={{ textAlign: "center" }}>
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

      {/* Modal thêm đế giày */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới đế giày</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newSoleTypeName">
              <Form.Label>Tên đế giày</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên đế giày"
                value={newSoleTypeName}
                onChange={(e) => setNewSoleTypeName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="soleTypeStatus" className="mt-3">
              <Form.Label>Trạng thái</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Check
                  type="radio"
                  label="Đang bán"
                  name="newSoleTypeStatus"
                  checked={newSoleTypeStatus === "Đang bán"}
                  onChange={() => setNewSoleTypeStatus("Đang bán")}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  label="Ngừng bán"
                  name="newSoleTypeStatus"
                  checked={newSoleTypeStatus === "Ngừng bán"}
                  onChange={() => setNewSoleTypeStatus("Ngừng bán")}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveNewSoleType}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal chỉnh sửa đế giày */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa đế giày</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editSoleTypeName">
              <Form.Label>Tên đế giày</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên mới của đế giày"
                value={editSoleTypeName}
                onChange={(e) => setEditSoleTypeName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editSoleTypeStatus" className="mt-3">
              <Form.Label>Trạng thái</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Check
                  type="radio"
                  label="Đang bán"
                  name="editSoleTypeStatus"
                  checked={status === "Đang bán"}
                  onChange={() => setStatus("Đang bán")}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  label="Ngừng bán"
                  name="editSoleTypeStatus"
                  checked={status === "Ngừng bán"}
                  onChange={() => setStatus("Ngừng bán")}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SoleTypeList;
