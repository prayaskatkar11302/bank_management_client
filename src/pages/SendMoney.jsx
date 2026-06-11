import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SendMoney() {

  const navigate = useNavigate();

  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionPin, setTransactionPin] = useState(""); // ✅ PIN state
  const [loading, setLoading] = useState(false);

  const sendMoney = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "https://bank-management-server-odca.onrender.com/api/v1/transaction/send-money",
        {
          email: receiver,
          amount: Number(amount),
          transactionPin: transactionPin   // ✅ send PIN
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Money Sent Successfully");

      // clear fields
      setReceiver("");
      setAmount("");
      setTransactionPin("");

      // redirect
      navigate("/home");

    } catch (error) {
      alert(error?.response?.data?.message || "❌ Failed to send money");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >

      <Card
        className="p-4 shadow-lg"
        style={{ width: "400px", borderRadius: "15px" }}
      >

        <h3 className="text-center mb-4">💸 Send Money</h3>

        <Form>

          {/* Receiver */}
          <Form.Group className="mb-3">
            <Form.Label>Receiver Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter receiver email"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
            />
          </Form.Group>

          {/* Amount */}
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="₹ Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>

          {/* PIN */}
          <Form.Group className="mb-3">
            <Form.Label>Transaction PIN</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter 4-digit PIN"
              value={transactionPin}
              onChange={(e) => setTransactionPin(e.target.value)}
              maxLength={4}
            />
          </Form.Group>

          {/* Button */}
          <Button
            variant="warning"
            className="w-100"
            onClick={sendMoney}
            disabled={loading}
          >
            {loading ? "Processing..." : "Send Money"}
          </Button>

        </Form>

      </Card>

    </Container>
  );
}

export default SendMoney;