import React, { useState } from "react";
import { Button } from "react-bootstrap"; // Thêm dòng này
import ProductTable from "../components/ProductTable"; // Import ProductTable

function CartPage() {
  const [cart, setCart] = useState([]);

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
        if (product.id === productId) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      })
      .filter((product) => product.quantity > 0); // Loại bỏ sản phẩm có số lượng 0
    setCart(updatedCart);
  };

  const handleDelete = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  return (
    <div>
      <h1>Giỏ hàng</h1>
      <ProductTable
        products={cart}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default CartPage;
