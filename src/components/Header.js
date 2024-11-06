// src/components/Header.js
import React from 'react';

function Header() {
  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <h2>Bán hàng tại quầy</h2>
      <div>
        <button className="btn btn-secondary me-2" style={{ backgroundColor: 'white', color: 'black' }}>Tạo hóa đơn</button>
        <button className="btn btn-secondary" style={{ backgroundColor: 'white', color: 'black' }}>Hóa đơn chờ</button>
      </div>
    </div>
  );
}

export default Header;
