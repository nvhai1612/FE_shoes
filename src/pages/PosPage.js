// src/pages/PosPage.js
import React, { useState } from 'react';
import { Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { FaTimesCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductTable from '../components/ProductTable';

function PosPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Giày BerryShoes', price: 1200000, discountPrice: 1000000, size: 38, quantity: 2 },
    { id: 2, name: 'Giày BerryShoes', price: 1200000, discountPrice: 1000000, size: 39, quantity: 1 },
  ]);
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  const handleCreateOrder = () => {
    if (orders.length < 5) {
      const newOrder = { id: `order${orders.length + 1}`, name: `Đơn hàng ${orders.length + 1}` };
      setOrders([...orders, newOrder]);
      setActiveOrder(newOrder.id);
    } else {
      toast.warn('Tối đa 5 hoá đơn');
    }
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
    if (activeOrder === orderId) setActiveOrder(orders.length > 1 ? orders[0].id : null);
  };

  const handleIncrement = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    ));
  };

  const handleDecrement = (id) => {
    setProducts(products.map(product =>
      product.id === id && product.quantity > 0 ? { ...product, quantity: product.quantity - 1 } : product
    ));
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const totalAmount = products.reduce((sum, product) => sum + product.discountPrice * product.quantity, 0);

  return (
    <Container>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Bán hàng tại quầy</h2>

      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <Button 
          variant="outline-secondary" 
          style={{ backgroundColor: '#F8E7CA', color: '#333', borderColor: '#F8E7CA' }}
          onClick={handleCreateOrder}
        >
          + Tạo hoá đơn
        </Button>
      </div>

      {/* Thanh tab hóa đơn */}
      <Nav variant="tabs">
        {orders.map((order) => (
          <Nav.Item key={order.id}>
            <Nav.Link
              eventKey={order.id}
              active={activeOrder === order.id}
              onClick={() => setActiveOrder(order.id)}
              style={{
                fontWeight: activeOrder === order.id ? 'bold' : 'normal',
                color: activeOrder === order.id ? 'black' : 'gray',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {order.name}
              <FaTimesCircle
                style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteOrder(order.id);
                }}
              />
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <hr/>

      {/* Khu vực bảng sản phẩm */}
      <ProductTable 
        products={products} 
        handleIncrement={handleIncrement} 
        handleDecrement={handleDecrement} 
        handleDelete={handleDelete} 
      />

      {/* Khu vực tổng tiền */}
      <Row className="mt-4">
        <Col md={12} className="text-end">
          <h5><strong>Tổng tiền: {totalAmount.toLocaleString()} đ</strong></h5>
        </Col>
      </Row>

      {/* Thông tin khách hàng */}
      <div className="p-3 mt-4 border-top">
        <h5>Tài khoản</h5>
        <div className="d-flex justify-content-between align-items-center">
          <p className="mb-0 me-3">Tên khách hàng: khách sĩ</p>
          <div>
            <Button variant="outline-secondary" style={{ backgroundColor: '#F8E7CA', color: '#333', borderColor: '#F8E7CA' }}>
              Chọn tài khoản
            </Button>
            <Button variant="outline-secondary" style={{ backgroundColor: '#F8E7CA', color: '#333', borderColor: '#F8E7CA', marginLeft: '10px' }}>
              Thêm khách hàng
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
}

export default PosPage;
