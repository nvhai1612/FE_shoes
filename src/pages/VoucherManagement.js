// src/pages/VoucherManagement
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import VoucherPage from "./discount/VoucherPage";
import AddVoucherPage from "./discount/AddVoucherPage";
import DiscountCampaignPage from "./discount/DiscountCampaignPage";
import AddDiscountCampaignPage from "./discount/AddDiscountCampaign";

function VoucherManagement() {
  return (
    <div>
      {/* Routes cho các route con */}
      <div>
        <Routes>
          <Route path="/phieugiamgia" element={<VoucherPage />} />
          <Route
            path="/phieugiamgia/themphieugiamgia"
            element={<AddVoucherPage />}
          />
          <Route path="/dotgiamgia" element={<DiscountCampaignPage />} />
          <Route
            path="/dotgiamgia/themdotgiamgia"
            element={<AddDiscountCampaignPage />}
          />
        </Routes>

        {/* Outlet để hiển thị các thành phần con */}
        <Outlet />
      </div>
    </div>
  );
}

export default VoucherManagement;
