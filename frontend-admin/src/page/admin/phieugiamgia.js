import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMethod ,postMethodPayload, deleteMethod} from '../../services/request';
import { formatMoney} from '../../services/money';
import Swal from 'sweetalert2';



const AdminPhieuGiamGia = ()=>{
    const [items, setItems] = useState([]);
    useEffect(()=>{
        getPhieuGiamGia();
    }, []);


    async function getPhieuGiamGia() {
        var response = await getMethod('/api/phieu-giam-gia');
        var result = await response.json();
        setItems(result)
    }

    async function deletePhieuGiamGia(id){
        var con = window.confirm("Confirm?");
        if (con == false) {
            return;
        }
        const response = await deleteMethod('/api/phieu-giam-gia/' + id)
        if (response.status < 300) {
            toast.success("Delete success!");
            getPhieuGiamGia();
        }
        if (response.status == 417) {
            var result = await response.json()
            toast.warning(result.defaultMessage);
        }
    }


    return (
        <>
            <div class="headerpageadmin d-flex justify-content-between align-items-center p-3 bg-light border">
                <strong class="text-left"><i className='fa fa-list'></i> Quản Lý Phiếu Giảm Giá</strong>
                <div class="search-wrapper d-flex align-items-center">
                    <div class="search-container">
                    </div>
                    <a href='add-khuyen-mai' class="btn btn-primary ms-2"><i className='fa fa-plus'></i></a>
                </div>
            </div>
            <div class="tablediv">
                <div class="headertable">
                    <span class="lbtable">Danh sách phiếu giảm giá</span>
                </div>
                <div class="divcontenttable">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Mã code</th>
                                <th>Tên phiếu</th>
                                <th>Giảm tối đa</th>
                                <th>Giá trị giảm</th>
                                <th>Đơn tối thiểu</th>
                                <th>Số lượng</th>
                                <th>Loại phiếu</th>
                                <th>Thời gian</th>
                                <th class="sticky-col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item=>{
                                    return  <tr>
                                    <td>{item.id}</td>
                                    <td>{item.maCode}</td>
                                    <td>{item.tenPhieu}</td>
                                    <td>{formatMoney(item.giaTriGiamToiDa)}</td>
                                    <td>{item.loaiPhieu == true? formatMoney(item.giaTriGiam): item.giaTriGiam +'%'}</td>
                                    <td>{formatMoney(item.donToiThieu)}</td>
                                    <td>{item.soLuong}</td>
                                    <td>{item.loaiPhieu == true?'Giảm tiền':'giảm %'}</td>
                                    <td>{item.ngayBatDau} - {item.ngayKetThuc}</td>
                                    <td class="sticky-col">
                                        <a href={'add-khuyen-mai?id='+item.id} class="edit-btn"><i className='fa fa-edit'></i></a>
                                        <button onClick={()=>deletePhieuGiamGia(item.id)} class="delete-btn"><i className='fa fa-trash'></i></button>
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

export default AdminPhieuGiamGia;