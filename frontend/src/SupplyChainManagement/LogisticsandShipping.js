import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Spinner, Container, Row, Col } from "react-bootstrap";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";

const socket = io("http://localhost:5000");

function LogisticsAndShippingPage() {
  const [logisticsandShippingList, setLogisticsandShippingList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [modeoftransport, setModeoftransport] = useState("");
  const [sendername, setSendername] = useState("");
  const [package_dimensions, setPackageDimensions] = useState("");
  const [weight, setWeight] = useState("");
  const [insurance_coverages, setInsuranceCoverages] = useState("");
  const [trackingand_notications, setTrackingAndNotifications] = useState("");
  const [estimated_delivery, setEstimatedDelivery] = useState("");
  const [shipment_status, setShipmentStatus] = useState("");
  const [current_location, setCurrentLocation] = useState("");
  const [carrier_name, setCarrierName] = useState("");

  useEffect(() => {
    getLogisticsandShipping();
    socket.on("logisticsandShippingUpdated", getLogisticsandShipping);
    return () => socket.off("logisticsandShippingUpdated");
  }, []);

  const getLogisticsandShipping = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/logistics-shipping");
      setLogisticsandShippingList(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logisticsData = {
      modeoftransport,
      sendername,
      package_dimensions,
      weight,
      insurance_coverages,
      trackingand_notications,
      estimated_delivery,
      shipment_status,
      current_location,
      carrier_name,
    };

    try {
      if (editIndex !== null) {
        await axios.put(`http://localhost:5000/api/logistics-shipping/${logisticsandShippingList[editIndex]._id}`, logisticsData);
      } else {
        await axios.post("http://localhost:5000/api/logistics-shipping", logisticsData);
      }
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleEdit = (index) => {
    const logistics = logisticsandShippingList[index];
    setModeoftransport(logistics.modeoftransport);
    setSendername(logistics.sendername);
    setPackageDimensions(logistics.package_dimensions);
    setWeight(logistics.weight);
    setInsuranceCoverages(logistics.insurance_coverages);
    setTrackingAndNotifications(logistics.trackingand_notications);
    setEstimatedDelivery(logistics.estimated_delivery);
    setShipmentStatus(logistics.shipment_status);
    setCurrentLocation(logistics.current_location);
    setCarrierName(logistics.carrier_name);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shipment?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/logistics-shipping/${id}`);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const resetForm = () => {
    setModeoftransport("");
    setSendername("");
    setPackageDimensions("");
    setWeight("");
    setInsuranceCoverages("");
    setTrackingAndNotifications("");
    setEstimatedDelivery("");
    setShipmentStatus("");
    setCurrentLocation("");
    setCarrierName("");
    setEditIndex(null);
  };

  const handleExportCSV = () => {
    const exportData = logisticsandShippingList.map(item => ({
      "Mode of Transport": item.modeoftransport,
      "Sender Name": item.sendername,
      "Package Dimensions": item.package_dimensions,
      "Weight": item.weight,
      "Insurance Coverage": item.insurance_coverages,
      "Tracking and Notifications": item.trackingand_notications,
      "Estimated Delivery": item.estimated_delivery,
      "Shipment Status": item.shipment_status,
      "Current Location": item.current_location,
      "Carrier Name": item.carrier_name,
    }));

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "logistics-shipping-data.csv");
  };

  return (
    <Container fluid className="py-4 px-5 bg-light min-vh-100">
      <Row className="mb-4">
      <Col>
  <div className="bg-dark text-white py-3 rounded">
    <h1 className="text-center">Logistics and Shipping Management</h1>
  </div>
</Col>

      </Row>

      <Row className="mb-3">
        <Col xs="auto">
          <Button variant="primary" onClick={() => { setShowModal(true); resetForm(); }}>
            Add Shipment
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="success" onClick={handleExportCSV}>
            Export CSV
          </Button>
        </Col>
      </Row>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Mode</th>
              <th>Sender</th>
              <th>Dimensions</th>
              <th>Weight</th>
              <th>Insurance</th>
              <th>Tracking</th>
              <th>Est. Delivery</th>
              <th>Status</th>
              <th>Location</th>
              <th>Carrier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logisticsandShippingList.map((item, index) => (
              <tr key={item._id}>
                <td>{item.modeoftransport}</td>
                <td>{item.sendername}</td>
                <td>{item.package_dimensions}</td>
                <td>{item.weight}</td>
                <td>{item.insurance_coverages}</td>
                <td>{item.trackingand_notications}</td>
                <td>{item.estimated_delivery}</td>
                <td>{item.shipment_status}</td>
                <td>{item.current_location}</td>
                <td>{item.carrier_name}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(index)}>Edit</Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Edit Shipment" : "Add New Shipment"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Mode of Transport</label>
                  <input type="text" className="form-control" value={modeoftransport} onChange={(e) => setModeoftransport(e.target.value)} />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Sender Name</label>
                  <input type="text" className="form-control" value={sendername} onChange={(e) => setSendername(e.target.value)} />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Package Dimensions</label>
                  <input type="text" className="form-control" value={package_dimensions} onChange={(e) => setPackageDimensions(e.target.value)} />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Weight</label>
                  <input type="text" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Insurance Coverage</label>
                  <input type="text" className="form-control" value={insurance_coverages} onChange={(e) => setInsuranceCoverages(e.target.value)} />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Tracking and Notifications</label>
                  <input type="text" className="form-control" value={trackingand_notications} onChange={(e) => setTrackingAndNotifications(e.target.value)} />
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Estimated Delivery</label>
                  <input type="date" className="form-control" value={estimated_delivery} onChange={(e) => setEstimatedDelivery(e.target.value)} />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Shipment Status</label>
                  <select className="form-control" value={shipment_status} onChange={(e) => setShipmentStatus(e.target.value)}>
                    <option value="">-- Select Status --</option>
                    <option>In Transit</option>
                    <option>Delivered</option>
                    <option>Delayed</option>
                  </select>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Current Location</label>
                  <input type="text" className="form-control" value={current_location} onChange={(e) => setCurrentLocation(e.target.value)} />
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <label className="form-label">Carrier Name</label>
                  <input type="text" className="form-control" value={carrier_name} onChange={(e) => setCarrierName(e.target.value)} />
                </div>
              </Col>
            </Row>

            <div className="text-end">
              <Button variant="primary" type="submit">
                {editIndex !== null ? "Update Shipment" : "Add Shipment"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default LogisticsAndShippingPage;
