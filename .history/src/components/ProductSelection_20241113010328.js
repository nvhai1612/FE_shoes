import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaRegCircle } from "react-icons/fa";

function ProductSelectionPage({ addToCart }) {
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const products = [
    {
      id: 1,
      name: "Nike Air Max",
      quantity: 200,
      price: "920.000 VND",
      size: 42,
      color: "Trắng",
      image: "https://via.placeholder.com/50",
    },
    // Các sản phẩm khác...
  ];

  const handleSelectChange = (product) => {
    setCurrentProduct(product);
    setQuantity(1);
    setShowModal(true);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddToCart = () => {
    addToCart(currentProduct, quantity);
    handleModalClose();
  };

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      {products.map((product, index) => (
        <div key={product.id}>
          <h4>{product.name}</h4>
          <button
            onClick={() => handleSelectChange(product)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            <FaRegCircle />
          </button>
        </div>
      ))}

      {/* Modal */}
      {currentProduct && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <p>
                <strong>Sản phẩm:</strong> {currentProduct.name}
              </p>
              <p>
                <strong>Size:</strong> {currentProduct.size}
              </p>
              <p>
                <strong>Màu sắc:</strong> {currentProduct.color}
              </p>
              <div>
                <button onClick={handleDecreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncreaseQuantity}>+</button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ProductSelectionPage;
