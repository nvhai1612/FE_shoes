import React, { useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa"; // Dùng icon chọn

function ProductSelectionPage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([
    // Mảng sản phẩm của bạn
    {
      id: 1,
      code: "P001",
      image: "image_url",
      quantity: 10,
      price: 100,
      brand: "Brand A",
      material: "Material X",
      sole: "Rubber",
      size: 42,
      color: "Red",
    },
    {
      id: 2,
      code: "P002",
      image: "image_url",
      quantity: 5,
      price: 150,
      brand: "Brand B",
      material: "Material Y",
      sole: "Leather",
      size: 40,
      color: "Blue",
    },
    // Các sản phẩm khác
  ]);

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingProduct(null);
  };

  const handleSaveChanges = () => {
    // Kiểm tra nếu có thay đổi gì trong thông tin sản phẩm
    if (
      editingProduct?.code &&
      editingProduct?.quantity &&
      editingProduct?.price
    ) {
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id ? editingProduct : product
        )
      );
      handleCloseModal();
    } else {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
    }
  };

  return (
    <div>
      {/* Bảng sản phẩm */}
      <Table
        striped
        bordered
        hover
        style={{
          marginTop: "20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          tableLayout: "fixed", // Đảm bảo bảng có kích thước cố định
        }}
      >
        <thead style={{ backgroundColor: "#F8E7CA" }}>
          <tr>
            <th style={{ padding: "10px", textAlign: "center" }}>STT</th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Mã sản phẩm
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>Ảnh</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Số lượng</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Giá tiền</th>
            <th style={{ padding: "10px", textAlign: "center" }}>
              Thương hiệu
            </th>
            <th style={{ padding: "10px", textAlign: "center" }}>Chất liệu</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Đế giày</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Kích cỡ</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Màu sắc</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product.id}>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {index + 1}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.code}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <img
                    src={product.image}
                    alt={product.code}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.quantity}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.price}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.brand}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.material}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.sole}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.size}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  {product.color}
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleEditClick(product)}
                  >
                    <FaCheckCircle /> {/* Icon chọn */}
                    Chọn
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ textAlign: "center" }}>
                Không có sản phẩm nào.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal chỉnh sửa sản phẩm */}
      {editingProduct && (
        <Modal
          show={showEditModal}
          onHide={handleCloseModal}
          size="lg" // Kích thước modal linh hoạt, có thể chỉnh theo nhu cầu
        >
          <Modal.Header closeButton>
            <Modal.Title>Chọn sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Nội dung modal có thể thêm thông tin chi tiết của sản phẩm nếu cần */}
            <p>
              <strong>Mã sản phẩm:</strong> {editingProduct.code}
            </p>
            <p>
              <strong>Giá tiền:</strong> {editingProduct.price}
            </p>
            <p>
              <strong>Số lượng:</strong> {editingProduct.quantity}
            </p>
            {/* Các thuộc tính khác của sản phẩm */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Chọn sản phẩm
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default ProductSelectionPage;
