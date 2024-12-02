import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { getMethod, uploadSingleFile, uploadMultipleFile, postMethodPayload } from '../../services/request';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';


var token = localStorage.getItem("token");
var linkbanner = '';
const AdminAddKhachHang = () => {
    const [item, setItem] = useState(null);
    const [label, setLabel] = useState("Thêm khách hàng");
    useEffect(() => {
        const getKhachHang = async () => {
            var uls = new URL(document.URL)
            var id = uls.searchParams.get("id");
            if (id != null) {
                setLabel("Cập nhật thông tin khách hàng")
                var response = await getMethod('/api/khachhang/' + id);
                var result = await response.json();
                setItem(result)
                linkbanner = result.anh
            }
        };
        getKhachHang();
    }, []);


    async function handleAddKhachHang(event) {

        event.preventDefault();

        // Lấy dữ liệu từ form
        const maKhachHang = event.target.elements.makh.value.trim();
        const hoVaTen = event.target.elements.hoten.value.trim();
        const gioiTinh = event.target.elements.gioitinh.value;
        const ngaySinh = event.target.elements.ngsinh.value;
        const soDienThoai = event.target.elements.Sdt.value.trim();
        const email = event.target.elements.email.value.trim();
        const taiKhoan = event.target.elements.taiKhoan.value.trim();
        const password = event.target.elements.password.value;
        const repassword = event.target.elements.repassword.value;
        const trangThai = event.target.elements.trangThai.value.trim();

        // Kiểm tra trống từng trường
        if (!maKhachHang) {
            toast.error("Mã KH Không đc để trống");
            return;
        }
        if (!hoVaTen) {
            toast.error("Họ tên không được để trống");
            return;
        }
        if (!gioiTinh) {
            toast.error("Gtinh không được để trống");
            return;
        }
        if (!ngaySinh) {
            toast.error("Ngày sinh không được để trống");
            return;
        }
        if (!soDienThoai) {
            toast.error("Sđt không được để trống");
            return;
        }
        if (!email) {
            toast.error("Email không được để trống");
            return;
        }
        if (!trangThai) {
            toast.error("Trạng thái không được để trống");
            return;
        }
        // Kiểm tra trùng số điện thoại và email qua API
        try {
            const phoneExistsResponse = await getMethod(`/api/khachhang/exists/soDienThoai?soDienThoai=${soDienThoai}`);
            const emailExistsResponse = await getMethod(`/api/khachhang/exists/email?email=${email}`);

            const phoneExists = await phoneExistsResponse.json();
            const emailExists = await emailExistsResponse.json();

            if (phoneExists && (!item || item?.soDienThoai !== soDienThoai)) {
                toast.error("Số điện thoại đã tồn tại.");
                return;
            }

            if (emailExists && (!item || item?.email !== email)) {
                toast.error("Email đã tồn tại.");
                return;
            }
        } catch (error) {
            toast.error("Lỗi khi kiểm tra thông tin khách hàng.");
            return;
        }

        event.preventDefault();
        if (event.target.elements.password.value != event.target.elements.repassword.value) {
            toast.error("Mật khẩu không trùng khớp");
            return;
        }
        var user = JSON.parse(localStorage.getItem("user"))
        var ims = await uploadSingleFile(document.getElementById("imgbanner"))
        if (ims != null) {
            linkbanner = ims
        }
        const payload = {
            maKhachHang: event.target.elements.makh.value,
            anh: linkbanner,
            hoVaTen: event.target.elements.hoten.value,
            ngaySinh: event.target.elements.ngsinh.value,
            soDienThoai: event.target.elements.Sdt.value,
            gioiTinh: event.target.elements.gioitinh.value,
            email: event.target.elements.email.value,
            taiKhoan: event.target.elements.taiKhoan.value,
            matKhau: event.target.elements.password.value,
            nguoiTao: user.maNhanVien,
            nguoiCapNhat: user.maNhanVien,
            trangThai: event.target.elements.trangThai.value,
        };
        if (item != null) {
            payload.nguoiTao = item.nguoiTao
        }
        var url = '/api/khachhang';
        if (item != null) {
            url += '/' + item.id
        }
        const res = await postMethodPayload(url, payload)
        if (res.status < 300) {
            toast.success('Thành công!');
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = 'khach-hang'
        }
        if (res.status == 417) {
            var result = await res.json()
            toast.error(result.defaultMessage);
        }
        if (res.status > 300) {
            toast.error("Thất bại");
        }
    };

    return (
        <div>
            <div class="col-sm-12 header-sps">
                <div class="title-add-admin">
                    <h4>{label}</h4>
                </div>
            </div>
            <div class="col-sm-12">
                <form onSubmit={handleAddKhachHang} class="form-add row">
                    <div class="col-sm-5">
                        <label class="lb-form">Mã khách hàng</label>
                        <input name='makh' defaultValue={item?.maKhachHang} class="form-control" />

                        <label class="lb-form">Họ tên</label>
                        <input name='hoten' defaultValue={item?.hoVaTen} class="form-control" />

                        <label class="lb-form">Giới tính</label>
                        <select defaultValue={item?.gioiTinh} name='gioitinh' class="form-control">
                            <option selected={item?.gioiTinh == true} value={true}>Nam</option>
                            <option selected={item?.gioiTinh == false} value={false}>Nữ</option>
                        </select>

                        <label class="lb-form">Ngày sinh</label>
                        <input name='ngsinh' defaultValue={item?.ngaySinh} type='date' class="form-control" />

                        <label class="lb-form">Số điện thoại</label>
                        <input name='Sdt' defaultValue={item?.soDienThoai} class="form-control" />

                        <br />
                        <button class="form-control btn btn-primary">{label}</button>
                    </div>
                    <div className='col-sm-5'>
                        <label class="lb-form">Ảnh</label>
                        <input id='imgbanner' type='file' class="form-control" />

                        <label class="lb-form">Email</label>
                        <input name='email' defaultValue={item?.email} class="form-control" />

                        <label class="lb-form">Tài khoản</label>
                        <input name='taiKhoan' defaultValue={item?.taiKhoan} class="form-control" />

                        <label class="lb-form">Trạng thái</label>
                        <input name='trangThai' defaultValue={item?.trangThai} class="form-control" />


                        <label class="lb-form">Mật khẩu</label>
                        <input name='password' required id="pass" type="password" class="form-control" />

                        <label class="lb-form">Nhắc lại mật khẩu</label>
                        <input name='repassword' required id="repass" type="password" class="form-control" />
                    </div>
                </form>
            </div>
        </div>
    );
}


export default AdminAddKhachHang;