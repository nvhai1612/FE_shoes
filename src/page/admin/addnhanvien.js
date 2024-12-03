import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getMethod,
  uploadSingleFile,
  uploadMultipleFile,
  postMethodPayload,
} from "../../services/request";
import React, { useRef } from "react";

var token = localStorage.getItem("token");

var linkbanner = "";
const AdminAddNhanVien = () => {
  const [item, setItem] = useState(null);
  const [label, setLabel] = useState("Thêm nhân viên");
  useEffect(() => {
    const getNhanVien = async () => {
      var uls = new URL(document.URL);
      var id = uls.searchParams.get("id");
      if (id != null) {
        setLabel("Cập nhật thông tin nhân viên");
        var response = await getMethod("/api/nhan-vien/" + id);
        var result = await response.json();
        setItem(result);
        linkbanner = result.anh;
      }
    };
    getNhanVien();
  }, []);

  async function handleAddNhanVien(event) {
    event.preventDefault();
    if (
      event.target.elements.password.value !=
      event.target.elements.repassword.value
    ) {
      toast.error("Mật khẩu không trùng khớp");
      return;
    }
    var user = JSON.parse(localStorage.getItem("user"));
    var ims = await uploadSingleFile(document.getElementById("imgbanner"));
    if (ims != null) {
      linkbanner = ims;
    }
    const payload = {
      maNhanVien: event.target.elements.manv.value,
      anh: linkbanner,
      hoVaTen: event.target.elements.hoten.value,
      ngaySinh: event.target.elements.ngsinh.value,
      gioiTinh: event.target.elements.gioitinh.value,
      queQuan: event.target.elements.queQuan.value,
      cccd: event.target.elements.cccd.value,
      soDienThoai: event.target.elements.Sdt.value,
      email: event.target.elements.email.value,
      taiKhoan: event.target.elements.taiKhoan.value,
      matKhau: event.target.elements.password.value,
      vaiTro: event.target.elements.vaiTro.value,
      nguoiTao: user.maNhanVien,
      nguoiCapNhat: user.maNhanVien,
      trangThai: event.target.elements.trangThai.value,
    };
    if (item != null) {
      payload.nguoiTao = item.nguoiTao;
    }
    var url = "/api/nhan-vien";
    if (item != null) {
      url += "/" + item.id;
    }
    const res = await postMethodPayload(url, payload);
    if (res.status < 300) {
      toast.success("Success!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.href = "user";
    }
    if (res.status == 417) {
      var result = await res.json();
      toast.error(result.defaultMessage);
    }
    if (res.status > 300) {
      toast.error("Thất bại");
    }
  }

  return (
    <div>
      <div class="col-sm-12 header-sps">
        <div class="title-add-admin">
          <h4>{label}</h4>
        </div>
      </div>
      <div class="col-sm-12">
        <form onSubmit={handleAddNhanVien} class="form-add row">
          <div class="col-sm-5">
            <label class="lb-form">Mã nhân viên</label>
            <input
              name="manv"
              defaultValue={item?.maNhanVien}
              class="form-control"
            />

            <label class="lb-form">Họ tên</label>
            <input
              name="hoten"
              defaultValue={item?.hoVaTen}
              class="form-control"
            />

            <label class="lb-form">Giới tính</label>
            <select
              defaultValue={item?.gioiTinh}
              name="gioitinh"
              class="form-control"
            >
              <option selected={item?.gioiTinh == true} value={true}>
                Nam
              </option>
              <option selected={item?.gioiTinh == false} value={false}>
                Nữ
              </option>
            </select>

            <label class="lb-form">Ngày sinh</label>
            <input
              name="ngsinh"
              defaultValue={item?.ngaySinh}
              type="date"
              class="form-control"
            />

            <label class="lb-form">Quê quán</label>
            <input
              name="queQuan"
              defaultValue={item?.queQuan}
              class="form-control"
            />

            <label class="lb-form">Căn cước công dân</label>
            <input name="cccd" defaultValue={item?.cccd} class="form-control" />

            <label class="lb-form">Số điện thoại</label>
            <input
              name="Sdt"
              defaultValue={item?.soDienThoai}
              class="form-control"
            />

            <br />
            <button class="form-control btn btn-primary">{label}</button>
          </div>
          <div className="col-sm-5">
            <label class="lb-form">Ảnh</label>
            <input id="imgbanner" type="file" class="form-control" />

            <label class="lb-form">Email</label>
            <input
              name="email"
              defaultValue={item?.email}
              class="form-control"
            />

            <label class="lb-form">Tài khoản</label>
            <input
              name="taiKhoan"
              defaultValue={item?.taiKhoan}
              class="form-control"
            />

            <label class="lb-form">Trạng thái</label>
            <input
              name="trangThai"
              defaultValue={item?.trangThai}
              class="form-control"
            />

            <label class="lb-form">Vai trò</label>
            <select
              name="vaiTro"
              defaultValue={item?.vaiTro}
              class="form-control"
            >
              <option selected={item?.vaiTro == 1} value={1}>
                Admin
              </option>
              <option selected={item?.vaiTro == 0} value={0}>
                Nhân viên
              </option>
            </select>

            <label class="lb-form">Mật khẩu</label>
            <input
              name="password"
              required
              id="pass"
              type="password"
              class="form-control"
            />

            <label class="lb-form">Nhắc lại mật khẩu</label>
            <input
              name="repassword"
              required
              id="repass"
              type="password"
              class="form-control"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddNhanVien;
