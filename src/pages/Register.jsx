import axios from "axios";
import { useState } from "react";
import {
  Button,
  Form,
  Container,
  Card,
  InputGroup,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmpassword: "",
    transactionPin: "",
  });

  const [profileImage, setProfileImage] =
    useState(null);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);
      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  const sendRegister = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmpassword
    ) {
      toast.error(
        "Passwords do not match ❌"
      );
      return;
    }

    if (
      formData.transactionPin.length !==
      4
    ) {
      toast.error(
        "PIN must be 4 digits ❌"
      );
      return;
    }

    try {
      const data = new FormData();

      data.append(
        "name",
        formData.name
      );
      data.append(
        "email",
        formData.email
      );
      data.append(
        "phone",
        formData.phone
      );
      data.append(
        "address",
        formData.address
      );
      data.append(
        "password",
        formData.password
      );
      data.append(
        "confirmpassword",
        formData.confirmpassword
      );
      data.append(
        "transactionPin",
        formData.transactionPin
      );

      if (profileImage) {
        data.append(
          "profileImage",
          profileImage
        );
      }

      const res =
        await axios.post(
          "https://bank-management-server-odca.onrender.com/api/v1/auth/register",
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      toast.success(
        "Registration Successful 🎉"
      );

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Registration Failed ❌"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#667eea,#764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <ToastContainer />

      <Container>
        <Card
          className="mx-auto shadow-lg border-0"
          style={{
            maxWidth: "700px",
            borderRadius: "20px",
          }}
        >
          <Card.Body className="p-4">
            <h2 className="text-center fw-bold mb-4">
              Create Account
            </h2>

            <Form
              onSubmit={
                sendRegister
              }
            >
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Full Name
                    </Form.Label>

                    <Form.Control
                      type="text"
                      name="name"
                      value={
                        formData.name
                      }
                      onChange={
                        changeHandler
                      }
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Email
                    </Form.Label>

                    <Form.Control
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        changeHandler
                      }
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Phone
                    </Form.Label>

                    <Form.Control
                      type="text"
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        changeHandler
                      }
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Address
                    </Form.Label>

                    <Form.Control
                      type="text"
                      name="address"
                      value={
                        formData.address
                      }
                      onChange={
                        changeHandler
                      }
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>
                  Profile Image
                </Form.Label>

                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={
                    imageHandler
                  }
                />
              </Form.Group>

              {preview && (
                <div className="text-center mb-3">
                  <Image
                    src={preview}
                    roundedCircle
                    width={120}
                    height={120}
                    style={{
                      objectFit:
                        "cover",
                    }}
                  />
                </div>
              )}

              <Form.Group className="mb-3">
                <Form.Label>
                  Password
                </Form.Label>

                <InputGroup>
                  <Form.Control
                    type={
                      showPass
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={
                      formData.password
                    }
                    onChange={
                      changeHandler
                    }
                    required
                  />

                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      setShowPass(
                        !showPass
                      )
                    }
                  >
                    {showPass
                      ? "Hide"
                      : "Show"}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Confirm Password
                </Form.Label>

                <Form.Control
                  type="password"
                  name="confirmpassword"
                  value={
                    formData.confirmpassword
                  }
                  onChange={
                    changeHandler
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>
                  Transaction PIN
                </Form.Label>

                <InputGroup>
                  <Form.Control
                    type={
                      showPin
                        ? "text"
                        : "password"
                    }
                    name="transactionPin"
                    value={
                      formData.transactionPin
                    }
                    onChange={
                      changeHandler
                    }
                    maxLength={4}
                    required
                  />

                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      setShowPin(
                        !showPin
                      )
                    }
                  >
                    {showPin
                      ? "Hide"
                      : "Show"}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="w-100 fw-bold"
                size="lg"
              >
                Register
              </Button>
            </Form>

            <div className="text-center mt-3">
              Already have an account?{" "}
              <Button
                variant="link"
                onClick={() =>
                  navigate("/")
                }
              >
                Login
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Register;