import React, { useEffect, useState } from "react";
import logo from "../assets/bank_logo.png";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NavbarComponent() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        "https://bank-management-server-odca.onrender.com/api/v1/transaction/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(res.data.notifications || []);
    } catch (error) {
      console.log(error);
    }
  };

  const unreadCount = notifications.filter(
    (n) => !n.isRead
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const markAllRead = async () => {
    try {
      await axios.put(
        "https://bank-management-server-odca.onrender.com/api/v1/transaction/notifications/read",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          isRead: true
        }))
      );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      sticky="top"
      className="shadow-sm"
      style={{
        background: "#0d6efd",
        padding: "12px 20px",
      }}
    >
      <Container>
        {/* LOGO */}
        <Navbar.Brand
          onClick={() => navigate("/home")}
          style={{
            fontWeight: "bold",
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
        >
          <img
            src={logo}
            alt="Bank Logo"
            width="150"
            height="90"
            className="me-2"
          />
          Banking Application
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          {/* LEFT */}
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/home")}>
              Home
            </Nav.Link>
          </Nav>

          {/* RIGHT */}
          <Nav>
            {/* NOTIFICATIONS */}
            <NavDropdown
              align="end"
              title={
                <>
                  🔔{" "}
                  {unreadCount > 0 && (
                    <Badge bg="danger">
                      {unreadCount}
                    </Badge>
                  )}
                </>
              }
            >
              <div className="dropdown-header text-center fw-bold">
                Notifications
              </div>

              {notifications.length === 0 ? (
                <div className="text-center p-3 text-muted">
                  No Notifications
                </div>
              ) : (
                notifications.map((n) => (
                  <NavDropdown.Item
                    key={n._id}
                    className={
                      !n.isRead ? "fw-bold" : ""
                    }
                  >
                    <div>{n.message}</div>

                    <small className="text-muted">
                      {new Date(
                        n.createdAt
                      ).toLocaleString()}
                    </small>
                  </NavDropdown.Item>
                ))
              )}

              {notifications.length > 0 && (
                <>
                  <NavDropdown.Divider />

                  <NavDropdown.Item
                    onClick={markAllRead}
                    className="text-primary text-center"
                  >
                    ✓ Mark all as read
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            {/* PROFILE */}
            <NavDropdown
              title="👤 Profile"
              align="end"
            >
              <div className="dropdown-header text-center fw-bold">
                My Account
              </div>

              <NavDropdown.Item
                onClick={() => navigate("/profile")}
              >
                👤 View Profile
              </NavDropdown.Item>

              <NavDropdown.Divider />

              <NavDropdown.Item
                onClick={handleLogout}
                className="text-danger"
              >
                🚪 Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;