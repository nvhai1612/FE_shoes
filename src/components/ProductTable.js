// src/components/ProductTable.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import shoeImage from '../assets/logo.png';

function ProductTable({ products, handleIncrement, handleDecrement, handleDelete }) {
  return (
    <table className="table mt-3">
      <thead>
        <tr style={{ backgroundColor: '#F8E7CA' }}>
          <th>STT</th>
          <th>Ảnh</th>
          <th>Sản phẩm</th>
          <th>Số lượng</th>
          <th className="text-start">Tổng tiền</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id}>
            <td>{index + 1}</td>
            <td>
              <img src={shoeImage} alt={product.name} style={{ width: '50px' }} />
            </td>
            <td>
              {product.name}<br />
              <span style={{ textDecoration: 'line-through', color: 'grey' }}>
                {product.price.toLocaleString()} đ
              </span><br />
              <span style={{ color: 'red', fontWeight: 'bold' }}>
                {product.discountPrice.toLocaleString()} đ
              </span><br />
              Size: {product.size}
            </td>
            <td>
              <button className="btn btn-light btn-sm me-1" onClick={() => handleDecrement(product.id)}>-</button>
              {product.quantity}
              <button className="btn btn-light btn-sm ms-1" onClick={() => handleIncrement(product.id)}>+</button>
            </td>
            <td className="text-start">{(product.discountPrice * product.quantity).toLocaleString()} đ</td>
            <td>
              <Button variant="link"><FaEdit /></Button>
              <Button variant="link" className="text-danger" onClick={() => handleDelete(product.id)}><FaTrash /></Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
