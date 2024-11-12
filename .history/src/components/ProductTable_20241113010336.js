import React from "react";

function ProductTable({ products }) {
  return (
    <table className="table mt-3">
      <thead>
        <tr style={{ backgroundColor: "#F8E7CA" }}>
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
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "50px" }}
              />
            </td>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td className="text-start">
              {(product.price * product.quantity).toLocaleString()} đ
            </td>
            <td>
              <Button variant="link" className="text-danger">
                Xóa
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
