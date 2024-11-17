import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import EmployeePage from "./account/EmployeePage";
import CustomerPage from "./account/CustomerPage";
import AddEmployeePage from "./account/AddEmployeePage";
import AddCustomerPage from "./account/AddCustomerPage";
import CustomerInfo from "./account/CustomerInfo";
import EmployeeInfo from "./account/EmployeeInfo";

function AccountManagement() {
  return (
    <div>
      <Routes>
        <Route path="/nhanvien" element={<EmployeePage />} />
        <Route path="/nhanvien/themnhanvien" element={<AddEmployeePage />} />
        <Route
          path="/nhanvien/thongtinnhanvien/:employeeId"
          element={<EmployeeInfo />}
        />
        <Route path="/khachhang" element={<CustomerPage />} />
        <Route path="/khachhang/themkhachhang" element={<AddCustomerPage />} />
        <Route
          path="/khachhang/thongtinkhachhang/:customerId"
          element={<CustomerInfo />}
        />
      </Routes>
      <Outlet />
    </div>
  );
}

export default AccountManagement;
