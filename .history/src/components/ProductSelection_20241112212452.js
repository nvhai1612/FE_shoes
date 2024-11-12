import React, { useState } from "react";
import {
  Modal,
  Button,
  Table,
  Form,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";

const ProductSelection = ({ onSelectProduct }) => {
  const [show, setShow] = useState(false);
  const [products] = useState([
    {
      id: 1,
      name: "Balen Grey 2023",
      code: "PD12",
      material: "Dé nhựa",
      category: "Giày lười",
      brand: "Balenciaga",
      color: "Tím",
      size: 41,
      price: 250000,
      discount: 45,
      image: "path-to-image.jpg",
    },
    {
      id: 2,
      name: "Balen Grey 2023",
      code: "PD13",
      material: "Dé nhựa",
      category: "Giày lười",
      brand: "Balenciaga",
      color: "Tím",
      size: 40,
      price: 420000,
      discount: 45,
      image: "path-to-image.jpg",
    },
    {
      id: 3,
      name: "Balen Grey 2023",
      code: "PD11",
      material: "Dé nhựa",
      category: "Giày lười",
      brand: "Balenciaga",
      color: "Tím",
      size: 42,
      price: 550000,
      discount: 45,
      image: "path-to-image.jpg",
    },
  ]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleProductSelection = (product) => {
    onSelectProduct(product);
    handleClose();
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Chọn sản phẩm
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Tìm kiếm sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup className="mb-3">
              <FormControl placeholder="Tìm theo tên sản phẩm, mã và thuộc tính sản phẩm..." />
              <InputGroup.Append>
                <Button variant="outline-secondary">Tìm kiếm</Button>
              </InputGroup.Append>
            </InputGroup>

            <div className="d-flex mb-3">
              <Dropdown className="mr-2">
                <Dropdown.Toggle variant="secondary">
                  Danh mục: Tất cả
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Giày lười</Dropdown.Item>
                  <Dropdown.Item href="#">Giày thể thao</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="mr-2">
                <Dropdown.Toggle variant="secondary">
                  Màu sắc: Tất cả
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Tím</Dropdown.Item>
                  <Dropdown.Item href="#">Đen</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="mr-2">
                <Dropdown.Toggle variant="secondary">
                  Thương hiệu: Tất cả
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Balenciaga</Dropdown.Item>
                  <Dropdown.Item href="#">Nike</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên</th>
                  <th>Mã</th>
                  <th>Chất liệu</th>
                  <th>Thương hiệu</th>
                  <th>Màu sắc</th>
                  <th>Size</th>
                  <th>Giá</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.image} alt={product.name} width="50" />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.code}</td>
                    <td>{product.material}</td>
                    <td>{product.brand}</td>
                    <td>{product.color}</td>
                    <td>{product.size}</td>
                    <td>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "gray",
                        }}
                      >
                        {product.price.toLocaleString()} VND
                      </span>
                      <br />
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        {(
                          product.price *
                          (1 - product.discount / 100)
                        ).toLocaleString()}{" "}
                        VND
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleProductSelection(product)}
                      >
                        Chọn
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductSelection;
