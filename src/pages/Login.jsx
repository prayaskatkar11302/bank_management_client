import axios from "axios";
import { useState } from "react";
import { Button, Form, Container, Card, InputGroup } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false); // 👁️ show/hide password

  const navigate = useNavigate();

  const sendLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://bank-management-server-odca.onrender.com/api/v1/auth/login",
        { email, password }
      );

      toast.success("Login Successful 🎉");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id);

      setTimeout(() => {
        navigate("/home");
      }, 1500);

    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4facfe, #00f2fe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >

      <ToastContainer />

      <Container>
        <Card
          className="mx-auto shadow-lg"
          style={{
            maxWidth: "420px",
            borderRadius: "20px",
            padding: "30px"
          }}
        >

          <h3 className="text-center mb-4 fw-bold">
            🔐 Welcome Back
          </h3>

          <Form onSubmit={sendLogin}>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderRadius: "10px" }}
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>

              <InputGroup>
                <Form.Control
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderRadius: "10px 0 0 10px" }}
                  required
                />

                <Button
                  variant="outline-secondary"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Button */}
            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-2"
              style={{
                borderRadius: "10px",
                fontWeight: "bold"
              }}
            >
              Login
            </Button>

          </Form>

          {/* Register */}
          <div className="text-center mt-3">
            Don’t have an account?{" "}
            <Button
              variant="link"
              onClick={() => navigate("/register")}
              style={{ textDecoration: "none" }}
            >
              Register
            </Button>
          </div>

        </Card>
      </Container>
    </div>
  );
}

export default Login;