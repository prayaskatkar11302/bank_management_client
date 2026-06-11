import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";

function DepositMoney() {

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const deposit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "https://bank-management-server-odca.onrender.com/api/v1/transaction/deposit-money",
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Money Deposited Successfully");
      setAmount("");

    } catch (error) {
      alert("❌ Deposit Failed");
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

        <h3 className="text-center mb-4">💰 Deposit Money</h3>

        <Form>

          <Form.Group className="mb-3">
            <Form.Label>Enter Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="₹ Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="success"
            className="w-100"
            onClick={deposit}
            disabled={loading}
          >
            {loading ? "Processing..." : "Deposit"}
          </Button>

        </Form>

      </Card>

    </Container>
  );
}

export default DepositMoney;