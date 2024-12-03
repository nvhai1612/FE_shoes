import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getMethod,
  deleteMethod,
  postMethodPayload,
  postMethod,
} from "../../services/request";
import Swal from "sweetalert2";
import Select from "react-select";
import giotrong from "../../assest/images/giotrong.png";
import nodata from "../../assest/images/nodata.png";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { formatMoney } from "../../services/money";
import { Modal, Button } from "react-bootstrap";
import { Nav } from "react-bootstrap"; // Import Nav
import { FaTimesCircle } from "react-icons/fa";

const AdminDatTaiQuay = () => {
  const [hoaDonCho, sethoaDonCho] = useState([]);
  const [khachHang, setKhachHang] = useState([]);
  const [chiTietSanPham, setChiTietSanPham] = useState([]);
  const [selectHoaDonCho, setSelectHoaDonCho] = useState(null);
  const [selectKhachHang, setselectKhachHang] = useState({
    id: -1,
    hoVaTen: "Khách lẻ",
    soDienThoai: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hoaDonToDelete, setHoaDonToDelete] = useState(null);

  const handleShowDeleteModal = (hoaDonId) => {
    setHoaDonToDelete(hoaDonId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setHoaDonToDelete(null);
  };

  const [thuongHieu, setThuongHieu] = useState([]);
  const [deGiay, setDeGiay] = useState([]);
  const [chatlieu, setChatLieu] = useState([]);
  const [kichThuoc, setKichThuoc] = useState([]);
  const [mauSac, setMauSac] = useState([]);

  const [selectThuongHieu, setselectThuongHieu] = useState(null);
  const [selectDeGiay, setselectDeGiay] = useState(null);
  const [selectChatlieu, setselectChatlieu] = useState(null);
  const [selectkichThuoc, setselectkichThuoc] = useState(null);
  const [selectmauSac, setselectmauSac] = useState(null);
  const [tongTien, setTongTien] = useState(0);

  useEffect(() => {
    getHoaDonCho();
    getKhachHang();
    getSelect();
    getChiTietSanPham();
  }, []);

  useEffect(() => {
    if (hoaDonCho.length != 0) {
      let id = document.getElementById("an");
      id.style.display = "block";
      console.log("1");
      let anh = document.getElementById("anh");
      anh.style.display = "none";
      console.log("2");
    } else {
      let id = document.getElementById("an");
      id.style.display = "none";
      console.log("1");
      let anh = document.getElementById("anh");
      anh.style.display = "block";
      console.log("2");
    }
  }, [hoaDonCho]);

  async function getSelect() {
    var response = await getMethod("/api/thuong-hieu");
    setThuongHieu(await response.json());
    var response = await getMethod("/api/de-giay");
    setDeGiay(await response.json());
    var response = await getMethod("/api/chat-lieu");
    setChatLieu(await response.json());
    var response = await getMethod("/api/kich-co");
    setKichThuoc(await response.json());
    var response = await getMethod("/api/mau-sac");
    setMauSac(await response.json());
  }

  async function getHoaDonCho() {
    var response = await getMethod("/api/v1/hoa-don/hoa-don-cho");
    var list = await response.json();
    sethoaDonCho(list);
    if (list.length > 0) {
      loadChiTietHdCho(list[0]);
    }
  }

  const [orders, setOrders] = useState([]); // Lưu danh sách hóa đơn
  const [activeOrder, setActiveOrder] = useState(null); // Hóa đơn hiện tại

  async function taoHoaDonCho() {
    var res = await postMethod("/api/v1/hoa-don/tao-hoa-don-cho");

    if (res.status < 300) {
      // Thêm hóa đơn vào danh sách sau khi tạo thành công
      if (orders.length < 5) {
        const newOrder = {
          id: `order${orders.length + 1}`,
          name: `Đơn hàng ${orders.length + 1}`,
        };

        // Cập nhật state orders bằng cách sử dụng callback để đảm bảo trạng thái đúng
        setOrders((prevOrders) => {
          const updatedOrders = [...prevOrders, newOrder]; // Tạo danh sách mới với đơn hàng mới
          setActiveOrder(newOrder.id); // Đặt hóa đơn hiện tại
          return updatedOrders;
        });

        // Hiển thị thông báo thành công và reload lại trang
        Swal.fire({
          title: "Thông báo",
          text: "Tạo hóa đơn chờ thành công!",
          icon: "success",
        }).then(() => {
          // Tải lại trang sau khi tạo hóa đơn
          window.location.reload();
        });
      } else {
        toast.warn("Tối đa 5 hoá đơn");
      }
    } else if (res.status === 417) {
      // Xử lý lỗi khi tạo hóa đơn
      const result = await res.json();
      toast.warning(result.defaultMessage); // Hiển thị thông báo lỗi
    }
  }

  async function deleteHoaDon() {
    if (!hoaDonToDelete) return;

    const response = await deleteMethod(
      "/api/v1/hoa-don/xoa-don-cho?idHoaDon=" + hoaDonToDelete
    );
    if (response.status < 300) {
      toast.success("Xóa thành công!");
      window.location.reload();
    } else if (response.status === 417) {
      const result = await response.json();
      toast.warning(result.defaultMessage);
    }

    handleCloseDeleteModal();
  }

  async function loadChiTietHdCho(item) {
    var response = await getMethod("/api/v1/hoa-don/find-by-id?id=" + item.id);
    var result = await response.json();
    setSelectHoaDonCho(result);
    if (result.khachHang != null) setselectKhachHang(result.khachHang);
    else setselectKhachHang({ id: -1, hoVaTen: "Khách lẻ", soDienThoai: "" });
    var tong = 0;
    for (var i = 0; i < result.hoaDonChiTiets.length; i++) {
      tong =
        Number(tong) +
        Number(
          result.hoaDonChiTiets[i].soLuong * result.hoaDonChiTiets[i].giaSanPham
        );
    }
    setTongTien(tong);
  }

  async function getKhachHang() {
    var response = await getMethod("/api/khachhang");
    var list = await response.json();
    var arr = [{ id: -1, hoVaTen: "Khách lẻ", soDienThoai: "" }];
    arr = arr.concat(list);
    setKhachHang(arr);
  }

  async function CapNhatKhachHang() {
    var res = await postMethod(
      "/api/v1/hoa-don/cap-nhat-khach-hang?idKhachHang=" +
        selectKhachHang.id +
        "&idHoaDon=" +
        selectHoaDonCho.id
    );
    if (res.status < 300) {
      toast.success("Cập nhật khách hàng thành công");
      // var result = await res.json();
      loadChiTietHdCho(selectHoaDonCho);
    } else {
      toast.error("Thất bại");
    }
  }

  async function getChiTietSanPham() {
    var payload = {
      thuongHieuId: selectThuongHieu == null ? null : selectThuongHieu.id,
      chatLieuId: selectChatlieu == null ? null : selectChatlieu.id,
      deGiayId: selectDeGiay == null ? null : selectDeGiay.id,
      mauSacId: selectmauSac == null ? null : selectmauSac.id,
      kichThuocId: selectkichThuoc == null ? null : selectkichThuoc.id,
    };
    var response = await postMethodPayload(
      "/api/san-pham-chi-tiet/public/loc-chi-tiet-san-pham-list",
      payload
    );
    setChiTietSanPham(await response.json());
  }

  async function handleAddChiTietHoaDon(event) {
    event.preventDefault();
    var soluong = event.target.elements.soluong.value;
    var chitietsp = event.target.elements.chitietsp.value;
    const res = await postMethod(
      "/api/hoa-don-chi-tiet/them-vao-hoa-don?hoaDonId=" +
        selectHoaDonCho.id +
        "&chiTietSp=" +
        chitietsp +
        "&soLuong=" +
        soluong
    );
    if (res.status < 300) {
      toast.success("Thành công!");
      loadChiTietHdCho(selectHoaDonCho);
    }
    if (res.status == 417) {
      var result = await res.json();
      toast.error(result.defaultMessage);
    }
  }

  async function deleteChiTiet(id) {
    const response = await deleteMethod(
      "/api/hoa-don-chi-tiet/xoa-chi-tiet-don-cho?id=" + id
    );
    if (response.status < 300) {
      toast.success("Xóa thành công!");
      loadChiTietHdCho(selectHoaDonCho);
    }
    if (response.status == 417) {
      var result = await response.json();
      toast.warning(result.defaultMessage);
    }
  }

  async function xacNhanDat() {
    var con = window.confirm("Xác nhận, hành động không thể quay lại?");
    if (con == false) {
      return;
    }
    const response = await postMethod(
      "/api/v1/hoa-don/xac-nhan-dat-tai-quay?idHoaDon=" + selectHoaDonCho.id
    );
    if (response.status < 300) {
      Swal.fire({
        title: "Thông báo",
        text: "Thành công!",
        preConfirm: () => {
          window.location.reload();
        },
      });
    }
    if (response.status == 417) {
      var result = await response.json();
      toast.warning(result.defaultMessage);
    }
  }

  return (
    <div style={{ marginBottom: "150px" }}>
      {/* Header */}
      <div className="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
        <strong className="text-left">
          <i className="fa fa-list"></i> Bán hàng tại quầy
        </strong>
        <div className="search-wrapper d-flex align-items-center">
          <div className="search-container"></div>
          <Button
            className="btn btn-primary"
            onClick={taoHoaDonCho} // Tạo hóa đơn mới
          >
            + Tạo hoá đơn
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Nav variant="tabs">
        {hoaDonCho.map((item, index) => (
          <Nav.Item key={item.id}>
            <Nav.Link
              eventKey={item.id}
              active={activeOrder === item.id}
              onClick={(e) => {
                if (e.target !== e.currentTarget) return; // Ngăn chặn click vào biểu tượng xóa
                setActiveOrder(item.id); // Chuyển tab đang chọn
                loadChiTietHdCho(item); // Gọi hàm loadChiTietHdCho với item của tab đang chọn
              }}
              style={{
                fontWeight: activeOrder === item.id ? "bold" : "normal",
                color: activeOrder === item.id ? "black" : "gray",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Custom tên tab hiển thị */}
              {`Đơn hàng ${index + 1} + HĐ ${item.id}`}
              {/* Icon xóa - Giống phần xóa trong bảng */}
              <FaTimesCircle
                style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation(); // Ngăn chặn click ngoài ý muốn
                  handleShowDeleteModal(item.id); // Gọi hàm xóa và hiển thị modal xác nhận
                }}
              />
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <hr />

      <div
        id="anh"
        style={{
          margin: "12.5rem",
        }}
      >
        <img className="imganhnodata" src={nodata} />
      </div>

      <div id="an">
        <div className="dssanphamhoadon">
          <div className="d-flex">
            <strong>Thông tin sản phẩm</strong>
            <strong className="mahdcho">{selectHoaDonCho?.maHoaDon}</strong>
            <strong className="mahdcho">{selectHoaDonCho?.ngayTao}</strong>
            <button
              data-bs-toggle="modal"
              data-bs-target="#addcate"
              className="btn btn-primary btnthemsanphamhd"
            >
              Chọn sản phẩm
            </button>
          </div>
        </div>
        <div className="listSpChon">
          {selectHoaDonCho?.hoaDonChiTiets.length == 0 ? (
            <div className="divrong">
              <img className="imganhgiohangrong" src={giotrong} />
            </div>
          ) : (
            <div className="divlistspct">
              <table className="table table-borderd">
                <tr>
                  <th>STT</th>
                  <th>Ảnh</th>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Tổng tiền</th>
                  <th>Thao tác</th>
                </tr>
                {selectHoaDonCho?.hoaDonChiTiets.map((item, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={
                            item.sanPhamChiTiet.anhs.length > 0
                              ? item.sanPhamChiTiet.anhs[0].tenAnh
                              : item.sanPhamChiTiet.sanPham.anh
                          }
                          className="imgtable"
                        />
                      </td>
                      <td>
                        {item.sanPhamChiTiet.sanPham?.maSanPham} -{" "}
                        {item.sanPhamChiTiet.sanPham?.tenSanPham}
                        <br />
                        Chất liệu:{" "}
                        {item.sanPhamChiTiet.sanPham.chatLieu.tenChatLieu}
                        <br />
                        Đế giày: {item.sanPhamChiTiet.sanPham.deGiay.tenDeGiay}
                        <br />
                        Thương hiệu:{" "}
                        {item.sanPhamChiTiet.sanPham.thuongHieu.tenThuongHieu}
                        <br />
                        Kích thước: {item.sanPhamChiTiet.kichCo.tenKichCo}
                        <br />
                        Màu sắc: {item.sanPhamChiTiet.mauSac.tenMauSac}{" "}
                        <span
                          class="square"
                          style={{
                            background: item.sanPhamChiTiet.mauSac.maMauSac,
                          }}
                        ></span>
                      </td>
                      <td>
                        <input
                          defaultValue={item.soLuong}
                          className="inputtaiquay"
                          type="number"
                        />
                      </td>
                      <td>{formatMoney(item.sanPhamChiTiet.giaTien)}</td>
                      <td>
                        {formatMoney(
                          item.sanPhamChiTiet.giaTien * item.soLuong
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => deleteChiTiet(item.id)}
                          class="delete-btn"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="dssanphamhoadon">
              <div className="d-flex">
                <strong>Thông tin khách hàng</strong>
                <strong className="mahdcho">{selectHoaDonCho?.maHoaDon}</strong>
                <strong className="mahdcho">{selectHoaDonCho?.ngayTao}</strong>
              </div>
              <div className="row top30">
                <div className="col-sm-7">
                  <Select
                    className="select-container selectheader"
                    options={khachHang}
                    value={selectKhachHang}
                    onChange={setselectKhachHang}
                    getOptionLabel={(option) =>
                      option.hoVaTen + " - " + option.soDienThoai
                    }
                    getOptionValue={(option) => option.id}
                    placeholder="Chọn khách hàng"
                  />
                </div>
                <div className="col-sm-5">
                  <button
                    onClick={() => CapNhatKhachHang()}
                    className="btn btn-primary"
                  >
                    Chọn khách hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="d-flex">
              <strong>Thông tin thanh toán</strong>
              <strong className="mahdcho">{selectHoaDonCho?.maHoaDon}</strong>
              <strong className="mahdcho">{selectHoaDonCho?.ngayTao}</strong>
            </div>
            <br />
            <br />
            <table className="table">
              <tr>
                <th>Tiền hàng</th>
                <th>{formatMoney(tongTien)}</th>
              </tr>
            </table>
            <button
              onClick={() => xacNhanDat()}
              disabled={tongTien == 0}
              className="btn btn-primary"
            >
              Xác nhận đặt hàng
            </button>
          </div>
        </div>

        <div
          class="modal fade"
          id="addcate"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="false"
        >
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Chọn sản phẩm{" "}
                  <strong className="mahdcho">
                    Mã HD: {selectHoaDonCho?.maHoaDon}
                  </strong>
                  <strong className="mahdcho">
                    {selectHoaDonCho?.ngayTao}
                  </strong>
                </h5>{" "}
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="row">
                  <div className="col-lg-20p col-sm-3">
                    <label className="lb-form">Chọn thương hiệu</label>
                    <Select
                      options={thuongHieu}
                      onChange={setselectThuongHieu}
                      getOptionLabel={(option) => option.tenThuongHieu}
                      getOptionValue={(option) => option.id}
                    />
                  </div>
                  <div className="col-lg-20p col-sm-3">
                    <label className="lb-form">Chọn chất liệu</label>
                    <Select
                      options={chatlieu}
                      onChange={setselectChatlieu}
                      getOptionLabel={(option) => option.tenChatLieu}
                      getOptionValue={(option) => option.id}
                    />
                  </div>
                  <div className="col-lg-20p col-sm-3">
                    <label className="lb-form">Chọn đế giày</label>
                    <Select
                      options={deGiay}
                      onChange={setselectDeGiay}
                      getOptionLabel={(option) => option.tenDeGiay}
                      getOptionValue={(option) => option.id}
                    />
                  </div>
                  <div className="col-lg-20p col-sm-3">
                    <label className="lb-form">Chọn màu sắc</label>
                    <Select
                      options={mauSac}
                      onChange={setselectmauSac}
                      getOptionLabel={(option) => option.tenMauSac}
                      getOptionValue={(option) => option.id}
                    />
                  </div>
                  <div className="col-lg-20p col-sm-3">
                    <label className="lb-form">Chọn kích thước</label>
                    <Select
                      options={kichThuoc}
                      onChange={setselectkichThuoc}
                      getOptionLabel={(option) => option.tenKichCo}
                      getOptionValue={(option) => option.id}
                    />
                  </div>
                  <div className="col-sm-3">
                    <br />
                    <button
                      onClick={getChiTietSanPham}
                      className="btn btn-primary form-control"
                    >
                      Lọc sản phẩm
                    </button>
                  </div>
                  <div className="col-sm-2">
                    <br />
                    <button
                      onClick={getChiTietSanPham}
                      className="btn btn-primary form-control"
                    >
                      Làm mới
                    </button>
                  </div>
                </div>
                <br />
                <br />
                <div className="dsChitietsp">
                  <table className="table table-bordered">
                    <tr>
                      <th>STT</th>
                      <th>Sản phẩm</th>
                      <th>Giá bán</th>
                      <th>Hành động</th>
                    </tr>
                    {chiTietSanPham.map((item, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            {item.sanPham?.maSanPham} -{" "}
                            {item.sanPham?.tenSanPham}
                            <br />
                            Chất liệu: {item.sanPham.chatLieu.tenChatLieu}
                            <br />
                            Đế giày: {item.sanPham.deGiay.tenDeGiay}
                            <br />
                            Thương hiệu: {item.sanPham.thuongHieu.tenThuongHieu}
                            <br />
                            Kích thước: {item.kichCo.tenKichCo}
                            <br />
                            Màu sắc: {item.mauSac.tenMauSac}{" "}
                            <span
                              class="square"
                              style={{ background: item.mauSac.maMauSac }}
                            ></span>
                          </td>
                          <td>{formatMoney(item.giaTien)}</td>
                          <td>
                            <form onSubmit={handleAddChiTietHoaDon}>
                              <input
                                name="chitietsp"
                                type="hidden"
                                value={item.id}
                              />
                              <input
                                name="soluong"
                                defaultValue={1}
                                min={1}
                                max={item.soLuong}
                                className="inputtaiquay"
                              />
                              <button className="btn btn-primary btnthemhdct">
                                Thêm
                              </button>
                            </form>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
            <Modal
              show={showDeleteModal}
              onHide={handleCloseDeleteModal}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Xác nhận xóa</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Bạn có chắc chắn muốn xóa hóa đơn này không?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                  Hủy
                </Button>
                <Button variant="danger" onClick={deleteHoaDon}>
                  Xóa
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDatTaiQuay;
