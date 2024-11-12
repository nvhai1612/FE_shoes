import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Nav,
  ToastContainer,
} from "react-bootstrap";
import { FaTimesCircle, FaCreditCard } from "react-icons/fa";
import ProductTable from "../components/ProductTable";
import ProductSelection from "../components/ProductSelection";
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
  const [showProductSelection, setShowProductSelection] = useState(false);

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
    setShowProductSelection(true);
  };

  const handleCloseProductSelection = () => {
    setShowProductSelection(false);
  };

  return (
    <Container>
      {/* Nút tạo hoá đơn và hiển thị tab hoá đơn */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Button variant="outline-secondary" onClick={handleCreateOrder}>
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteOrder(order.id);
                }}
              />
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Nút thêm sản phẩm */}
      {orders.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button variant="outline-secondary" onClick={handleAddProduct}>
            + Thêm sản phẩm
          </Button>
        </div>
      )}

      <ProductTable products={products} />
      <ToastContainer />

      {/* Gọi modal ProductSelection */}
      <ProductSelection
        show={showProductSelection}
        onHide={handleCloseProductSelection}
      />
    </Container>
  );
}

export default PosPage;
