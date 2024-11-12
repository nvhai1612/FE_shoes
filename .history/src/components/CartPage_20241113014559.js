import React, { useState } from "react";
import ProductTable from "./ProductTable"; // Import thành phần ProductTable
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
      <ProductTable
        products={cart}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleDelete={handleDelete}
      />
      <div className="mt-3 text-end">
        <h4>Tổng tiền giỏ hàng: {calculateTotal().toLocaleString()} đ</h4>
      </div>
    </div>
  );
}

export default CartPage;
