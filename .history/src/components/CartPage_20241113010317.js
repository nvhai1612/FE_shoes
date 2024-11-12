import React, { useState } from "react";
import ProductSelectionPage from "./ProductSelectionPage";
import ProductTable from "./ProductTable";

function CartPage() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã có, tăng số lượng
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
      setCart([...cart, { ...product, quantity }]);
    }
  };

  return (
    <div>
      <h1>Giỏ hàng</h1>
      <ProductTable products={cart} />
      <ProductSelectionPage addToCart={addToCart} />
    </div>
  );
}

export default CartPage;
