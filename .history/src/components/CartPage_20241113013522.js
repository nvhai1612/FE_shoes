import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import shoeImage from "../assets/logo.png";

function CartPage() {
  const [cart, setCart] = useState([]);

  const updateQuantity = (productId, change) => {
    const updatedCart = cart
      .map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + change };
        }
        return product;
      })
      .filter((product) => product.quantity > 0); // Loại bỏ sản phẩm có số lượng 0

    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
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
                  onClick={() => updateQuantity(product.id, -1)}
                >
                  -
                </button>
                {product.quantity}
                <button
                  className="btn btn-light btn-sm ms-1"
                  onClick={() => updateQuantity(product.id, 1)}
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
                  onClick={() => removeFromCart(product.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartPage;
