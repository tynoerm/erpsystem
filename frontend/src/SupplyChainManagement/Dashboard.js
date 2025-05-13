import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import nav from "../images/nav.jpeg";
import { MdDashboard } from "react-icons/md";
import { AiOutlineStock, AiFillShopping, AiOutlineCar } from "react-icons/ai";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const SupplyChainManagementDashboard = () => {
  const navbarStyle = {
    backgroundImage: `url(${nav})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  };

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [Productionorders, setProductionorders] = useState([]);
  const [Leadmanagement, setLeadmanagement] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/productionorders/")
      .then((res) => setProductionorders(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/leadmanagement/")
      .then((res) => setLeadmanagement(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const cards = [
    {
      icon: <AiOutlineStock size={40} color="#2c3e50" />,
      title: "INVENTORY MANAGEMENT",
      text: "Monitor stock levels, track items in real-time, and prevent stockouts or overstocking.",
      link: "/InventoryManagement",
    },
    {
      icon: <AiFillShopping size={40} color="#2c3e50" />,
      title: "PROCUREMENT",
      text: "Manage supplier relationships, purchase orders, and procurement workflows efficiently.",
      link: "/Procurement",
    },

  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={navbarStyle}>
        <div className="container-fluid px-4">
          <span className="navbar-brand fs-4">
            <MdDashboard /> &nbsp; <b>SUPPLY CHAIN MANAGEMENT</b>
          </span>
          <button className="btn btn-outline-light" onClick={handleBack}>
            Go Back
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container py-4 flex-grow-1">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cards.map((card, idx) => (
            <div className="col" key={idx}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "15px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.05)";
                }}
              >
                <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-4">
                  <div
                    className="d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#f0f2f5",
                    }}
                  >
                    {card.icon}
                  </div>
                  <h5 className="card-title mb-3 fw-semibold text-dark text-center">
                    {card.title}
                  </h5>
                  <p className="card-text text-center">{card.text}</p>
                  <Link
                    to={card.link}
                    className="btn btn-outline-primary fw-semibold"
                    style={{ borderRadius: "30px", padding: "8px 20px" }}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div>
          &copy; {new Date().getFullYear()} Supply Chain Management Dashboard. All rights reserved.
        </div>
      </footer>

      {/* MODALS */}
      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Select an Option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-grid gap-2">
            <Button variant="success" onClick={() => setShow1(true)}>
              Manufacturing & Production
            </Button>
            <Button variant="success" onClick={() => setShow2(true)}>
              Sales Module
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={show1} onHide={() => setShow1(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Manufacturing Production (Orders)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Quantity</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Assigned Employee</th>
              </tr>
            </thead>
            <tbody>
              {Productionorders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.quantity}</td>
                  <td>{order.start_date}</td>
                  <td>{order.end_date}</td>
                  <td>{order.status}</td>
                  <td>{order.assigned_employee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>

      <Modal show={show2} onHide={() => setShow2(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Sales Module (Lead Management)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Lead Source</th>
                <th>Status</th>
                <th>Contact Info</th>
                <th>Owner</th>
                <th>Score</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {Leadmanagement.map((lead, index) => (
                <tr key={index}>
                  <td>{lead.lead_source}</td>
                  <td>{lead.lead_status}</td>
                  <td>{lead.contact_information}</td>
                  <td>{lead.lead_owner}</td>
                  <td>{lead.lead_score}</td>
                  <td>{lead.lead_notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SupplyChainManagementDashboard;
