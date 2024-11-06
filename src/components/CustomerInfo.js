// src/components/CustomerInfo.js
import React from 'react';

function CustomerInfo() {
  return (
    <div className="p-3 mt-4 border-top">
      <h5>Tài khoản</h5>
      {/* Đặt tên khách hàng và nút trong một hàng ngang */}
      <div className="d-flex justify-content-between align-items-center">
        <p className="mb-0 me-3">Tên khách hàng: khách sĩ</p>
        <div>
          <button className="btn btn-secondary me-2" style={{ backgroundColor: 'white', color: 'black' }}>Chọn tài khoản</button>
          <button className="btn btn-secondary" style={{ backgroundColor: 'white', color: 'black' }}>Thêm khách hàng</button>
        </div>
      </div>
    </div>
  );
}

export default CustomerInfo;
