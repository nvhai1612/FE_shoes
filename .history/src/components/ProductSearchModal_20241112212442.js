// src/components/ProductSearchModal.js
import React from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

function ProductSearchModal({
  show,
  handleClose,
  products,
  handleSelectProduct,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tìm kiếm sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm sản phẩm"
          className="mb-3"
        />
        <Table>
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên</th>
              <th>Mã</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.code}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleSelectProduct(product)}
                  >
                    Chọn
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductSearchModal;
