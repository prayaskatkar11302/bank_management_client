import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card
} from "react-bootstrap";
import axios from "axios";
import "./Home.css";

function Home() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

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

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        "https://bank-management-server-odca.onrender.com/api/v1/transaction/transaction-history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(res.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  const displayedTransactions = showAll
    ? transactions
    : transactions.slice(0, 4);

  return (
    <div className="home-bg">
      <Container fluid className="py-4">
        <Row>
          {/* LEFT ACTIONS */}
          <Col md={3} className="mb-3">
            <Card
              className="action-card mb-3"
              onClick={() => (window.location.href = "/deposit")}
            >
              💰 Deposit Money
            </Card>

            <Card
              className="action-card"
              onClick={() => (window.location.href = "/send")}
            >
              💸 Send Money
            </Card>
          </Col>

          {/* RIGHT CONTENT */}
          <Col md={9}>
            {/* BALANCE */}
            <Card className="balance-card mb-4">
              <h6>Total Balance</h6>
              <h1>₹ {balance}</h1>
            </Card>

            {/* TRANSACTIONS */}
            <Card className="transaction-card">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0">Recent Transactions</h5>

                {transactions.length > 5 && (
                  <span
                    className="see-all"
                    onClick={() => setShowAll(!showAll)}
                    style={{ cursor: "pointer" }}
                  >
                    {showAll ? "Show Less ↑" : "See All →"}
                  </span>
                )}
              </div>

              {displayedTransactions.length === 0 ? (
                <p className="text-center text-muted">
                  No Transactions Found
                </p>
              ) : (
                displayedTransactions.map((t) => {
                  const isSender =
                    String(t.from?._id) === String(userId);

                  return (
                    <div
                      key={t._id}
                      className="transaction-item d-flex justify-content-between align-items-center py-2 border-bottom"
                    >
                      <div>
                        {t.type === "deposit" ? (
                          <span className="text-primary fw-semibold">
                            💰 Deposited ₹{t.amount}
                          </span>
                        ) : isSender ? (
                          <span className="text-danger fw-semibold">
                            ⬆ Sent ₹{t.amount}
                          </span>
                        ) : (
                          <span className="text-success fw-semibold">
                            ⬇ Received ₹{t.amount}
                          </span>
                        )}

                        <div className="small text-muted mt-1">
                          {t.type === "deposit" ? (
                            "💰 Self Deposit"
                          ) : isSender ? (
                            <>
                              To:{" "}
                              {t.to?.name ||
                                t.to?.fullName ||
                                t.to?.email ||
                                "Unknown User"}
                            </>
                          ) : (
                            <>
                              From:{" "}
                              {t.from?.name ||
                                t.from?.fullName ||
                                t.from?.email ||
                                "Unknown User"}
                            </>
                          )}
                        </div>
                      </div>

                      <small className="text-muted">
                        {new Date(
                          t.createdAt
                        ).toLocaleDateString()}
                      </small>
                    </div>
                  );
                })
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;