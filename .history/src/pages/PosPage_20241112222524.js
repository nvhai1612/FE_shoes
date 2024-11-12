import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Nav,
  Modal,
  InputGroup,
  Form,
  Table,
} from "react-bootstrap";
import { FaTimesCircle, FaCreditCard } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductTable from "../components/ProductTable";
import shoeImage from "../assets/logo.png";
import ProductSelection from "../components/ProductSelection";

function PosPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Giày BerryShoes",
      price: 1200000,
      discountPrice: 1000000,
      size: 38,
      quantity: 2,
      image: shoeImage,
    },
    {
      id: 2,
      name: "Giày BerryShoes",
      price: 1200000,
      discountPrice: 1000000,
      size: 39,
      quantity: 1,
      image: shoeImage,
    },
  ]);
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

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

  const handleAddProduct = () => setShowAddProductModal(true);
  const handleCloseModal = () => setShowAddProductModal(false);

  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
    if (activeOrder === orderId)
      setActiveOrder(orders.length > 1 ? orders[0].id : null);
  };

  const handleIncrement = (id) =>
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  const handleDecrement = (id) =>
    setProducts(
      products.map((product) =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  const handleDelete = (id) =>
    setProducts(products.filter((product) => product.id !== id));

  const totalAmount = products.reduce(
    (sum, product) => sum + product.discountPrice * product.quantity,
    0
  );
  const handleProductSelection = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    handleCloseModal();
  };

  const shippingFee = 0;
  const discountAmount = totalAmount * 0.2;
  const finalAmount = totalAmount - discountAmount;

  return (
    <Container>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Bán hàng tại quầy
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Button
          variant="outline-secondary"
          style={{ backgroundColor: "#F8E7CA", color: "#333" }}
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button
            variant="outline-secondary"
            style={{ backgroundColor: "#F8E7CA", color: "#333" }}
            onClick={handleAddProduct}
          >
            + Thêm sản phẩm
          </Button>
        </div>
      )}

      <ProductTable
        products={products}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleDelete={handleDelete}
      />
      <Row className="mt-4">
        <Col md={12} className="text-end">
          <h5>
            <strong>Tổng tiền: {totalAmount.toLocaleString()} đ</strong>
          </h5>
        </Col>
      </Row>

      <div className="p-3 mt-4 border-top">
        {/* Section "Tài khoản", "Tên khách hàng", và "Tổng số tiền" */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5>Tài khoản</h5>
          <Button
            variant="outline-secondary"
            style={{ backgroundColor: "#F8E7CA", color: "#333" }}
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
              style={{ width: "80px", marginLeft: "10px", padding: "5px" }}
            />
            <input
              type="number"
              placeholder="Phần trăm giảm"
              style={{ width: "100px", marginLeft: "10px", padding: "5px" }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span style={{ minWidth: "120px" }}>Tổng số tiền: </span>
            <span
              style={{ marginLeft: "8px", fontWeight: "bold", color: "red" }}
            >
              {finalAmount.toLocaleString()} VND
            </span>
          </div>
          <Button
            variant="outline-secondary"
            style={{ backgroundColor: "#F8E7CA", color: "#333" }}
          >
            <FaCreditCard /> Thanh toán
          </Button>
        </div>
      </div>

      <Modal show={showAddProductModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thêm sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductSelection onSelectProduct={handleProductSelection} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </Container>
  );
}

export default PosPage;
