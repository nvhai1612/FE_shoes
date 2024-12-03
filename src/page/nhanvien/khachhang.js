import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import {getMethod,postMethodPayload, deleteMethod} from '../../services/request';



const AdminKhachHang = ()=>{
    const [items, setItems] = useState([]);
    useEffect(()=>{
        getUser();
    }, []);

    const getUser = async() =>{
        var response = await getMethod('/api/khachhang')
        var result = await response.json();
        setItems(result)
    };

    async function deleteKhachHang(id){
        var con = window.confirm("Confirm?");
        if (con == false) {
            return;
        }
        const response = await deleteMethod('/api/khachhang/' + id)
        if (response.status < 300) {
            toast.success("Delete thành công!");
            getUser();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
        else{
            toast.warning("Khách hàng đã bị khóa");
        }
    }
    
    
    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-users'></i> Quản lý nhân viên</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div class="search-container">
                    </div>
                    <a href='add-nhan-vien' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách tài khoản</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Mã khách hàng</th>
                                <th>Email</th>
                                <th>Họ tên</th>
                                <th>Ngày sinh</th>
                                <th>Số điện thoại</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                return  <tr>
                                    <td>{item.id}</td>
                                    <td>{item.maKhachHang}</td>
                                    <td>{item.email}</td>
                                    <td>{item.hoVaTen}</td>
                                    <td>{item.ngaySinh}</td>
                                    <td>{item.soDienThoai}</td>
                                    <td class="sticky-col">
                                        {
                                            item.trangThai == 0 ? '':<button onClick={()=>deleteKhachHang(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
                                        }
                                    </td>
                                </tr>
                            }))}
                        </tbody>
                    </table>

                </div>
            </div>

        </>
    );
}

export default AdminKhachHang;