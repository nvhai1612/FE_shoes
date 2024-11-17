import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaTrash, FaStar } from "react-icons/fa"; // Remove FaCaretDown import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Rest of the component code...

function CustomerInfo() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      province: "Hòa Bình",
      district: "Huyện Mai Châu",
      ward: "Xã Tân Thành",
      specificAddress: "Nhà 36",
      isStarSelected: true, // Mặc định tích ngôi sao cho địa chỉ duy nhất
    },
  ]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    specificAddress: "",
  });

  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  const handleAddNewAddress = () => {
    setIsAddingNewAddress(true);
  };

  const handleConfirmNewAddress = () => {
    const newAddressWithId = {
      ...newAddress,
      id: addresses.length + 1,
      isStarSelected: false,
    };
    setAddresses([newAddressWithId, ...addresses]);
    setIsAddingNewAddress(false);
    setNewAddress({
      name: "",
      phone: "",
      province: "",
      district: "",
      ward: "",
      specificAddress: "",
    });
    toast.success("Thêm địa chỉ thành công!");
  };

  const handleNewAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleStarClick = (id) => {
    setAddresses(
      addresses.map((address) =>
        address.id === id
          ? { ...address, isStarSelected: true }
          : { ...address, isStarSelected: false }
      )
    );
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
    toast.success("Xóa địa chỉ thành công!");
  };

  const handleUpdateCustomer = () => {
    toast.success("Cập nhật thông tin khách hàng thành công!");
  };

  const renderAddressForm = (address, index) => (
    <Col md={12} key={address.id}>
      <h5>Địa chỉ {index + 1}</h5>
      <Row style={{ marginBottom: "15px" }}>
        <Col md={6}>
          <Form.Group controlId="addressName">
            <Form.Label>Tên</Form.Label>
            <Form.Control type="text" defaultValue={address.name} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="addressPhone">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control type="text" defaultValue={address.phone} />
          </Form.Group>
        </Col>
      </Row>

      <Row style={{ marginBottom: "15px" }}>
        <Col>
          <Form.Group controlId="ward">
            <Form.Label>Xã/Phường</Form.Label>
            <Form.Control
              as="select"
              defaultValue={address.ward}
              style={{
                appearance: "none",
                paddingRight: "30px",
                backgroundImage:
                  "linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)",
                backgroundPosition: "right 10px center, right 5px center",
                backgroundSize: "5px 5px, 5px 5px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <option>Tất cả</option>
              <option>Phường Nghĩa Đô</option>
              <option>Xã Hòa Bình</option>
              <option>Xã Chiềng Châu</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="district">
            <Form.Label>Quận/Huyện</Form.Label>
            <Form.Control
              as="select"
              defaultValue={address.district}
              style={{
                appearance: "none",
                paddingRight: "30px",
                backgroundImage:
                  "linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)",
                backgroundPosition: "right 10px center, right 5px center",
                backgroundSize: "5px 5px, 5px 5px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <option>Tất cả</option>
              <option>Quận Cầu Giấy</option>
              <option>Huyện Tân Lạc</option>
              <option>Thành phố Hòa Bình</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="province">
            <Form.Label>Tỉnh/Thành phố</Form.Label>
            <Form.Control
              as="select"
              defaultValue={address.province}
              style={{
                appearance: "none",
                paddingRight: "30px",
                backgroundImage:
                  "linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%)",
                backgroundPosition: "right 10px center, right 5px center",
                backgroundSize: "5px 5px, 5px 5px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <option>Tất cả</option>
              <option>Hà Nội</option>
              <option>Đà Nẵng</option>
              <option>TP Hồ Chí Minh</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId="specificAddress" style={{ marginBottom: "15px" }}>
        <Form.Label>Địa chỉ cụ thể</Form.Label>
        <Form.Control type="text" defaultValue={address.specificAddress} />
        <div className="d-flex align-items-center mt-2">
          <FaStar
            style={{
              color: address.isStarSelected ? "#f0ad4e" : "black",
              cursor: "pointer",
            }}
            onClick={() => handleStarClick(address.id)}
          />
        </div>
        <div
          className="d-flex align-items-center mt-2"
          style={{ justifyContent: "flex-end" }}
        >
          <FaTrash
            style={{
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => handleDeleteAddress(address.id)}
          />
        </div>
      </Form.Group>
      <hr />
    </Col>
  );

  return (
    <Container>
      <Row>
        {/* Thông tin khách hàng */}
        <Col md={4}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Thông tin khách hàng
            <hr />
          </h2>
          <Form>
            <Form.Group
              controlId="customerName"
              style={{ marginBottom: "15px" }}
            >
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control type="text" defaultValue="Nguyễn Văn A" />
            </Form.Group>
            <Form.Group
              controlId="customerEmail"
              style={{ marginBottom: "15px" }}
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                defaultValue="nguyenvana@example.com"
              />
            </Form.Group>
            <Form.Group
              controlId="customerPhone"
              style={{ marginBottom: "15px" }}
            >
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control type="text" defaultValue="0123456789" />
            </Form.Group>
            <Form.Group
              controlId="customerDOB"
              style={{ marginBottom: "15px" }}
            >
              <Form.Label>Ngày sinh</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group
              controlId="customerGender"
              style={{ marginBottom: "15px" }}
            >
              <Form.Label>Giới tính</Form.Label>
              <Form.Control as="select" defaultValue="Nam">
                <option>Nam</option>
                <option>Nữ</option>
              </Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleUpdateCustomer}
              style={{ marginTop: "10px" }}
            >
              Cập nhật khách hàng
            </Button>
          </Form>
          <hr />
        </Col>

        {/* Danh sách địa chỉ */}
        <Col md={8}>
          <h2
            style={{
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Danh sách địa chỉ
          </h2>
          <hr />

          <Form>
            <Row>
              {/* Nút "Thêm địa chỉ" */}
              {!isAddingNewAddress && (
                <Col md={8} className="mb-3">
                  <Button variant="success" onClick={handleAddNewAddress}>
                    Thêm địa chỉ
                  </Button>
                </Col>
              )}
            </Row>

            {/* Form thêm địa chỉ */}
            {isAddingNewAddress && (
              <Col md={12}>
                <Row style={{ marginBottom: "15px" }}>
                  <Col md={6}>
                    <Form.Group controlId="newName">
                      <Form.Label>Tên</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={newAddress.name}
                        onChange={handleNewAddressChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="newPhone">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={newAddress.phone}
                        onChange={handleNewAddressChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row style={{ marginBottom: "15px" }}>
                  <Col>
                    <Form.Group controlId="newWard">
                      <Form.Label>Xã/Phường</Form.Label>
                      <Form.Control
                        as="select"
                        name="ward"
                        value={newAddress.ward}
                        onChange={handleNewAddressChange}
                      >
                        <option>Xã Tân Thành</option>
                        <option>Xã Hòa Bình</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="newDistrict">
                      <Form.Label>Quận/Huyện</Form.Label>
                      <Form.Control
                        as="select"
                        name="district"
                        value={newAddress.district}
                        onChange={handleNewAddressChange}
                      >
                        <option>Huyện Mai Châu</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="newProvince">
                      <Form.Label>Tỉnh/Thành phố</Form.Label>
                      <Form.Control
                        as="select"
                        name="province"
                        value={newAddress.province}
                        onChange={handleNewAddressChange}
                      >
                        <option>Hòa Bình</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="newSpecificAddress">
                  <Form.Label>Địa chỉ cụ thể</Form.Label>
                  <Form.Control
                    type="text"
                    name="specificAddress"
                    value={newAddress.specificAddress}
                    onChange={handleNewAddressChange}
                  />
                </Form.Group>

                <Button
                  variant="success"
                  onClick={handleConfirmNewAddress}
                  style={{ marginTop: "15px" }}
                >
                  Xác nhận thêm địa chỉ
                </Button>
                <hr />
              </Col>
            )}

            {/* Hiển thị các địa chỉ đã thêm */}
            {addresses.map(renderAddressForm)}

            {/* Thông báo lỗi */}
            <ToastContainer />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CustomerInfo;
