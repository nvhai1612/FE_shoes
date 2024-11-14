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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ColorList() {
  const [colors, setColors] = useState([]);
  const [editColorId, setEditColorId] = useState(null);
  const [editingColor, setEditingColor] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newColorName, setNewColorName] = useState("");
  const [newColorCode, setNewColorCode] = useState("");
  const [status, setStatus] = useState("Đang bán");

  useEffect(() => {
    const data = [
      { id: 1, name: "Đỏ", code: "#FF0000", status: "Đang bán" },
      { id: 2, name: "Xanh", code: "#0000FF", status: "Đang bán" },
    ];
    setColors(data);
  }, []);

  const handleAddColor = () => {
    setShowAddModal(true);
  };

  const handleSaveNewColor = () => {
    if (newColorName.trim() && newColorCode.trim()) {
      const newColor = {
        id: colors.length + 1,
        name: newColorName,
        code: newColorCode,
        status: status,
      };
      setColors([...colors, newColor]);
      setNewColorName("");
      setNewColorCode("");
      setStatus("Đang bán");
      setShowAddModal(false);
      toast.success("Thêm màu sắc mới thành công!");
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin màu sắc.");
    }
  };

  const handleEditColor = (id) => {
    const color = colors.find((item) => item.id === id);
    setEditingColor(color);
    setEditColorId(id);
  };

  const handleSaveChanges = () => {
    setColors(
      colors.map((color) =>
        color.id === editingColor.id ? editingColor : color
      )
    );
    toast.success("Cập nhật màu sắc thành công!");
    setEditColorId(null);
    setEditingColor(null);
  };

  const handleDeleteColor = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá màu sắc này không?")) {
      setColors(colors.filter((color) => color.id !== id));
      toast.success("Xoá màu sắc thành công!");
    }
  };

  return (
    <Container>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Quản lý màu sắc
      </h2>

      <ToastContainer position="top-right" autoClose={3000} />

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
              <Form.Control placeholder="Tìm màu sắc" />
              <Button variant="outline-secondary">
                <FaSearch />
              </Button>
            </InputGroup>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            Danh sách màu sắc
          </span>
          <Button
            style={{ backgroundColor: "#4CAF50", border: "none" }}
            onClick={handleAddColor}
          >
            + Thêm màu sắc
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
            <th style={{ padding: "10px", textAlign: "center" }}>Tên màu</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Mã màu</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Trạng thái</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, index) => (
            <tr key={color.id}>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {index + 1}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {color.name}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {color.code}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                {color.status}
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <Button
                  variant="link"
                  onClick={() => handleEditColor(color.id)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="link"
                  className="text-danger"
                  onClick={() => handleDeleteColor(color.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal chỉnh sửa màu sắc */}
      {editColorId && (
        <Modal show={true} onHide={() => setEditColorId(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa màu sắc</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="colorName">
                <Form.Label>Tên màu</Form.Label>
                <Form.Control
                  type="text"
                  value={editingColor?.name || ""}
                  onChange={(e) =>
                    setEditingColor({ ...editingColor, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="colorCode" className="mt-3">
                <Form.Label>Mã màu</Form.Label>
                <Form.Control
                  type="text"
                  value={editingColor?.code || ""}
                  onChange={(e) =>
                    setEditingColor({ ...editingColor, code: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="colorStatus" className="mt-3">
                <Form.Label>Trạng thái</Form.Label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Form.Check
                    type="radio"
                    label="Đang bán"
                    name="status"
                    checked={editingColor?.status === "Đang bán"}
                    onChange={() =>
                      setEditingColor({ ...editingColor, status: "Đang bán" })
                    }
                  />
                  <Form.Check
                    type="radio"
                    label="Ngừng bán"
                    name="status"
                    checked={editingColor?.status === "Ngừng bán"}
                    onChange={() =>
                      setEditingColor({ ...editingColor, status: "Ngừng bán" })
                    }
                  />
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditColorId(null)}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Lưu thay đổi
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal thêm màu sắc mới */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới màu sắc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newColorName">
              <Form.Label>Tên màu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tên màu"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newColorCode" className="mt-3">
              <Form.Label>Mã màu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mã màu"
                value={newColorCode}
                onChange={(e) => setNewColorCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newColorStatus" className="mt-3">
              <Form.Label>Trạng thái</Form.Label>
              <div style={{ display: "flex", gap: "10px" }}>
                <Form.Check
                  type="radio"
                  label="Đang bán"
                  name="status"
                  checked={status === "Đang bán"}
                  onChange={() => setStatus("Đang bán")}
                />
                <Form.Check
                  type="radio"
                  label="Ngừng bán"
                  name="status"
                  checked={status === "Ngừng bán"}
                  onChange={() => setStatus("Ngừng bán")}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveNewColor}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ColorList;
