import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUserCircle,
  FaLock,
  FaKey,
} from "react-icons/fa";

function Profile() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState({});
  const [balance, setBalance] = useState(0);

  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);
  const [showPin, setShowPin] =
    useState(false);

  const [image, setImage] = useState(null);

  const [editData, setEditData] =
    useState({
      name: "",
      email: "",
      phone: "",
      address: "",
    });

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
    });

  const [pin, setPin] = useState("");

  useEffect(() => {
    fetchUser();
    fetchBalance();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "https://bank-management-server-odca.onrender.com/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBalance = async () => {
    try {
      const res = await axios.get(
        "https://bank-management-server-odca.onrender.com/api/v1/transaction/check-balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBalance(res.data.balance);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", editData.name);
      formData.append("email", editData.email);
      formData.append("phone", editData.phone);
      formData.append("address", editData.address);

      if (image) {
        formData.append(
          "profileImage",
          image
        );
      }

      const res = await axios.put(
        "https://bank-management-server-odca.onrender.com/api/v1/auth/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setUser(res.data.user);

      toast.success(
        "Profile Updated Successfully"
      );

      setShowEdit(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
    }
  };

  const changePasswordHandler =
    async (e) => {
      e.preventDefault();

      try {
        const res = await axios.put(
          "https://bank-management-server-odca.onrender.com/api/v1/transaction/change-password",
          passwordData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success(res.data.message);

        setShowPassword(false);

        setPasswordData({
          currentPassword: "",
          newPassword: "",
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message
        );
      }
    };

  const changePinHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        "https://bank-management-server-odca.onrender.com/api/v1/transaction/change-pin",
        {
          transactionPin: pin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      setPin("");
      setShowPin(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="shadow border-0 text-center p-4">
            <img
              src={
                user?.profileImage
                  ? `https://bank-management-server-odca.onrender.com/uploads/${user.profileImage}`
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="Profile"
              className="mx-auto"
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                objectFit: "cover",
                border:
                  "4px solid #0d6efd",
              }}
            />

            <h4 className="mt-3">
              {user?.name}
            </h4>

            <p className="text-muted">
              {user?.email}
            </p>

            <p>
              📞 {user?.phone}
            </p>

            <p>
              📍 {user?.address}
            </p>

            <Button
              variant="outline-primary"
              onClick={() => {
                setEditData({
                  name:
                    user.name || "",
                  email:
                    user.email ||
                    "",
                  phone:
                    user.phone ||
                    "",
                  address:
                    user.address ||
                    "",
                });

                setShowEdit(
                  true
                );
              }}
            >
              Edit Profile
            </Button>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="shadow border-0 p-4 mb-4 bg-primary text-white">
            <h6>
              Available Balance
            </h6>

            <h1>
              ₹ {balance}
            </h1>
          </Card>

          <Card className="shadow border-0 p-4">
            <h4 className="mb-4">
              Security Settings
            </h4>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <FaLock /> Change
                Password
              </div>

              <Button
                variant="outline-primary"
                onClick={() =>
                  setShowPassword(
                    true
                  )
                }
              >
                Change
              </Button>
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FaKey /> Change
                Transaction PIN
              </div>

              <Button
                variant="outline-success"
                onClick={() =>
                  setShowPin(
                    true
                  )
                }
              >
                Update
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* EDIT PROFILE */}

      <Modal
        show={showEdit}
        onHide={() =>
          setShowEdit(false)
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Profile
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            onSubmit={
              updateProfile
            }
          >
            <Form.Control
              className="mb-3"
              placeholder="Name"
              value={
                editData.name
              }
              onChange={(e) =>
                setEditData({
                  ...editData,
                  name:
                    e.target
                      .value,
                })
              }
            />

            <Form.Control
              className="mb-3"
              placeholder="Email"
              value={
                editData.email
              }
              onChange={(e) =>
                setEditData({
                  ...editData,
                  email:
                    e.target
                      .value,
                })
              }
            />

            <Form.Control
              className="mb-3"
              placeholder="Phone"
              value={
                editData.phone
              }
              onChange={(e) =>
                setEditData({
                  ...editData,
                  phone:
                    e.target
                      .value,
                })
              }
            />

            <Form.Control
              className="mb-3"
              placeholder="Address"
              value={
                editData.address
              }
              onChange={(e) =>
                setEditData({
                  ...editData,
                  address:
                    e.target
                      .value,
                })
              }
            />

            <Form.Control
              className="mb-3"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(
                  e.target
                    .files[0]
                )
              }
            />

            <Button
              type="submit"
              className="w-100"
            >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* CHANGE PASSWORD */}

      <Modal
        show={showPassword}
        onHide={() =>
          setShowPassword(
            false
          )
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Change Password
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            onSubmit={
              changePasswordHandler
            }
          >
            <Form.Control
              className="mb-3"
              type="password"
              placeholder="Current Password"
              value={
                passwordData.currentPassword
              }
              onChange={(e) =>
                setPasswordData(
                  {
                    ...passwordData,
                    currentPassword:
                      e
                        .target
                        .value,
                  }
                )
              }
            />

            <Form.Control
              className="mb-3"
              type="password"
              placeholder="New Password"
              value={
                passwordData.newPassword
              }
              onChange={(e) =>
                setPasswordData(
                  {
                    ...passwordData,
                    newPassword:
                      e
                        .target
                        .value,
                  }
                )
              }
            />

            <Button
              type="submit"
              className="w-100"
            >
              Update Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* CHANGE PIN */}

      <Modal
        show={showPin}
        onHide={() =>
          setShowPin(false)
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Change PIN
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            onSubmit={
              changePinHandler
            }
          >
            <Form.Control
              type="number"
              placeholder="New PIN"
              value={pin}
              onChange={(e) =>
                setPin(
                  e.target
                    .value
                )
              }
            />

            <Button
              variant="success"
              className="w-100 mt-3"
              type="submit"
            >
              Update PIN
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Profile;