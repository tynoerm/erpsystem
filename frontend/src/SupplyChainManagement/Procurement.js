import { Link } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { FaFileCsv } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Procurement = () => {
    const [modalShow, setModalShow] = useState(false);
    const [procurementForm, setProcurementForm] = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [procurementEdit, setProcurementEdit] = useState({});

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = () => setShow(true);
    const handleShow1 = (a) => { setProcurementEdit(a); setShow1(true); }

    const [suppliername, setSuppliername] = useState("");
    const [address, setAddress] = useState("");
    const [contactdetails, setContactdetails] = useState("");
    const [email, setEmail] = useState("");
    const [qualityratings, setQualityratings] = useState("");
    const [deliveryperformance, setDeliveryperformance] = useState("");
    const [categoryproducts, setCategoryproducts] = useState("");
    const [status, setStatus] = useState("Pending");
    const [orderDate, setOrderDate] = useState("");

    // Fetch procurement data on component mount
    useEffect(() => {
      console.log('Fetching procurement data...'); // Add a console log to track the request
      fetch("http://localhost:3001/procurement/")
          .then(response => response.json())
          .then(data => {
              if (data && data.data) {
                  setProcurementForm(data.data);
                  console.log('Procurement data fetched:', data.data); // Log the fetched data
              } else {
                  console.log('No data found or incorrect data format');
              }
          })
          .catch(error => {
              console.error("Error fetching procurement orders:", error);
          });
  }, []);
  

    const handleSubmit = (e) => {
        e.preventDefault();

        const procurementData = {
            suppliername,
            address,
            contactdetails,
            email,
            qualityratings,
            deliveryperformance,
            categoryproducts,
            status,
            orderDate,
        };

        fetch("http://localhost:3001/procurement/create-procurement", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(procurementData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                setProcurementForm(prev => [...prev, procurementData]);
                setShow(false);
                toast("Order created successfully");
            } else {
                toast("Error creating order");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            toast("Error creating order");
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        fetch(`http://localhost:3001/procurement/update-procurement/${procurementEdit._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(procurementEdit),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                setProcurementForm((prev) =>
                    prev.map((item) =>
                        item._id === procurementEdit._id ? procurementEdit : item
                    )
                );
                setShow1(false); // Close the modal
                toast("Order updated successfully");
            } else {
                toast("Error updating order");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            toast("Error updating order");
        });
    };

    const handleDelete = async (id) => {
        fetch(`http://localhost:3001/procurement/delete-procurement/${id}`, {
            method: "DELETE",
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                setProcurementForm((prev) => prev.filter((item) => item._id !== id));
                toast("Order deleted successfully");
            } else {
                toast("Error deleting order");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            toast("Error deleting order");
        });
    };

    const handleDownload = async () => {
        try {
            const response = await fetch("http://localhost:3001/procurement/generate-csv");
            const csv = await response.text();
            const blob = new Blob([csv], { type: 'text/csv' });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "procurement_data.csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading CSV:", error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ToastContainer />
            <nav className="navbar bg-dark border-bottom shadow-lg p-3 mb-5">
    <div className="container-fluid">
        <a className="navbar-brand text-white"><b>SUPPLIER MANAGEMENT(ORDERS)</b></a>
        <div className="ms-auto">
                <Link to="/SupplyChainManagementDashboard" className="btn btn-primary">BACK</Link>
              </div>
    </div>
       
</nav>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={handleDownload}><FaFileCsv /> &nbsp;Reports</button>
                <Button variant="success" onClick={handleShow}>Create + 1</Button>
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create Purchase Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Supplier Name</label>
                            <input type="text" className="form-control" value={suppliername} onChange={(e) => setSuppliername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Address</label>
                            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Contact Details</label>
                            <input type="number" className="form-control" value={contactdetails} onChange={(e) => setContactdetails(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Quality Control Ratings</label>
                            <input type="text" className="form-control" value={qualityratings} onChange={(e) => setQualityratings(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Delivery Performance</label>
                            <input type="text" className="form-control" value={deliveryperformance} onChange={(e) => setDeliveryperformance(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Category Products</label>
                            <input type="text" className="form-control" value={categoryproducts} onChange={(e) => setCategoryproducts(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label>Status</label>
                            <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label>Order Date</label>
                            <input type="date" className="form-control" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={show1} onHide={handleClose1} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Purchase Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label>Supplier Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={procurementEdit.suppliername || ""}
                                onChange={(e) => setProcurementEdit({ ...procurementEdit, suppliername: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={procurementEdit.address || ""}
                                onChange={(e) => setProcurementEdit({ ...procurementEdit, address: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Contact Details</label>
                            <input
                                type="number"
                                className="form-control"
                                value={procurementEdit.contactdetails || ""}
                                onChange={(e) => setProcurementEdit({ ...procurementEdit, contactdetails: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={procurementEdit.email || ""}
                                onChange={(e) => setProcurementEdit({ ...procurementEdit, email: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Quality Control Ratings</label>
                            <input
                                type="text"
                                className="form-control"
                                value={procurementEdit.qualityratings || ""}
                                onChange={(e) => setProcurementEdit({ ...procurementEdit, qualityratings: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Delivery Performance</label>
                            <input
                                type="text"
                                className="form-control"
                                value={procurementEdit.deliveryperformance || ""}
                                onChange={(e) => setProcurementEdit({ ...procurementEdit, deliveryperformance: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Category Products</label>
                            <input
                                type="text"
                                className="form-control"
                                value={procurementEdit.categoryproducts || ""}
                                onChange={(e) => setProcurementEdit({ ...procurementEdit, categoryproducts: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Status</label>
                            <select
                                className="form-control"
                                value={procurementEdit.status || "Pending"}
                                onChange={(e) => setProcurementEdit({ ...procurementEdit, status: e.target.value })}
                            >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label>Order Date</label>
                            <input
                                type="date"
                                className="form-control"
                                value={procurementEdit.orderDate || ""}
                                onChange={(e) => setProcurementEdit({ ...procurementEdit, orderDate: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <table className="table table-striped table-bordered">
            <thead className="table-dark">
                    <tr>
                        <th>Supplier Name</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Order Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {procurementForm.map((order) => (
                        <tr key={order._id}>
                            <td>{order.suppliername}</td>
                            <td>{order.address}</td>
                            <td>{order.contactdetails}</td>
                            <td>{order.email}</td>
                            <td>{order.status}</td>
                            <td>{order.orderDate}</td>
                            <td>
                                <button onClick={() => handleShow1(order)} className="btn btn-primary">Edit</button>
                                <button onClick={() => handleDelete(order._id)} className="btn btn-secondary">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Freight Marks Logistics. All rights reserved.
      </footer>
        </div>
    );
};

export default Procurement;
