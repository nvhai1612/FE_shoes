GO
USE master
GO
DROP DATABASE DATN_BERRYSHOES
GO
CREATE DATABASE DATN_BERRYSHOES
GO
USE DATN_BERRYSHOES
GO
	CREATE TABLE DiaChi (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	IdKhachHang INT NOT NULL,
	TenDuong NVARCHAR(100) NOT NULL,
	XaPhuong NVARCHAR(100) NOT NULL,
	QuanHuyen NVARCHAR(100) NOT NULL,
	TinhThanhPho NVARCHAR(100) NOT NULL,
	TenNguoiNhan NVARCHAR(100) NULL,
	SdtNguoiNhan VARCHAR(30) NULL,
	NgayTao DATETIME DEFAULT GETDATE()  NULL,
	NguoiTao NVARCHAR(100)  NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE()  NULL,
	NguoiCapNhat NVARCHAR(100)  NULL,
	TrangThai INT DEFAULT 0
	)
	GO
	CREATE TABLE PhuongThucThanhToan (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	IdHoaDon INT NOT NULL,
	TenPhuongThuc NVARCHAR(50) NOT NULL,
	MoTa NVARCHAR(MAX) NULL,
	TongTien MONEY NOT NULL,
	MaGiaoDichVnPay VARCHAR(200)  NULL,
	NgayTao DATETIME DEFAULT GETDATE()  NULL,
	NguoiTao NVARCHAR(100)  NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE()  NULL,
	NguoiCapNhat NVARCHAR(100)  NULL,
	TrangThai INT DEFAULT 0
	)
	GO
	CREATE TABLE MauSac (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	MaMauSac VARCHAR(50),
	TenMauSac NVARCHAR(100) NOT NULL,
	NgayTao DATETIME DEFAULT GETDATE()  NULL,
	NguoiTao NVARCHAR(100)  NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE()  NULL,
	NguoiCapNhat NVARCHAR(100)  NULL,
	TrangThai INT DEFAULT 1
	)
	GO
	CREATE TABLE ChatLieu (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	TenChatLieu NVARCHAR(100) NOT NULL,
	NgayTao DATETIME DEFAULT GETDATE() NULL,
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE() NULL,
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai INT DEFAULT 1
	)
	GO
	CREATE TABLE DeGiay (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	TenDeGiay NVARCHAR(100) NOT NULL,
	NgayTao DATETIME DEFAULT GETDATE() NULL,
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE() NULL,
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai INT DEFAULT 1
	)
	GO
	CREATE TABLE ThuongHieu (
	Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL,
	TenThuongHieu NVARCHAR(100) NOT NULL,
	NgayTao DATETIME DEFAULT GETDATE() NULL,
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE() NULL,
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai INT DEFAULT 1
	)
	GO
	CREATE TABLE KichCo (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	TenKichCo NVARCHAR(50) NOT NULL,
	NgayTao DATETIME DEFAULT GETDATE() NULL,
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE() NULL,
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai INT DEFAULT 1
	)
	GO
	CREATE TABLE SanPham (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	IdThuongHieu INT NOT NULL,
	IdChatLieu INT NOT NULL,
	IdDeGiay INT NOT NULL,
	MaSanPham NVARCHAR(MAX) NULL,
	TenSanPham NVARCHAR(300) NOT NULL,
	NgayTao DATETIME DEFAULT GETDATE() NULL,
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE() NULL,
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai INT DEFAULT 1
	)
	GO
	CREATE TABLE SanPhamChiTiet (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	IdSanPham INT NOT NULL,
	IdKichCo INT NOT NULL,
	IdMauSac INT NOT NULL,
	IdDotGiamGia INT NULL,
	MaSanPhamChiTiet NVARCHAR(MAX) NULL,
	QRCode NVARCHAR(MAX) NULL,
	SoLuong INT NULL,
	GiaTien MONEY NULL,
	MoTa NVARCHAR(MAX) NULL,
	NgayTao DATETIME DEFAULT GETDATE() NULL,
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE() NULL,
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai INT DEFAULT 1
	)
	GO
	CREATE TABLE DotGiamGia (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	GiaTriGiam INT NOT NULL,
	NgayBatDau DATETIME NOT NULL,
	NgayKetThuc DATETIME NOT NULL,
	NgayTao DATETIME DEFAULT GETDATE() NULL,
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE() NULL,
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai INT NOT NULL 
	)
	GO
	CREATE TABLE KhachHang (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	MaKhachHang VARCHAR(50),
	Anh VARCHAR(300) NULL,
	HoVaTen NVARCHAR(100) NOT NULL,
	NgaySinh DATE NULL,
	GioiTinh BIT DEFAULT 0,
	SoDienThoai VARCHAR(20) NULL,
	Email VARCHAR(50) NULL,
	TaiKhoan VARCHAR(50) NULL,
	MatKhau VARCHAR(300) NULL,
	NgayTao DATETIME DEFAULT GETDATE() NULL,
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE() NULL,
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai INT NOT NULL 
	)
	GO
	CREATE TABLE NhanVien(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	MaNhanVien VARCHAR(50),
	Anh VARCHAR(300) NULL,
	HoVaTen NVARCHAR(100) NOT NULL,
	NgaySinh DATE NULL,
	GioiTinh BIT, --DEFAULT 0,
	QueQuan NVARCHAR(200) NOT NULL,
	Cccd VARCHAR(20) NULL,
	SoDienThoai VARCHAR(20) NULL,
	Email VARCHAR(50) NULL,
	TaiKhoan VARCHAR(50) NULL,
	MatKhau VARCHAR(300) NULL,
	VaiTro INT DEFAULT 0,
	NgayTao DATETIME DEFAULT GETDATE() NULL,
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE() NULL,
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai INT DEFAULT 0
	)
	GO
	CREATE TABLE GioHang (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	IdKhachHang INT UNIQUE NOT NULL,
	IdSanPhamChiTiet INT NOT NULL,
	SoLuong SMALLINT  NULL,
	NgayTao DATETIME DEFAULT GETDATE()  NULL,
	TrangThai BIT DEFAULT 0
	)
	GO
	CREATE TABLE HoaDon (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	IdNhanVien INT  NOT NULL,
	IdKhachHang INT NULL,
	IdPhieuGiamGia INT NULL,
	Mahoadon NVARCHAR(100) UNIQUE NULL,
	TenKhachHang NVARCHAR(50) NULL,
	Email VARCHAR(100) NULL,
	SoDienThoai VARCHAR(20) NULL,
	DiaChi NVARCHAR(100) NULL,
	TienGiam MONEY NULL,
	TongTien MONEY  NULL,
	LoaiHoaDon BIT DEFAULT 0,
	PhiVanChuyen MONEY NULL,
	NgayXacNhan DATETIME NULL,
	NgayVanChuyen DATETIME NULL,
	NgayNhanHang DATETIME NULL,
	NgayHoanThanh DATETIME NULL,
	GhiChu NVARCHAR(MAX) NULL,
	NgayTao DATETIME DEFAULT GETDATE() NULL,
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE() NULL,
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai INT
	)
	GO
	CREATE TABLE HoaDonChiTiet (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	IdHoaDon INT NOT NULL,
	IdSanPhamChiTiet INT NOT NULL,
	GiaSanPham MONEY NULL,
	SoLuong SMALLINT NULL,
	GhiChu NVARCHAR(MAX) NULL,
	TrangThai INT
	)
	GO
	CREATE TABLE LichSuHoaDon (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	IdHoaDon INT  NOT NULL,
	IdNhanVien INT  NOT NULL,
	GhiChu NVARCHAR(MAX) NULL,
	NgayTao DATETIME DEFAULT GETDATE() NULL,
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE() NULL,
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai INT
	)
	GO
	CREATE TABLE KhachHangPhieuGiam (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	IdKhachHang INT NOT NULL,
	IdPhieuGiamGia INT NOT NULL,
	)
	GO
	CREATE TABLE PhieuGiamGia (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	IdHoaDon INT  NOT NULL,
	MaCode NVARCHAR(100) NULL,
	TenPhieu NVARCHAR(300) NOT NULL,
	GiaTriGiamToiDa MONEY NULL,--giảm tối đa là 40k
	GiaTriGiam INT NOT NULL,--giảm 50%
	DonToiThieu MONEY NULL,--tổng đơn là 100k
	SoLuong SMALLINT NULL,
	LoaiPhieu BIT DEFAULT 0,
	KieuPhieu BIT DEFAULT 0,
	NgayBatDau DATETIME NOT NULL,
	NgayKetThuc DATETIME NOT NULL,
	NgayTao DATETIME DEFAULT GETDATE(),
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE(),
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai INT NOT NULL
	)
	GO
	CREATE TABLE Anh (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	IdSanPhamChiTiet INT NOT NULL,
	TenAnh VARCHAR(300) NULL,
	NgayTao DATETIME DEFAULT GETDATE() NULL,
	NguoiTao NVARCHAR(100) NULL,
	LanCapNhatCuoi DATETIME DEFAULT GETDATE() NULL,
	NguoiCapNhat NVARCHAR(100) NULL,
	TrangThai BIT DEFAULT 1
	)
-- Bảng DiaChi
ALTER TABLE DiaChi
ADD CONSTRAINT FK_DiaChi_KhachHang FOREIGN KEY (IdKhachHang) REFERENCES KhachHang(Id);

-- Bảng PhuongThucThanhToan
ALTER TABLE PhuongThucThanhToan
ADD CONSTRAINT FK_PhuongThucThanhToan_HoaDon FOREIGN KEY (IdHoaDon) REFERENCES HoaDon(Id);

-- Bảng SanPham
ALTER TABLE SanPham ADD CONSTRAINT FK_SanPham_ThuongHieu FOREIGN KEY (IdThuongHieu) REFERENCES ThuongHieu(Id);
ALTER TABLE SanPham ADD CONSTRAINT FK_SanPham_ChatLieu FOREIGN KEY (IdChatLieu) REFERENCES ChatLieu(Id);
ALTER TABLE SanPham ADD CONSTRAINT FK_SanPham_DeGiay FOREIGN KEY (IdDeGiay) REFERENCES DeGiay(Id);

-- Bảng SanPhamChiTiet
ALTER TABLE SanPhamChiTiet ADD CONSTRAINT FK_SanPhamChiTiet_SanPham FOREIGN KEY (IdSanPham) REFERENCES SanPham(Id);
ALTER TABLE SanPhamChiTiet ADD CONSTRAINT FK_SanPhamChiTiet_KichCo FOREIGN KEY (IdKichCo) REFERENCES KichCo(Id);
ALTER TABLE SanPhamChiTiet ADD CONSTRAINT FK_SanPhamChiTiet_MauSac FOREIGN KEY (IdMauSac) REFERENCES MauSac(Id);
ALTER TABLE SanPhamChiTiet ADD CONSTRAINT FK_SanPhamChiTiet_DotGiamGia FOREIGN KEY (IdDotGiamGia) REFERENCES DotGiamGia(Id);

-- Bảng GioHang
ALTER TABLE GioHang ADD CONSTRAINT FK_GioHang_KhachHang FOREIGN KEY (IdKhachHang) REFERENCES KhachHang(Id);
ALTER TABLE GioHang ADD CONSTRAINT FK_GioHang_SanPhamChiTiet FOREIGN KEY (IdSanPhamChiTiet) REFERENCES SanPhamChiTiet(Id);

-- Bảng HoaDon
ALTER TABLE HoaDon ADD CONSTRAINT FK_HoaDon_NhanVien FOREIGN KEY (IdNhanVien) REFERENCES NhanVien(Id);
ALTER TABLE HoaDon ADD CONSTRAINT FK_HoaDon_KhachHang FOREIGN KEY (IdKhachHang) REFERENCES KhachHang(Id);
ALTER TABLE HoaDon ADD CONSTRAINT FK_HoaDon_PhieuGiamGia FOREIGN KEY (IdPhieuGiamGia) REFERENCES PhieuGiamGia(Id);

-- Bảng HoaDonChiTiet
ALTER TABLE HoaDonChiTiet ADD CONSTRAINT FK_HoaDonChiTiet_HoaDon FOREIGN KEY (IdHoaDon) REFERENCES HoaDon(Id);
ALTER TABLE HoaDonChiTiet ADD CONSTRAINT FK_HoaDonChiTiet_SanPhamChiTiet FOREIGN KEY (IdSanPhamChiTiet) REFERENCES SanPhamChiTiet(Id);

-- Bảng LichSuHoaDon
ALTER TABLE LichSuHoaDon ADD CONSTRAINT FK_LichSuHoaDon_HoaDon FOREIGN KEY (IdHoaDon) REFERENCES HoaDon(Id);
ALTER TABLE LichSuHoaDon ADD CONSTRAINT FK_LichSuHoaDon_NhanVien FOREIGN KEY (IdNhanVien) REFERENCES NhanVien(Id);

-- Bảng KhachHangPhieuGiam
ALTER TABLE KhachHangPhieuGiam ADD CONSTRAINT FK_KhachHangPhieuGiam_KhachHang FOREIGN KEY (IdKhachHang) REFERENCES KhachHang(Id);
ALTER TABLE KhachHangPhieuGiam ADD CONSTRAINT FK_KhachHangPhieuGiam_PhieuGiamGia FOREIGN KEY (IdPhieuGiamGia) REFERENCES PhieuGiamGia(Id);

-- Bảng Anh
ALTER TABLE Anh ADD CONSTRAINT FK_Anh_SanPhamChiTiet FOREIGN KEY (IdSanPhamChiTiet) REFERENCES SanPhamChiTiet(Id);
GO

-- Bảng KhachHang
INSERT INTO KhachHang (MaKhachHang, HoVaTen, SoDienThoai, Email, TaiKhoan, MatKhau, NguoiTao, NguoiCapNhat, TrangThai)
VALUES
('KH001', 'Nguyễn Văn Nam', '0909123456', 'namnv1@gmail.com', 'namnv1', '123', N'Admin', N'Admin', 1),
('KH002', 'Lê Ánh Ngọc', '0912345678', 'ngocla2@gmail.com', 'ngocla2', '123', N'Admin', N'Admin', 1),
('KH003', 'Trần Quốc Nghĩa', '0923456789', 'nghiatq3@gmail.com', 'nghiatq3', '123', N'Admin', N'Admin', 1),
('KH004', 'Nguyễn Phúc Long', '0934567890', 'longnp4@gmail.com', 'longnp4', '123', N'Admin', N'Admin', 1),
('KH005', 'Kiều Khánh Huyền', '0945678901', 'huyenkh5@gmail.com', 'huyenkh5', '123', N'Admin', N'Admin', 1),
('KH006', 'Nguyễn Thùy Linh', '0956789012', 'linhnt6@gmail.com', 'linhnt6', '123', N'Admin', N'Admin', 1),
('KH007', 'Bùi Huyền Anh', '0967890123', 'anhbh7@gmail.com', 'anhbh7', '123', N'Admin', N'Admin', 1),
('KH008', 'Đặng Phương Thảo', '0978901234', 'thaodpt8@gmail.com', 'thaodpt8', '123', N'Admin', N'Admin', 1),
('KH009', 'Lê Hải Đăng', '0989012345', 'danghd9@gmail.com', 'danghd9', '123', N'Admin', N'Admin', 1),
('KH010', 'Phùng Thanh Hiền', '0990123456', 'hienpt10@gmail.com', 'hienpt10', '123', N'Admin', N'Admin', 1),
('KH011', 'Nguyễn Anh Vũ', '0910112233', 'vuna11@gmail.com', 'vuanh11', '123', N'Admin', N'Admin', 1),
('KH012', 'Vũ Thùy Tiên', '0911223344', 'tienvt12@gmail.com', 'tienvt12', '123', N'Admin', N'Admin', 1),
('KH013', 'Lê Phương Anh', '0912334455', 'anhpa13@gmail.com', 'anhpa13', '123', N'Admin', N'Admin', 1),
('KH014', 'Nguyễn Thị Thùy Linh', '0913445566', 'linhnt14@gmail.com', 'linhnt14', '123', N'Admin', N'Admin', 1),
('KH015', 'Đỗ Ánh Dương', '0914556677', 'duongad15@gmail.com', 'duongad15', '123', N'Admin', N'Admin', 1),
('KH016', 'Nguyễn Thúy Hằng', '0915667788', 'hangnt16@gmail.com', 'hangnt16', '123', N'Admin', N'Admin', 1),
('KH017', 'Nguyễn Anh Dũng', '0916778899', 'dungna17@gmail.com', 'dungna17', '123', N'Admin', N'Admin', 1),
('KH018', 'Vũ Văn Nguyên', '0917889900', 'nguyenvv18@gmail.com', 'nguyenvv18', '123', N'Admin', N'Admin', 1),
('KH019', 'Hoàng Công Vinh', '0918990011', 'vinhhc19@gmail.com', 'vinhhc19', '123', N'Admin', N'Admin', 1),
('KH020', 'Bạch Văn Sơn', '0919001122', 'sonbv20@gmail.com', 'sonbv20', '123', N'Admin', N'Admin', 1);

-- Bảng DiaChi
INSERT INTO DiaChi (IdKhachHang, TenDuong, XaPhuong, QuanHuyen, TinhThanhPho, TenNguoiNhan, SdtNguoiNhan, NguoiTao, NguoiCapNhat, TrangThai)
VALUES
(1, N'Trần Hưng Đạo', N'Tây Sơn', N'Hoa Lư', N'Ninh Bình', N'Nguyễn Văn Nam', '0909123456', N'Admin', N'Admin', 1),
(2, N'Phan Đình Phùng', N'Thạch Trung', N'Hải Châu', N'Đà Nẵng', N'Lê Ánh Ngọc', '0912345678', N'Admin', N'Admin', 1),
(3, N'Nguyễn Thái Học', N'Phú Thượng', N'Tây Hồ', N'Hà Nội', N'Trần Quốc Nghĩa', '0923456789', N'Admin', N'Admin', 1),
(4, N'Đường 3/2', N'Phường 2', N'Tân Bình', N'Tp. Hồ Chí Minh', N'Nguyễn Phúc Long', '0934567890', N'Admin', N'Admin', 1),
(5, N'Nguyễn Hữu Cảnh', N'Phú Hữu', N'Nhà Bè', N'Tp. Hồ Chí Minh', N'Kiều Khánh Huyền', '0945678901', N'Admin', N'Admin', 1),
(6, N'Trần Não', N'Bình An', N'Thủ Đức', N'Tp. Hồ Chí Minh', N'Nguyễn Thùy Linh', '0956789012', N'Admin', N'Admin', 1),
(7, N'Phạm Hữu Lầu', N'Đa Kao', N'Quận 1', N'Tp. Hồ Chí Minh', N'Bùi Huyền Anh', '0967890123', N'Admin', N'Admin', 1),
(8, N'Hồng Bàng', N'An Hải Bắc', N'Sơn Trà', N'Đà Nẵng', N'Đặng Phương Thảo', '0978901234', N'Admin', N'Admin', 1),
(9, N'Hà Huy Tập', N'An Khê', N'Tam Kỳ', N'Quảng Nam', N'Lê Hải Đăng', '0989012345', N'Admin', N'Admin', 1),
(10, N'Quang Trung', N'Thường Định', N'Thành phố Thái Bình', N'Thái Bình', N'Phùng Thanh Hiền', '0990123456', N'Admin', N'Admin', 1),
(11, N'Nguyễn Đình Chiểu', N'Gia Quất', N'Thuận Thành', N'Bắc Ninh', N'Nguyễn Anh Vũ', '0910112233', N'Admin', N'Admin', 1),
(12, N'Lê Lợi', N'Phú Thượng', N'Tây Hồ', N'Hà Nội', N'Vũ Thùy Tiên', '0911223344', N'Admin', N'Admin', 1),
(13, N'Hà Bổng', N'Gia Huynh', N'Hương Khê', N'Hà Tĩnh', N'Lê Phương Anh', '0912334455', N'Admin', N'Admin', 1),
(14, N'Tôn Đức Thắng', N'Tân Hưng', N'Tân Bình', N'Tp. Hồ Chí Minh', N'Nguyễn Thị Thùy Linh', '0913445566', N'Admin', N'Admin', 1),
(15, N'Hòa Hảo', N'Hòa An', N'Phú Nhuận', N'Tp. Hồ Chí Minh', N'Đỗ Ánh Dương', '0914556677', N'Admin', N'Admin', 1),
(16, N'Nguyễn Văn Cừ', N'Mỹ Đình', N'Thành phố Hải Phòng', N'Hải Phòng', N'Nguyễn Thúy Hằng', '0915667788', N'Admin', N'Admin', 1),
(17, N'Phạm Văn Đồng', N'Phú Đô', N'Nam Từ Liêm', N'Hà Nội', N'Nguyễn Anh Dũng', '0916778899', N'Admin', N'Admin', 1),
(18, N'Trần Đại Nghĩa', N'Đại Kim', N'Hoàng Mai', N'Hà Nội', N'Vũ Văn Nguyên', '0917889900', N'Admin', N'Admin', 1),
(19, N'Lê Văn Lương', N'Tân Hưng', N'Tân Bình', N'Tp. Hồ Chí Minh', N'Hoàng Công Vinh', '0918990011', N'Admin', N'Admin', 1),
(20, N'Nguyễn Trãi', N'Hương Tích', N'Can Lộc', N'Hà Tĩnh', N'Bạch Văn Sơn', '0919001122', N'Admin', N'Admin', 1);

-- Bảng NhanVien
INSERT INTO NhanVien (MaNhanVien, HoVaTen, QueQuan, SoDienThoai, Email, TaiKhoan, MatKhau, VaiTro, NguoiTao, NguoiCapNhat, TrangThai)
VALUES
('NV001', 'Bùi Văn Hưng', N'Hà Nội', '0934567890', 'hungbv1@gmail.com', 'hungbv1', '123', 1, N'Admin', N'Admin', 1),
('NV002', 'Nguyễn Văn Hải', N'Hà Nội', '0945678901', 'hainv2@gmail.com', 'hainv2', '123', 1, N'Admin', N'Admin', 1),
('NV003', 'Nguyễn Thành Đồng', N'Hà Nội', '0934567890', 'dongnt3@gmail.com', 'dongnt3', '123', 1, N'Admin', N'Admin', 1),
('NV004', 'Nguyễn Thị Thùy Dương', N'Hưng Yên', '0945678901', 'duongntt4@gmail.com', 'duongntt4', '123', 0, N'Admin', N'Admin', 1),
('NV005', 'Đỗ Trung Trường', N'Hà Nội', '0956789012', 'truongdt5@gmail.com', 'truongdt5', '123', 0, N'Admin', N'Admin', 1),
('NV006', 'Nguyễn Văn Thắng', N'Hà Nội', '0967890123', 'thangnv6@gmail.com', 'thangnv6', '123', 0, N'Admin', N'Admin', 1),
('NV007', 'Lê Thị Hương Giang', N'Hà Nội', '0978901234', 'gianglt7@gmail.com', 'gianglt7', '123', 0, N'Admin', N'Admin', 1),
('NV008', 'Lê Văn Tiến', N'Hà Nội', '0989012345', 'tienlv8@gmail.com', 'tienlv8', '123', 0, N'Admin', N'Admin', 1),
('NV009', 'Nguyễn Văn Huy', N'Hà Nội', '0990123456', 'huyhv9@gmail.com', 'huyhv9', '123', 0, N'Admin', N'Admin', 1),
('NV010', 'Vũ Tiến Vinh', N'Hà Nội', '0901234567', 'vinhv10@gmail.com', 'vinhv10', '123', 0, N'Admin', N'Admin', 1),
('NV011', 'Nguyễn Thị Ngọc Ánh', N'Hà Nội', '0912345678', 'anhnt11@gmail.com', 'anhnt11', '123', 0, N'Admin', N'Admin', 1),
('NV012', 'Hoàng Văn Phương', N'Hà Nội', '0923456789', 'phuonghv12@gmail.com', 'phuonghv12', '123', 0, N'Admin', N'Admin', 1),
('NV013', 'Đặng Thị Thanh Lan', N'Hà Nội', '0934567890', 'lannt13@gmail.com', 'lannt13', '123', 0, N'Admin', N'Admin', 1),
('NV014', 'Nguyễn Trung Hiếu', N'Hà Nội', '0945678901', 'hieun14@gmail.com', 'hieun14', '123', 0, N'Admin', N'Admin', 1),
('NV015', 'Dương Quang Vinh', N'Hà Nội', '0956789012', 'vinhdq15@gmail.com', 'vinhdq15', '123', 0, N'Admin', N'Admin', 1),
('NV016', 'Vi Văn Thái', N'Hà Nội', '0967890123', 'thai.vv16@gmail.com', 'thai.vv16', '123', 0, N'Admin', N'Admin', 1),
('NV017', 'Vũ Trọng Minh', N'Hà Nội', '0978901234', 'minhvtr17@gmail.com', 'minhvtr17', '123', 0, N'Admin', N'Admin', 1),
('NV018', 'Trương Văn Thiện', N'Hà Nội', '0989012345', 'thientv18@gmail.com', 'thientv18', '123', 0, N'Admin', N'Admin', 1),
('NV019', 'Trần Tuấn Vũ', N'Hà Nội', '0990123456', 'vutuan19@gmail.com', 'vutuan19', '123', 0, N'Admin', N'Admin', 1),
('NV020', 'Trương Hà Vy', N'Hà Nội', '0901234567', 'vyth21@gmail.com', 'vyth21', '123', 0, N'Admin', N'Admin', 1);
-- Bảng ThuongHieu
INSERT INTO ThuongHieu (TenThuongHieu, NguoiTao, NguoiCapNhat)
VALUES
(N'Nike', N'Admin', N'Admin'),
(N'Adidas', N'Admin', N'Admin'),
(N'Gucci', N'Admin', N'Admin'),
(N'Dolce', N'Admin', N'Admin'),
(N'Balenciaga', N'Admin', N'Admin'),
(N'Puma', N'Admin', N'Admin'),
(N'Birkenstock', N'Admin', N'Admin'),
(N'Salvatore Ferragamo', N'Admin', N'Admin'),
(N'Timberland', N'Admin', N'Admin'),
(N'New Balance', N'Admin', N'Admin'),
(N'Fila', N'Admin', N'Admin'),
(N'Kith', N'Admin', N'Admin'),
(N'Off-White', N'Admin', N'Admin'),
(N'Yeezy', N'Admin', N'Admin'),
(N'Louis Vuitton', N'Admin', N'Admin'),
(N'Burberry', N'Admin', N'Admin'),
(N'Prada', N'Admin', N'Admin'),
(N'Chanel', N'Admin', N'Admin'),
(N'Merrell', N'Admin', N'Admin'),
(N'H&M', N'Admin', N'Admin'),
(N'Zara', N'Admin', N'Admin'),
(N'Mango', N'Admin', N'Admin');

-- Bảng MauSac
INSERT INTO MauSac (MaMauSac, TenMauSac, NguoiTao, NguoiCapNhat)
VALUES
(N'#2e53c2', N'Xanh dương', N'Admin', N'Admin'),
(N'#f76808', N'Cam', N'Admin', N'Admin'),
(N'#f50505', N'Đỏ', N'Admin', N'Admin'),
(N'#030303', N'Đen', N'Admin', N'Admin'),
(N'#77e92b', N'Xanh lá', N'Admin', N'Admin'),
(N'#288a6a', N'Turquoise', N'Admin', N'Admin'),
(N'#0eccfb', N'Xanh nhạt', N'Admin', N'Admin'),
(N'#654206', N'Nâu', N'Admin', N'Admin'),
(N'#d1236f', N'Hồng', N'Admin', N'Admin'),
(N'#003b99', N'Xanh navy', N'Admin', N'Admin'),
(N'#ffcc00', N'Vàng', N'Admin', N'Admin'),
(N'#e6e6e6', N'Xám', N'Admin', N'Admin'),
(N'#ffffff', N'Trắng', N'Admin', N'Admin'),
(N'#f9f9f9', N'Kem', N'Admin', N'Admin'),
(N'#c0c0c0', N'Bạc', N'Admin', N'Admin'),
(N'#ffd700', N'Vàng kim', N'Admin', N'Admin'),
(N'#e5e500', N'Vàng chanh', N'Admin', N'Admin'),
(N'#000080', N'Xanh dương đậm', N'Admin', N'Admin'),
(N'#4b0082', N'Tím', N'Admin', N'Admin'),
(N'#ff6347', N'Tomato', N'Admin', N'Admin');

-- Bảng KichCo
INSERT INTO KichCo (TenKichCo, NguoiTao, NguoiCapNhat)
VALUES
(N'35', N'Admin', N'Admin'),
(N'36', N'Admin', N'Admin'),
(N'37', N'Admin', N'Admin'),
(N'38', N'Admin', N'Admin'),
(N'39', N'Admin', N'Admin'),
(N'40', N'Admin', N'Admin'),
(N'41', N'Admin', N'Admin'),
(N'42', N'Admin', N'Admin'),
(N'43', N'Admin', N'Admin'),
(N'44', N'Admin', N'Admin');

-- Bảng ChatLieu
INSERT INTO ChatLieu (TenChatLieu, NguoiTao, NguoiCapNhat)
VALUES
(N'Da tổng hợp', N'Admin', N'Admin'),
(N'Da bò', N'Admin', N'Admin'),
(N'Lụa', N'Admin', N'Admin'),
(N'Canvas', N'Admin', N'Admin'),
(N'Suede', N'Admin', N'Admin'),
(N'Vải', N'Admin', N'Admin'),
(N'Nhựa', N'Admin', N'Admin'),
(N'Vải dù', N'Admin', N'Admin'),
(N'Nỉ', N'Admin', N'Admin'),
(N'Gỗ', N'Admin', N'Admin');

-- Bảng DeGiay
INSERT INTO DeGiay (TenDeGiay, NguoiTao, NguoiCapNhat)
VALUES
(N'Da', N'Admin', N'Admin'),
(N'Cao su', N'Admin', N'Admin'),
(N'Dainite', N'Admin', N'Admin'),
(N'Commando', N'Admin', N'Admin'),
(N'Ridgeway', N'Admin', N'Admin'),
(N'Crepe', N'Admin', N'Admin'),
(N'Wedge', N'Admin', N'Admin'),
(N'Raw Cord', N'Admin', N'Admin'),
(N'Leather', N'Admin', N'Admin'),
(N'Rubber', N'Admin', N'Admin');

-- Bảng SanPham
INSERT INTO SanPham (MaSanPham, IdThuongHieu, IdChatLieu, IdDeGiay, TenSanPham, NguoiTao, NguoiCapNhat)
VALUES
(N'SPURJSJP5', 1, 1, 1, N'Giày thể thao Nike Air Max', N'Admin', N'Admin'),
(N'SP5S6FIRM', 2, 1, 1, N'Giày cao cổ Adidas Superstar', N'Admin', N'Admin'),
(N'SPU3S6FGW', 3, 2, 2, N'Giày chạy bộ Asics Gel-Kayano', N'Admin', N'Admin'),
(N'SPCD85FAS', 4, 1, 1, N'Giày công sở Clarks Originals', N'Admin', N'Admin'),
(N'SPE77RDGD', 5, 1, 1, N'Giày đế vuông Gucci Horsebit', N'Admin', N'Admin'),
(N'SPR1D4PMN', 6, 2, 1, N'Giày thể thao Puma Suede Classic', N'Admin', N'Admin'),
(N'SPT5TDVXZ', 7, 2, 2, N'Giày sandal Birkenstock Arizona', N'Admin', N'Admin'),
(N'SPHIY5DNV', 8, 1, 1, N'Giày lười Salvatore Ferragamo', N'Admin', N'Admin'),
(N'SPLN6FG5S', 9, 1, 1, N'Giày boot Timberland 6-Inch Premium', N'Admin', N'Admin'),
(N'SPO5DFPN6', 10, 2, 2, N'Giày thể thao New Balance 574', N'Admin', N'Admin'),
(N'SPCK1P53J', 1, 2, 2, N'Giày chạy bộ Nike ZoomX', N'Admin', N'Admin'),
(N'SPHD5YFGR', 2, 2, 2, N'Giày thể thao Adidas Ultraboost', N'Admin', N'Admin'),
(N'SPJD6RF5S', 4, 1, 1, N'Giày công sở Geox', N'Admin', N'Admin'),
(N'SPJK1WESG', 2, 2, 2, N'Giày cao cổ Converse All Star', N'Admin', N'Admin'),
(N'SPQN7FDFP', 3, 2, 1, N'Giày sneaker Vans Old Skool', N'Admin', N'Admin'),
(N'SPLM9HFGH', 6, 2, 2, N'Giày thể thao Reebok Classic', N'Admin', N'Admin'),
(N'SPPL4DKNS', 1, 1, 1, N'Giày thể thao Saucony', N'Admin', N'Admin'),
(N'SPOB8CND5', 8, 1, 1, N'Giày lười Sperry Top-Sider', N'Admin', N'Admin'),
(N'SPTD6CND4', 4, 1, 1, N'Giày boot Dr. Martens 1460', N'Admin', N'Admin'),
(N'SPBX3YFPN', 2, 2, 2, N'Giày thể thao On Cloudstratus', N'Admin', N'Admin'),
(N'SPCA5F7PL', 3, 2, 2, N'Giày chạy bộ Mizuno Wave Rider', N'Admin', N'Admin'),
(N'SPXY6GFFV', 1, 2, 1, N'Giày thể thao Hoka One One', N'Admin', N'Admin'),
(N'SPTB7KNS5', 2, 1, 1, N'Giày cao cổ UGG Classic', N'Admin', N'Admin'),
(N'SPVS4KJ5H', 3, 2, 2, N'Giày sneaker Fila Disruptor', N'Admin', N'Admin'),
(N'SPCN3MD3B', 3, 2, 2, N'Giày thể thao Asics Gel-Quantum', N'Admin', N'Admin'),
(N'SPNT4P4LT', 2, 2, 1, N'Giày thể thao Adidas NMD', N'Admin', N'Admin'),
(N'SPFL1T5PX', 4, 1, 1, N'Giày lười Clarks', N'Admin', N'Admin'),
(N'SPWT6R7BG', 7, 2, 2, N'Giày sandal Teva', N'Admin', N'Admin'),
(N'SPTF9T3GH', 3, 1, 1, N'Giày thể thao Columbia', N'Admin', N'Admin'),
(N'SPVL2X9JD', 1, 1, 1, N'Giày lười Dr. Scholl', N'Admin', N'Admin');
-- Bảng SanPhamChiTiet
INSERT INTO SanPhamChiTiet (IdSanPham, IdKichCo, IdMauSac, IdDotGiamGia, QRCode, MaSanPhamChiTiet, SoLuong, MoTa, GiaTien, NguoiTao, NguoiCapNhat)
VALUES
(1, 1, 1, NULL, 'SP001CT1', N'SP001-CT1', 100, N'Giày thể thao Nike Air Max cho nam', 3500000, N'Admin', N'Admin'),
(1, 2, 2, NULL, 'SP001CT2', N'SP001-CT2', 150, N'Giày thể thao Nike Air Max cho nữ', 3500000, N'Admin', N'Admin'),
(2, 1, 1, NULL, 'SP002CT1', N'SP002-CT1', 80, N'Giày cao cổ Adidas Superstar cho nam', 2700000, N'Admin', N'Admin'),
(2, 2, 2, NULL, 'SP002CT2', N'SP002-CT2', 60, N'Giày cao cổ Adidas Superstar cho nữ', 2700000, N'Admin', N'Admin'),
(3, 1, 1, NULL, 'SP003CT1', N'SP003-CT1', 120, N'Giày chạy bộ Asics Gel-Kayano cho nam', 3000000, N'Admin', N'Admin'),
(3, 2, 2, NULL, 'SP003CT2', N'SP003-CT2', 100, N'Giày chạy bộ Asics Gel-Kayano cho nữ', 3000000, N'Admin', N'Admin'),
(4, 1, 1, NULL, 'SP004CT1', N'SP004-CT1', 90, N'Giày công sở Clarks Originals cho nam', 2500000, N'Admin', N'Admin'),
(4, 2, 2, NULL, 'SP004CT2', N'SP004-CT2', 70, N'Giày công sở Clarks Originals cho nữ', 2500000, N'Admin', N'Admin'),
(5, 1, 1, NULL, 'SP005CT1', N'SP005-CT1', 85, N'Giày đế vuông Gucci Horsebit cho nam', 4500000, N'Admin', N'Admin'),
(5, 2, 2, NULL, 'SP005CT2', N'SP005-CT2', 75, N'Giày đế vuông Gucci Horsebit cho nữ', 4500000, N'Admin', N'Admin'),
(6, 1, 1, NULL, 'SP006CT1', N'SP006-CT1', 110, N'Giày thể thao Puma Suede Classic cho nam', 2600000, N'Admin', N'Admin'),
(6, 2, 2, NULL, 'SP006CT2', N'SP006-CT2', 95, N'Giày thể thao Puma Suede Classic cho nữ', 2600000, N'Admin', N'Admin'),
(7, 1, 1, NULL, 'SP007CT1', N'SP007-CT1', 70, N'Giày sandal Birkenstock Arizona cho nam', 1800000, N'Admin', N'Admin'),
(7, 2, 2, NULL, 'SP007CT2', N'SP007-CT2', 50, N'Giày sandal Birkenstock Arizona cho nữ', 1800000, N'Admin', N'Admin'),
(8, 1, 1, NULL, 'SP008CT1', N'SP008-CT1', 60, N'Giày lười Salvatore Ferragamo cho nam', 3500000, N'Admin', N'Admin'),
(8, 2, 2, NULL, 'SP008CT2', N'SP008-CT2', 40, N'Giày lười Salvatore Ferragamo cho nữ', 3500000, N'Admin', N'Admin'),
(9, 1, 1, NULL, 'SP009CT1', N'SP009-CT1', 55, N'Giày boot Timberland 6-Inch Premium cho nam', 4000000, N'Admin', N'Admin'),
(9, 2, 2, NULL, 'SP009CT2', N'SP009-CT2', 45, N'Giày boot Timberland 6-Inch Premium cho nữ', 4000000, N'Admin', N'Admin'),
(10, 1, 1, NULL, 'SP010CT1', N'SP010-CT1', 65, N'Giày thể thao New Balance 574 cho nam', 3200000, N'Admin', N'Admin'),
(10, 2, 2, NULL, 'SP010CT2', N'SP010-CT2', 55, N'Giày thể thao New Balance 574 cho nữ', 3200000, N'Admin', N'Admin'),
(11, 1, 1, NULL, 'SP011CT1', N'SP011-CT1', 40, N'Giày chạy bộ Nike ZoomX cho nam', 3700000, N'Admin', N'Admin'),
(11, 2, 2, NULL, 'SP011CT2', N'SP011-CT2', 30, N'Giày chạy bộ Nike ZoomX cho nữ', 3700000, N'Admin', N'Admin'),
(12, 1, 1, NULL, 'SP012CT1', N'SP012-CT1', 60, N'Giày thể thao Adidas Ultraboost cho nam', 3800000, N'Admin', N'Admin'),
(12, 2, 2, NULL, 'SP012CT2', N'SP012-CT2', 50, N'Giày thể thao Adidas Ultraboost cho nữ', 3800000, N'Admin', N'Admin');

-- Bảng PhieuGiamGia
INSERT INTO PhieuGiamGia (IdHoaDon, MaCode, TenPhieu, GiaTriGiamToiDa, GiaTriGiam, DonToiThieu, SoLuong, LoaiPhieu, KieuPhieu, NgayBatDau, NgayKetThuc, NguoiTao, NguoiCapNhat, TrangThai)
VALUES
(1, 'PGG001', 'Giảm 10%', 50000, 10, 100000, 100, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(2, 'PGG002', 'Giảm 20%', 100000, 20, 200000, 50, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(3, 'PGG003', 'Giảm 15%', 70000, 15, 150000, 80, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(4, 'PGG004', 'Giảm 5%', 30000, 5, 50000, 200, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(5, 'PGG005', 'Giảm 25%', 120000, 25, 250000, 30, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(6, 'PGG006', 'Giảm 30%', 150000, 30, 300000, 20, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(7, 'PGG007', 'Giảm 50%', 200000, 50, 500000, 10, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(8, 'PGG008', 'Giảm 40%', 100000, 40, 400000, 15, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(9, 'PGG009', 'Giảm 12%', 60000, 12, 120000, 75, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(10, 'PGG010', 'Giảm 18%', 90000, 18, 180000, 40, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(11, 'PGG011', 'Giảm 22%', 110000, 22, 220000, 35, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(12, 'PGG012', 'Giảm 8%', 40000, 8, 80000, 150, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(13, 'PGG013', 'Giảm 28%', 130000, 28, 280000, 25, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(14, 'PGG014', 'Giảm 3%', 15000, 3, 30000, 250, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(15, 'PGG015', 'Giảm 35%', 160000, 35, 350000, 18, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(16, 'PGG016', 'Giảm 7%', 35000, 7, 70000, 180, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(17, 'PGG017', 'Giảm 23%', 110000, 23, 230000, 27, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(18, 'PGG018', 'Giảm 17%', 85000, 17, 170000, 45, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(19, 'PGG019', 'Giảm 13%', 65000, 13, 130000, 65, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1),
(20, 'PGG020', 'Giảm 21%', 105000, 21, 210000, 33, 0, 0, '2024-01-01', '2024-12-31', 'Admin', 'Admin', 1);


-- Bảng HoaDon
INSERT INTO HoaDon (IdNhanVien, IdKhachHang, TenKhachHang, SoDienThoai, Mahoadon, DiaChi, Email, TongTien, NgayXacNhan, NgayVanChuyen, LoaiHoaDon, PhiVanChuyen, NguoiTao, NguoiCapNhat, GhiChu,TrangThai)
VALUES
(1, 1, 'Nguyễn Văn Nam', '0909123456', 'HD20231011', 'Trần Hưng Đạo, Tây Sơn, Hoa Lư, Ninh Bình', 'namnv1@gmail.com', 500000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 1', 1),
(2, 2, 'Lê Ánh Ngọc', '0912345678', 'HD20231012', 'Phan Đình Phùng, Thạch Trung, Hải Châu, Đà Nẵng', 'ngocla2@gmail.com', 600000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 2', 1),
(1, 3, 'Trần Quốc Nghĩa', '0923456789', 'HD20231013', 'Nguyễn Thái Học, Phú Thượng, Tây Hồ, Hà Nội', 'nghiatq3@gmail.com', 700000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 3', 1),
(2, 4, 'Nguyễn Phúc Long', '0934567890', 'HD20231014', 'Đường 3/2, Phường 2, Tân Bình, TP.HCM', 'longnp4@gmail.com', 800000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 4', 1),
(1, 5, 'Kiều Khánh Huyền', '0945678901', 'HD20231015', 'Nguyễn Hữu Cảnh, Phú Hữu, Nhà Bè, TP.HCM', 'huyenkh5@gmail.com', 900000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 5', 1),
(2, 6, 'Nguyễn Thùy Linh', '0956789012', 'HD20231016', 'Trần Não, Bình An, Thủ Đức, TP.HCM', 'linhnt6@gmail.com', 1000000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 6', 1),
(1, 7, 'Bùi Huyền Anh', '0967890123', 'HD20231017', 'Phạm Hữu Lầu, Đa Kao, Quận 1, TP.HCM', 'anhbh7@gmail.com', 1100000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 7', 1),
(2, 8, 'Đặng Phương Thảo', '0978901234', 'HD20231018', 'Hồng Bàng, An Hải Bắc, Sơn Trà, Đà Nẵng', 'thaodpt8@gmail.com', 1200000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 8', 1),
(1, 9, 'Lê Hải Đăng', '0989012345', 'HD20231019', 'Hà Huy Tập, An Khê, Tam Kỳ, Quảng Nam', 'danghd9@gmail.com', 1300000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 9', 1),
(2, 10, 'Phùng Thanh Hiền', '0990123456', 'HD20231020', 'Quang Trung, Thường Định, Thành phố Thái Bình, Thái Bình', 'hienpt10@gmail.com', 1400000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 10', 1),
(1, 11, 'Nguyễn Anh Vũ', '0910112233', 'HD20231021', 'Nguyễn Đình Chiểu, Gia Quất, Thuận Thành, Bắc Ninh', 'vuna11@gmail.com', 1500000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 11', 1),
(2, 12, 'Vũ Thùy Tiên', '0911223344', 'HD20231022', 'Lê Lợi, Phú Thượng, Tây Hồ, Hà Nội', 'tienvt12@gmail.com', 1600000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 12', 1),
(1, 13, 'Lê Phương Anh', '0912334455', 'HD20231023', 'Hà Bổng, Gia Huynh, Hương Khê, Hà Tĩnh', 'anhpa13@gmail.com', 1700000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 13', 1),
(2, 14, 'Nguyễn Thị Thùy Linh', '0913445566', 'HD20231024', 'Tôn Đức Thắng, Tân Hưng, Tân Bình, TP.HCM', 'linhnt14@gmail.com', 1800000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 14', 1),
(1, 15, 'Đỗ Ánh Dương', '0914556677', 'HD20231025', 'Hòa Hảo, Hòa An, Phú Nhuận, TP.HCM', 'duongad15@gmail.com', 1900000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 15', 1),
(2, 16, 'Nguyễn Thúy Hằng', '0915667788', 'HD20231026', 'Nguyễn Văn Cừ, Mỹ Đình, Thành phố Hải Phòng, Hải Phòng', 'hangnt16@gmail.com', 2000000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 16', 1),
(1, 17, 'Nguyễn Anh Dũng', '0916778899', 'HD20231027', 'Phạm Văn Đồng, Phú Đô, Nam Từ Liêm, Hà Nội', 'dungna17@gmail.com', 2100000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 17', 1),
(2, 18, 'Vũ Văn Nguyên', '0917889900', 'HD20231028', 'Trần Đại Nghĩa, Đại Kim, Hoàng Mai, Hà Nội', 'nguyenvv18@gmail.com', 2200000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 18', 1),
(1, 19, 'Hoàng Công Vinh', '0918990011', 'HD20231029', 'Lê Văn Lương, Tân Hưng, Tân Bình, TP.HCM', 'vinhhc19@gmail.com', 2300000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 19', 1),
(2, 20, 'Bạch Văn Sơn', '0919001122', 'HD20231030', 'Nguyễn Trãi, Hương Tích, Can Lộc, Hà Tĩnh', 'sonbv20@gmail.com', 2400000, GETDATE(), NULL, 1, 30000, 'Admin', 'Admin', 'Ghi chú hóa đơn 20', 1);
INSERT INTO HoaDonChiTiet (IdHoaDon, IdSanPhamChiTiet, GiaSanPham, SoLuong, GhiChu,TrangThai)
VALUES
(1, 1, 250000, 2, NULL, 1), -- Tổng: 500000
(1, 2, 300000, 1, NULL, 1), -- Tổng: 300000
(2, 3, 600000, 1, NULL, 1), -- Tổng: 600000
(3, 4, 700000, 1, NULL, 1), -- Tổng: 700000
(4, 5, 800000, 1, NULL, 1), -- Tổng: 800000
(5, 6, 900000, 1, NULL, 1), -- Tổng: 900000
(6, 7, 1000000, 1, NULL, 1), -- Tổng: 1000000
(7, 8, 1100000, 1, NULL, 1), -- Tổng: 1100000
(8, 9, 1200000, 1, NULL, 1), -- Tổng: 1200000
(9, 10, 1300000, 1, NULL, 1), -- Tổng: 1300000
(10, 11, 1400000, 1, NULL, 1), -- Tổng: 1400000
(11, 12, 1500000, 1, NULL, 1), -- Tổng: 1500000
(12, 13, 1600000, 1, NULL, 1), -- Tổng: 1600000
(13, 14, 1700000, 1, NULL, 1), -- Tổng: 1700000
(14, 15, 1800000, 1, NULL, 1), -- Tổng: 1800000
(15, 16, 1900000, 1, NULL, 1), -- Tổng: 1900000
(16, 17, 2000000, 1, NULL, 1), -- Tổng: 2000000
(17, 18, 2100000, 1, NULL, 1), -- Tổng: 2100000
(18, 19, 2200000, 1, NULL, 1), -- Tổng: 2200000
(19, 20, 2300000, 1, NULL, 1), -- Tổng: 2300000
(20, 21, 2400000, 1, NULL, 1); -- Tổng: 2400000

-- Bảng GioHang
INSERT INTO GioHang (IdKhachHang, IdSanPhamChiTiet)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);
SELECT spct.Id, spct.MaSanPhamChiTiet as MaSanPhamChiTiet, 
		spct.SoLuong as SoLuong, spct.GiaTien as GiaTien, spct.NgayTao,
		kc.TenKichCo,
		ms.MaMauSac, ms.TenMauSac,
		dgg.GiaTriGiam, dgg.NgayBatDau as NgayBatDauGiamGia,
		th.TenThuongHieu, cl.TenChatLieu, dg.TenDeGiay
  FROM SanPhamChiTiet as spct 
  LEFT JOIN KichCo as kc ON spct.IdKichCo = kc.Id
  LEFT JOIN MauSac as ms ON spct.IdMauSac = ms.Id
  LEFT JOIN DotGiamGia as dgg ON spct.IdDotGiamGia = dgg.Id
  LEFT JOIN SanPham as sp ON sp.Id = spct.IdSanPham
  LEFT JOIN ThuongHieu as th ON sp.IdThuongHieu = th.Id
  LEFT JOIN ChatLieu as cl ON sp.IdChatLieu = cl.Id
  LEFT JOIN DeGiay as dg ON sp.IdDeGiay = dg.Id
  ORDER BY 
    spct.NgayTao DESC, spct.Id;
