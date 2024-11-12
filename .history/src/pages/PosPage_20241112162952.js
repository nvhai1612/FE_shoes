import React, { useState } from "react";
import { Button, Container, Row, Col, Nav, Modal } from "react-bootstrap";
import { FaTimesCircle, FaCreditCard } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductTable from "../components/ProductTable";
import shoeImage from "../assets/logo.png";

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

  const handleAddProduct = () => {
    setShowAddProductModal(true);
  };

  const handleCloseModal = () => {
    setShowAddProductModal(false);
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter((order) => order.id !== orderId));
    if (activeOrder === orderId)
      setActiveOrder(orders.length > 1 ? orders[0].id : null);
  };

  const handleIncrement = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handleDecrement = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const totalAmount = products.reduce(
    (sum, product) => sum + product.discountPrice * product.quantity,
    0
  );
  const shippingFee = 0;
  const discountAmount = totalAmount * 0.2; // Giả sử giảm 20%
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
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
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

      <ProductTable
        products={products}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleDelete={handleDelete}
      />

      <div className="p-3 mt-4 border-top">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h5 style={{ marginBottom: "0" }}>Tài khoản</h5>
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

        {/* Section "Tên khách hàng" */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <p className="mb-0">Tên khách hàng: khách lẻ</p>
          <div>
            <input
              type="text"
              placeholder="PGG613"
              style={{
                width: "80px",
                marginLeft: "10px",
                padding: "5px",
                borderRadius: "4px",
                border: "1px solid #ced4da",
              }}
            />
            <input
              type="number"
              placeholder="Phần trăm giảm"
              style={{
                width: "100px",
                marginLeft: "10px",
                padding: "5px",
                borderRadius: "4px",
                border: "1px solid #ced4da",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: "8px",
              textAlign: "right",
            }}
          >
            <span style={{ minWidth: "120px", textAlign: "right" }}>
              Tiền hàng:{" "}
            </span>
            <span style={{ marginLeft: "8px" }}>
              {totalAmount.toLocaleString()} VND
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: "8px",
              textAlign: "right",
            }}
          >
            <span style={{ minWidth: "120px", textAlign: "right" }}>
              Phí vận chuyển:{" "}
            </span>
            <span style={{ marginLeft: "8px" }}>
              {shippingFee.toLocaleString()} VND
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: "8px",
              textAlign: "right",
            }}
          >
            <span style={{ minWidth: "120px", textAlign: "right" }}>
              Giảm giá:{" "}
            </span>
            <span style={{ marginLeft: "8px" }}>
              {discountAmount.toLocaleString()} VND
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              fontWeight: "bold",
              color: "red",
              marginBottom: "8px",
              textAlign: "right",
            }}
          >
            <span style={{ minWidth: "120px", textAlign: "right" }}>
              Tổng số tiền:{" "}
            </span>
            <span style={{ marginLeft: "8px" }}>
              {finalAmount.toLocaleString()} VND
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: "8px",
              textAlign: "right",
            }}
          >
            <span style={{ minWidth: "120px", textAlign: "right" }}>
              Khách thanh toán:{" "}
            </span>
            <span style={{ marginLeft: "8px" }}>
              {finalAmount.toLocaleString()} VND
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
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

      {/* Modal thêm sản phẩm */}
      <Modal show={showAddProductModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm sản phẩm vào đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Nội dung modal tùy chỉnh theo yêu cầu */}
          <p>Điền thông tin sản phẩm mới ở đây...</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              /* Thêm logic thêm sản phẩm */
            }}
          >
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}

export default PosPage;
