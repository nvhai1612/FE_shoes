import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMethod } from '../../services/request';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ThongTin = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Lấy dữ liệu từ localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));

        // Gửi API để lấy thông tin chi tiết (nếu cần)
        fetch(`/api/users/${storedUser.id}`, {
            headers: {
                Authorization: `Bearer ${storedUser.token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setUserInfo(data))
            .catch((error) => console.error('Error fetching user data:', error));
    }, []);

    if (!userInfo) {
        return <div>Đang tải...</div>;
    }

    return (
        <div>
            <h1>Quản lý thông tin</h1>
            <p>Tên tài khoản: {userInfo.name}</p>
            <p>Email: {userInfo.email}</p>
            <p>Ngày tạo: {userInfo.createdAt}</p>
        </div>
    );
};

export default ThongTin;