// ProductSelectionPage.js
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function ProductSelectionPage({ addToCart }) {
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(currentProduct); // Thêm sản phẩm vào giỏ hàng
    }
    setShowModal(false);
  };

  return (
    <div>
      {/* Giả sử bạn đã chọn một sản phẩm nào đó */}
      <Button
        onClick={() => {
          setCurrentProduct({ id: 1, name: "Nike Air Max", price: 100 });
          setShowModal(true);
        }}
      >
        Chọn sản phẩm
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{currentProduct?.name}</p>
          <p>{currentProduct?.price}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddToCart}>
            Thêm vào giỏ hàng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductSelectionPage;
