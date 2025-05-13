import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdSearch } from "react-icons/md";
import nav from "../images/nav.jpeg";
import axios from "axios";
import { Card, Badge, InputGroup, FormControl, Button, Spinner, Container, Row, Col } from 'react-bootstrap';
import QueryItem from './QueryItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

const SalesCustomerRelation = ({ newIssuesCount }) => {
  const navbarStyle = {
    backgroundImage: `url(${nav})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  };


    const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);  // Go back one page
  };

  const [queries, setQueries] = useState([]);
  const [expenseAccount, setExpenseAccount] = useState([]);
  const [productionOrders, setProductionOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch data for queries, expense accounts, and production orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [queriesRes, expensesRes, prodRes] = await Promise.all([
          axios.get("http://localhost:3001/queries/get-queries"),
          axios.get("http://localhost:3001/expenseaccount/"),
          axios.get("http://localhost:3001/productionorders/"),
        ]);
        setQueries(queriesRes.data.data);  // Set fetched queries
        setExpenseAccount(expensesRes.data.data);
        setProductionOrders(prodRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);  // Stop loading after data is fetched
      }
    };

    fetchData();
  }, []);

  // Filter queries based on the search term
  const filteredQueries = queries.filter(query =>
    query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle replying to queries
  const replyToQuery = async (queryId, replyMessage) => {
    try {
      const response = await axios.post('http://localhost:3001/queries/reply-to-query', {
        queryId,
        replyMessage,
      });

      if (response.data.status === 200) {
        setQueries(prevQueries => 
          prevQueries.map(query =>
            query._id === queryId ? { ...query, status: 'solved', replyMessage } : query
          )
        );
        toast.success("Reply sent successfully!");
      }
    } catch (error) {
      console.error("Error replying to query:", error);
      toast.error("Failed to send reply");
    }
  };

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-dark" style={navbarStyle}>
        <div className="container-fluid">
          <span className="navbar-brand text-white fs-4 fw-bold">
            <MdDashboard /> &nbsp;SALES & CUSTOMER RELATION
          </span>
        <button onClick={handleBack}>
      Go Back
    </button>
        </div>
      </nav>

      {/* Summary Cards */}
      <Container className="mt-4">
        <Row className="g-3">
          <Col md={6}>
            <Card className="shadow-sm border-0 bg-success text-white">
              <Card.Body className="d-flex align-items-center">
                <div>
                  <h6></h6>

                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm border-0 bg-primary text-white">
              <Card.Body className="d-flex align-items-center">
                <div>
                  <h6></h6>

                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Support Dashboard */}
        <Card className="shadow-sm border-0 mt-4">
          <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
            <span>Support Dashboard</span>
            <Badge bg="danger" pill>{newIssuesCount} New</Badge>
          </Card.Header>
          <Card.Body>
            <InputGroup className="mb-3">
              <InputGroup.Text><MdSearch /></InputGroup.Text>
              <FormControl
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            {filteredQueries.length === 0 ? (
              <p className="text-muted">No queries found.</p>
            ) : (
              filteredQueries.map(query => (
                <QueryItem
                  key={query._id}
                  query={query}
                  replyToQuery={(msg) => replyToQuery(query._id, msg)}  // Pass query._id and reply message
                />
              ))
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default SalesCustomerRelation;
