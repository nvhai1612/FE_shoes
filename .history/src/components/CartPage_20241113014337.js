import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import shoeImage from "../assets/logo.png";

function CartPage() {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Shoe A",
      price: 100000,
      discountPrice: 90000,
      size: 42,
      quantity: 1,
    },
    {
      id: 2,
      name: "Shoe B",
      price: 120000,
      discountPrice: 110000,
      size: 41,
      quantity: 2,
    },
  ]);

  const handleIncrement = (productId) => {
    const updatedCart = cart.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    setCart(updatedCart);
  };

  const handleDecrement = (productId) => {
    const updatedCart = cart
      .map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      })
      .filter((product) => product.quantity > 0);
    setCart(updatedCart);
  };

  const handleDelete = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  // Tính tổng tiền giỏ hàng
  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.discountPrice * product.quantity,
      0
    );
  };

  return (
    <div>
      <h1>Giỏ hàng</h1>
      <table className="table mt-3">
        <thead>
          <tr style={{ backgroundColor: "#F8E7CA" }}>
            <th>STT</th>
            <th>Ảnh</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th className="text-start">Tổng tiền</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={shoeImage}
                  alt={product.name}
                  style={{ width: "50px" }}
                />
              </td>
              <td>
                {product.name}
                <br />
                <span style={{ textDecoration: "line-through", color: "grey" }}>
                  {product.price.toLocaleString()} đ
                </span>
                <br />
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {product.discountPrice.toLocaleString()} đ
                </span>
                <br />
                Size: {product.size}
              </td>
              <td>
                <button
                  className="btn btn-light btn-sm me-1"
                  onClick={() => handleDecrement(product.id)}
                >
                  -
                </button>
                {product.quantity}
                <button
                  className="btn btn-light btn-sm ms-1"
                  onClick={() => handleIncrement(product.id)}
                >
                  +
                </button>
              </td>
              <td className="text-start">
                {(product.discountPrice * product.quantity).toLocaleString()} đ
              </td>
              <td>
                <Button
                  variant="link"
                  className="text-danger"
                  onClick={() => handleDelete(product.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 text-end">
        <h4>Tổng tiền giỏ hàng: {calculateTotal().toLocaleString()} đ</h4>
      </div>
    </div>
  );
}

export default CartPage;
