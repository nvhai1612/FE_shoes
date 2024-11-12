import React, { useState } from "react";
import { Button, Container, Row, Col, Nav, Modal } from "react-bootstrap";
import { FaTimesCircle, FaCreditCard } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import shoeImage from "../assets/logo.png";
import CartPage from "../components/CartPage";
import ProductSelection from "../components/ProductSelection";

function PosPage() {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleCreateOrder = () => {
    if (orders.length < 5) {
      const newOrder = {
        id: `order${orders.length + 1}`,
        name: `Đơn hàng ${orders.length + 1}`,
      };
      setOrders([...orders, newOrder]);
      setActiveOrder(newOrder.id);
    } else {
      toast.warn("Tối đa 5 hoá đơn");
    }
  };

  const handleAddProduct = () => {
    setShowAddProductModal(true);
  };

  const handleCloseModal = () => {
    setShowAddProductModal(false);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này không?")) {
      setOrders(orders.filter((order) => order.id !== orderId));
      setActiveOrder(orders.length > 1 ? orders[0].id : null);
    }
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setShowAddProductModal(false);
    toast.success("Sản phẩm đã được thêm vào giỏ hàng");
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
  const shippingFee = 0;
  const discountAmount = totalAmount * 0.2; // Giả sử giảm 20%
  const finalAmount = totalAmount - discountAmount;

  return (
    <Container>
      <h2 className="font-weight-bold mb-3">Bán hàng tại quầy</h2>

      <div className="d-flex justify-content-end align-items-center mb-2">
        <Button
          variant="outline-secondary"
          style={{
            backgroundColor: "#F8E7CA",
            color: "#333",
            borderColor: "#F8E7CA",
          }}
          onClick={handleCreateOrder}
        >
          + Tạo hoá đơn
        </Button>
      </div>

      <Nav variant="tabs">
        {orders.map((order) => (
          <Nav.Item key={order.id}>
            <Nav.Link
              eventKey={order.id}
              active={activeOrder === order.id}
              onClick={() => setActiveOrder(order.id)}
              style={{
                fontWeight: activeOrder === order.id ? "bold" : "normal",
                color: activeOrder === order.id ? "black" : "gray",
                display: "flex",
                alignItems: "center",
              }}
            >
              {order.name}
              <FaTimesCircle
                style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteOrder(order.id);
                }}
              />
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <hr />

      {orders.length > 0 && (
        <div className="d-flex justify-content-end mb-2">
          <Button
            variant="outline-secondary"
            style={{
              backgroundColor: "#F8E7CA",
              color: "#333",
              borderColor: "#F8E7CA",
            }}
            onClick={handleAddProduct}
          >
            + Thêm sản phẩm
          </Button>
        </div>
      )}

      <CartPage cartItems={cartItems} />

      <Row className="mt-4">
        <Col md={12} className="text-end">
          <h5>
            <strong>Tổng tiền: {totalAmount.toLocaleString()} đ</strong>
          </h5>
        </Col>
      </Row>

      <div className="p-3 mt-4 border-top">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Tài khoản</h5>
          <Button
            variant="outline-secondary"
            style={{
              backgroundColor: "#F8E7CA",
              color: "#333",
              borderColor: "#F8E7CA",
            }}
          >
            Chọn tài khoản
          </Button>
        </div>
        <hr />

        <div className="d-flex justify-content-between align-items-center mt-2">
          <p className="mb-0">Tên khách hàng: khách lẻ</p>
          <div>
            <input
              type="text"
              placeholder="PGG613"
              className="form-control d-inline w-auto mx-2"
            />
            <input
              type="number"
              placeholder="Phần trăm giảm"
              className="form-control d-inline w-auto"
            />
          </div>
        </div>

        <div className="d-flex flex-column gap-2">
          <div className="d-flex justify-content-end">
            <span className="text-end" style={{ minWidth: "120px" }}>
              Tiền hàng:
            </span>
            <span className="ml-2">{totalAmount.toLocaleString()} VND</span>
          </div>
          <div className="d-flex justify-content-end">
            <span className="text-end" style={{ minWidth: "120px" }}>
              Phí vận chuyển:
            </span>
            <span className="ml-2">{shippingFee.toLocaleString()} VND</span>
          </div>
          <div className="d-flex justify-content-end">
            <span className="text-end" style={{ minWidth: "120px" }}>
              Giảm giá:
            </span>
            <span className="ml-2">{discountAmount.toLocaleString()} VND</span>
          </div>
          <div className="d-flex justify-content-end font-weight-bold text-danger">
            <span className="text-end" style={{ minWidth: "120px" }}>
              Tổng số tiền:
            </span>
            <span className="ml-2">{finalAmount.toLocaleString()} VND</span>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="outline-secondary"
              style={{
                backgroundColor: "#F8E7CA",
                color: "#333",
                borderColor: "#F8E7CA",
              }}
            >
              <FaCreditCard /> Thanh toán
            </Button>
          </div>
        </div>
      </div>

      <Modal
        show={showAddProductModal}
        onHide={handleCloseModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chọn sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductSelection addToCart={addToCart} />
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </Container>
  );
}

export default PosPage;
