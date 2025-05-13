import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from "react-router-dom";


const CustomerQueryForm = () => {
  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('unsolved'); // ✅ Initial status

  const handleSubmit = (e) => {
    e.preventDefault();

    const customerData = { name, query, date, status };

    fetch("http://localhost:3001/queries/create-query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerData),
    })
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! ${response.status}: ${errorText}`);
        }
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          throw new Error("Expected JSON response");
        }
      })
      .then((data) => {
        toast.success("Order created successfully 🎉");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating order ❌");
      });
  };

  return (
    <div>
      {/* Toast container MUST be inside JSX */}
      <ToastContainer
        position="top-center" // must specify any built-in to avoid warnings
        autoClose={3000}
        closeOnClick
        hideProgressBar={false}
        draggable
        newestOnTop={false}
        pauseOnHover
        toastStyle={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '250px',
          textAlign: 'center',
        }}
      />



      <nav className="navbar bg-dark border-bottom shadow-lg p-3 mb-5">
        <div className="container-fluid">
          <span className="navbar-brand text-white">
            <b>CUSTOMER SUPPORT FORM</b>
          </span>
           <div className="ms-auto">
                          <Link to="/" className="btn btn-primary">BACK</Link>
                        </div>
        </div>
      </nav>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '55vh' }}
      >
        <div className="w-50">
          <Card className="my-3 shadow-lg rounded">
            <Card.Header>Submit a Query</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formQuery">
                  <Form.Label>Your Query</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    rows={3}
                    placeholder="Describe your issue or question"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    type="text"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Submit Query
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>

      <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Freight Marks Logistics. All rights reserved.
      </footer>
    </div>
  );
};

export default CustomerQueryForm;
