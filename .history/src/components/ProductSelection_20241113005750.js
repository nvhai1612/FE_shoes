import React, { useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { FaRegCircle } from "react-icons/fa";
import ProductTable from "./ProductTable"; // Import ProductTable

function ProductSelectionPage() {
  const [selectedProducts, setSelectedProducts] = useState([]); // Giỏ hàng
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const products = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 920000,
      discountPrice: 800000,
      quantity: 200,
      brand: "Nike",
      material: "Da",
      sole: "Cao su",
      size: 42,
      color: "Trắng",
      image: "https://via.placeholder.com/50",
      status: "Còn hàng",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 820000,
      discountPrice: 700000,
      quantity: 150,
      brand: "Adidas",
      material: "Vải",
      sole: "Cao su",
      size: 41,
      color: "Đen",
      image: "https://via.placeholder.com/50",
      status: "Còn hàng",
    },
    // Thêm các sản phẩm khác vào đây
  ];

  const handleSelectProduct = (product) => {
    setCurrentProduct(product);
    setQuantity(1);
    setShowModal(true); // Hiển thị modal
  };

  const handleAddToCart = () => {
    const productToAdd = { ...currentProduct, quantity };
    setSelectedProducts((prev) => [...prev, productToAdd]);
    setShowModal(false); // Đóng modal sau khi thêm
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      {/* Bảng hiển thị các sản phẩm */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>STT</th>
            <th>Ảnh</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Thêm</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>
                <button
                  onClick={() => handleSelectProduct(product)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                >
                  <FaRegCircle />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal để chọn thêm sản phẩm vào giỏ hàng */}
      {currentProduct && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Sản phẩm:</strong> {currentProduct.name}
            </p>
            <p>
              <strong>Chất liệu:</strong> {currentProduct.material}
            </p>
            <p>
              <strong>Đế giày:</strong> {currentProduct.sole}
            </p>
            <p>
              <strong>Màu sắc:</strong> {currentProduct.color}
            </p>
            <p>
              <strong>Thương hiệu:</strong> {currentProduct.brand}
            </p>
            <p>
              <strong>Size:</strong> {currentProduct.size}
            </p>
            <p>
              <strong>Số lượng còn lại:</strong> {currentProduct.quantity}
            </p>
            <div>
              <button onClick={() => setQuantity(quantity - 1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
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

      {/* Giỏ hàng: hiển thị bảng sản phẩm đã chọn */}
      <ProductTable products={selectedProducts} />
    </div>
  );
}

export default ProductSelectionPage;
