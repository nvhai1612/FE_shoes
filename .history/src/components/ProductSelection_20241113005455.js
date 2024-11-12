import React, { useState } from "react";
import { Table, Form, Row, Col, Modal, Button } from "react-bootstrap";
import { FaFilter, FaRegCircle } from "react-icons/fa";
import ProductTable from "./ProductTable"; // Import ProductTable component

function ProductSelectionPage() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    sole: "",
    size: "",
    color: "",
    material: "",
    brand: "",
    status: "",
  });
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
    // Add more products here
  ];

  const handleSelectChange = (product) => {
    setCurrentProduct(product);
    setQuantity(1);
    setShowModal(true);
  };

  const handleAddToCart = () => {
    const updatedProduct = { ...currentProduct, quantity };
    setSelectedProducts((prev) => [...prev, updatedProduct]);
    setShowModal(false); // Close modal after adding
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    return (
      productName.includes(searchTerm.toLowerCase()) &&
      (filters.sole ? product.sole === filters.sole : true) &&
      (filters.size ? product.size === parseInt(filters.size) : true) &&
      (filters.color ? product.color === filters.color : true) &&
      (filters.material ? product.material === filters.material : true) &&
      (filters.brand ? product.brand === filters.brand : true) &&
      (filters.status ? product.status === filters.status : true)
    );
  });

  return (
    <div>
      {/* ...filter and search section... */}

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
          {filteredProducts.map((product, index) => (
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Product Modal */}
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

      {/* Product Table */}
      <ProductTable products={selectedProducts} />
    </div>
  );
}

export default ProductSelectionPage;
