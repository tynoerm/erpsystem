import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import nav from "../images/nav.jpeg";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify"; // ✅ Import toast
import { useNavigate } from 'react-router-dom';

const ManufacturingProductionDashboard = () => {
  const navbarStyle = {
    backgroundImage: `url(${nav})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "black",
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [warehouseForm, setWarehouseform] = useState([]);
  const [locationNumber, setLocationNumber] = useState("");
  const [locationName, setLocationName] = useState("");

  // New states for assign modal
  const [assignModal, setAssignModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const locationData = {
      locationNumber,
      locationName,
    };

    fetch("http://localhost:3001/warehouselocations/create-location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(locationData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setWarehouseform((prev) => [...prev, data.data]); // ✅ use saved response
          setLocationNumber(""); // ✅ clear input
          setLocationName("");  // ✅ clear input
          setShow(false);
          toast.success("Location created successfully");
        } else {
          toast.error("Error creating location");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating location");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/inventorymanagement/")
      .then((res) => {
        setWarehouseform(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch warehouse locations
    axios
      .get("http://localhost:3001/warehouselocations/")
      .then((res) => {
        setLocations(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle row click
  const handleRowClick = (item) => {
    setSelectedItem(item);
    setSelectedLocation(""); // reset selected location
    setAssignModal(true);
  };

  // Assign location to item
  const handleAssignLocation = () => {
    axios
      .put(`http://localhost:3001/inventorymanagement/update-location/${selectedItem._id}`, {
        location: selectedLocation,
      })
      .then((res) => {
        setWarehouseform((prev) =>
          prev.map((itm) =>
            itm._id === selectedItem._id ? { ...itm, location: selectedLocation } : itm
          )
        );
        toast.success("Location assigned successfully");
        setAssignModal(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to assign location");
      });
  };

    const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);  // Go back one page
  };

  return (
    <div>
      <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>
            <MdDashboard /> &nbsp;WAREHOUSE
          </b>
        </a>
        <button onClick={handleBack}>
      Go Back
    </button>
      </nav>

      <div className="d-flex justify-content-end p-3">
        <Button variant="success" onClick={handleShow}>
          Create a location
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Warehouse Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Enter location number"
                className="form-control"
                value={locationNumber}
                onChange={(e) => setLocationNumber(e.target.value)} // ✅ controlled input
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Enter location name"
                className="form-control"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)} // ✅ controlled input
              />
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-100">
                Add location
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Last Updated</th>
            <th>Location</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
            <th>Supplier</th>
            <th>Min</th>
            <th>Max</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {warehouseForm.map((item) => (
            <tr
              key={item._id}
              className={
                Number(item.quantity) < Number(item.min_threshold)
                  ? "table-danger"
                  : Number(item.quantity) > Number(item.max_threshold)
                  ? "table-warning"
                  : ""
              }
              onClick={() => handleRowClick(item)} // 👈 added row click
              style={{ cursor: "hover" }} // 👈 optional cursor
            >
              <td>{item.item_name}</td>
              <td>{item.category}</td>
              <td>{item.quantity}</td>
              <td>{item.last_updated?.substring(0, 10)}</td>
              <td>{item.location || "Unassigned"}</td>
              <td>{item.cost_price}</td>
              <td>{item.selling_price}</td>
              <td>{item.supplier_name}</td>
              <td>{item.min_threshold}</td>
              <td>{item.max_threshold}</td>
              <td>
                {Number(item.quantity) < Number(item.min_threshold) && (
                  <span className="text-danger fw-bold">Low</span>
                )}
                {Number(item.quantity) > Number(item.max_threshold) && (
                  <span className="text-warning fw-bold">Overstock</span>
                )}
                {Number(item.quantity) >= Number(item.min_threshold) &&
                  Number(item.quantity) <= Number(item.max_threshold) && (
                    <span className="text-success">OK</span>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Assign Location Modal */}
      <Modal show={assignModal} onHide={() => setAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <select
              className="form-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc._id} value={loc.locationName}>
                  {loc.locationName}
                </option>
              ))}
            </select>
          </div>
          <Button
            variant="primary"
            onClick={handleAssignLocation}
            disabled={!selectedLocation}
          >
            Assign
          </Button>
        </Modal.Body>
      </Modal>

      <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Freight Marks Logistics. All rights reserved.
      </footer>
    </div>
  );
};

export default ManufacturingProductionDashboard;
