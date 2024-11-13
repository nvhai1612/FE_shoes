import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Form,
} from "react-bootstrap";

function InvoiceDetailPage() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const handleShowPaymentModal = () => setShowPaymentModal(true);
  const handleClosePaymentModal = () => setShowPaymentModal(false);
  const handleCancel = () => setShowCancelModal(true);
  const handleCloseCancel = () => setShowCancelModal(false);
  const handleCloseDetail = () => setShowDetailModal(false);
  const handleDetail = () => setShowDetailModal(true);

  return (
    <Container>
      <h2 style={{ fontWeight: "bold", fontSize: "24px" }}>Chi tiết hóa đơn</h2>

      {/* Thanh tiến trình */}
      <div
        className="d-flex justify-content-around align-items-center my-4"
        style={{
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {/* Các bước trạng thái đơn hàng */}
        <div className="text-center">
          <div
            style={{
              backgroundColor: "#28a745",
              borderRadius: "50%",
              padding: "10px",
            }}
          >
            <i
              className="bi bi-file-earmark-text-fill"
              style={{ fontSize: "24px", color: "#fff" }}
            ></i>
          </div>
          <p style={{ fontWeight: "bold", color: "#28a745" }}>Tạo đơn hàng</p>
          <p>9:58:54 CH 21/10/2023</p>
        </div>
        <div style={{ width: "15%", borderTop: "4px solid #28a745" }}></div>
        <div className="text-center">
          <div
            style={{
              backgroundColor: "#28a745",
              borderRadius: "50%",
              padding: "10px",
            }}
          >
            <i
              className="bi bi-ticket-fill"
              style={{ fontSize: "24px", color: "#fff" }}
            ></i>
          </div>
          <p style={{ fontWeight: "bold", color: "#28a745" }}>Chờ xác nhận</p>
          <p>10:00:44 CH 21/10/2023</p>
        </div>
        <div style={{ width: "15%", borderTop: "4px solid #28a745" }}></div>
        <div className="text-center">
          <div
            style={{
              backgroundColor: "#28a745",
              borderRadius: "50%",
              padding: "10px",
            }}
          >
            <i
              className="bi bi-calendar-check"
              style={{ fontSize: "24px", color: "#fff" }}
            ></i>
          </div>
          <p style={{ fontWeight: "bold", color: "#28a745" }}>Chờ giao</p>
          <p>10:00:44 CH 21/10/2023</p>
        </div>
        <div style={{ width: "15%", borderTop: "4px solid #28a745" }}></div>
        <div className="text-center">
          <div
            style={{
              backgroundColor: "#28a745",
              borderRadius: "50%",
              padding: "10px",
            }}
          >
            <i
              className="bi bi-truck"
              style={{ fontSize: "24px", color: "#fff" }}
            ></i>
          </div>
          <p style={{ fontWeight: "bold", color: "#28a745" }}>Đang giao</p>
          <p>10:01:21 CH 21/10/2023</p>
        </div>
        <div style={{ width: "15%", borderTop: "4px solid #28a745" }}></div>
        <div className="text-center">
          <div
            style={{
              backgroundColor: "#28a745",
              borderRadius: "50%",
              padding: "10px",
            }}
          >
            <i
              className="bi bi-check-circle"
              style={{ fontSize: "24px", color: "#fff" }}
            ></i>
          </div>
          <p style={{ fontWeight: "bold", color: "#28a745" }}>Hoàn thành</p>
          <p>10:01:32 CH 21/10/2023</p>
        </div>
      </div>

      {/* Các nút hành động */}
      <Row className="mt-3 d-flex justify-content-between">
        <Col className="text-start">
          <Button variant="danger" className="me-2" onClick={handleCancel}>
            Hủy
          </Button>
          <Button variant="primary">Xác nhận</Button>
        </Col>
        <Col className="text-end">
          <Button variant="secondary" onClick={handleDetail}>
            Chi tiết
          </Button>
        </Col>
      </Row>

      {/* Modal Hủy */}
      <Modal show={showCancelModal} onHide={handleCloseCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Lý do hủy đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="cancelReason">
              <Form.Label>Nhập lý do hủy:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Vui lòng nhập lý do hủy..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCancel}>
            Đóng
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              /* Xử lý hủy đơn hàng */
            }}
          >
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Chi tiết */}
      <Modal show={showDetailModal} onHide={handleCloseDetail}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold", fontSize: "18px" }}>
            Chi tiết đơn hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead style={{ backgroundColor: "#f8f8f8" }}>
              <tr>
                <th>Trạng thái</th>
                <th>Nhân viên xác nhận</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "white" }}>
              <tr>
                <td>Tạo đơn hàng</td>
                <td>Vũ Nguyên Hường</td>
              </tr>
              <tr>
                <td>Đang chờ xác nhận</td>
                <td>Vũ Nguyên Hường</td>
              </tr>
              <tr>
                <td>Chờ giao</td>
                <td>Vũ Nguyên Hường</td>
              </tr>
              <tr>
                <td>abc</td>
                <td>Vũ Nguyên Hường</td>
              </tr>
              <tr>
                <td>done</td>
                <td>Vũ Nguyên Hường</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetail}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Thông tin đơn hàng */}
      <Card className="mb-4 mt-4" style={{ border: "none" }}>
        <Card.Header
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            backgroundColor: "#F8E7CA",
          }}
        >
          Thông tin đơn hàng
        </Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <Table
            striped
            bordered
            hover
            style={{ marginBottom: 0, backgroundColor: "white" }}
          >
            <tbody>
              <tr style={{ backgroundColor: "white" }}>
                <td>Trạng thái:</td>
                <td style={{ color: "red" }}>Hoàn thành</td>
              </tr>
              <tr style={{ backgroundColor: "white" }}>
                <td>Loại đơn hàng:</td>
                <td>Giao hàng</td>
              </tr>
              <tr style={{ backgroundColor: "white" }}>
                <td>Tổng tiền:</td>
                <td>250,000 đ</td>
              </tr>
              <tr style={{ backgroundColor: "white" }}>
                <td>Mã đơn hàng:</td>
                <td>#HD1004</td>
              </tr>
              <tr style={{ backgroundColor: "white" }}>
                <td>Khách hàng:</td>
                <td>Nguyễn Anh Dũng</td>
              </tr>
              <tr style={{ backgroundColor: "white" }}>
                <td>Phí vận chuyển:</td>
                <td>37,401 đ</td>
              </tr>
              <tr style={{ backgroundColor: "white" }}>
                <td>Số điện thoại:</td>
                <td>0123456789</td>
              </tr>
              <tr style={{ backgroundColor: "white" }}>
                <td>Địa chỉ:</td>
                <td>Hà Nội</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Lịch sử thanh toán */}
      <Card className="mb-4" style={{ border: "none" }}>
        <Card.Header
          className="d-flex justify-content-between align-items-center"
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            backgroundColor: "#F8E7CA",
          }}
        >
          <span>Lịch sử thanh toán</span>
          <Button variant="success" size="sm" onClick={handleShowPaymentModal}>
            Xác nhận thanh toán
          </Button>
        </Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <Table
            bordered
            hover
            style={{
              marginBottom: 0,
              backgroundColor: "white",
            }}
          >
            <thead style={{ backgroundColor: "#f8f8f8" }}>
              <tr>
                <th>STT</th>
                <th>Số tiền</th>
                <th>Thời gian</th>
                <th>Phương thức thanh toán</th>
                <th>Nhân viên xác nhận</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "white" }}>
              <tr>
                <td>1</td>
                <td>250,000 đ</td>
                <td>10:02:00 CH 21/10/2023</td>
                <td>Tiền mặt</td>
                <td>Nguyễn Văn A</td>
                <td>Thanh toán tại cửa hàng</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Sản phẩm */}
      <Card className="mb-4" style={{ border: "none" }}>
        <Card.Header
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            backgroundColor: "#F8E7CA",
          }}
        >
          Sản phẩm
        </Card.Header>
        <Card.Body style={{ padding: 0 }}>
          <Table
            bordered
            hover
            style={{ marginBottom: 0, backgroundColor: "white" }}
          >
            <thead style={{ backgroundColor: "#f8f8f8" }}>
              <tr>
                <th>STT</th>
                <th>Ảnh</th>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody style={{ backgroundColor: "white" }}>
              <tr>
                <td>1</td>
                <td>
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Giày thể thao Nike"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>Giày thể thao Nike</td>
                <td>1</td>
                <td style={{ color: "danger" }}>200,000 đ</td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Tất thể thao Adidas"
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>Tất thể thao Adidas</td>
                <td>1</td>
                <td style={{ color: "danger" }}>50,000 đ</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={showPaymentModal} onHide={handleClosePaymentModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="paymentAmount">
              <Form.Label>Số tiền cần thanh toán:</Form.Label>
              <p style={{ fontWeight: "bold", color: "red", fontSize: "24px" }}>
                287,401 đ
              </p>
            </Form.Group>
            <Form.Group controlId="customerAmount">
              <Form.Label>Tiền khách đưa:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Nhập số tiền khách đưa"
              />
            </Form.Group>
            <Form.Group controlId="note" className="mt-3">
              <Form.Label>Ghi chú:</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning">
            <i className="bi bi-cash-stack"></i> Tiền mặt
          </Button>
          <Button variant="secondary">
            <i className="bi bi-bank"></i> Chuyển khoản
          </Button>
          <Button variant="primary" onClick={handleClosePaymentModal}>
            Thanh toán
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default InvoiceDetailPage;
