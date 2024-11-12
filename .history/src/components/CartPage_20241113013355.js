import React, { useState, useEffect } from "react";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";

function CartPage() {
  // Giả sử giỏ hàng chứa các sản phẩm với tên, giá, số lượng
  const [cart, setCart] = useState([
    { id: 1, name: "Giày Thể Thao", price: 250000, quantity: 1 },
    { id: 2, name: "Áo Thun Nam", price: 150000, quantity: 2 },
    { id: 3, name: "Quần Jean", price: 350000, quantity: 1 },
  ]);

  // Tính tổng tiền của giỏ hàng
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Hàm xử lý thay đổi số lượng sản phẩm trong giỏ hàng
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) return;
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price.toLocaleString()} VND</td>
              <td>
                <InputGroup>
                  <FormControl
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    min="1"
                  />
                </InputGroup>
              </td>
              <td>{(item.price * item.quantity).toLocaleString()} VND</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          fontWeight: "bold",
          color: "red",
          marginTop: "20px",
        }}
      >
        <span style={{ marginRight: "20px" }}>Tổng tiền: </span>
        <span>{calculateTotal().toLocaleString()} VND</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Button
          variant="outline-secondary"
          style={{ backgroundColor: "#F8E7CA" }}
        >
          Tiến hành thanh toán
        </Button>
      </div>
    </div>
  );
}

export default CartPage;
