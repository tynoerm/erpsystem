import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { FaFileCsv } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import io from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("http://localhost:3001");

const InventoryManagement = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [userForm, setUserForm] = useState([]);
  const [itemEdit, setItemEdit] = useState({});

  // Form state
  const [item_name, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [last_updated, setLastupdated] = useState("");
  const [cost_price, setCostprice] = useState("");
  const [selling_price, setSellingprice] = useState("");
  const [supplier_name, setSuppliername] = useState("");
  const [min_threshold, setMinThreshold] = useState("");
  const [max_threshold, setMaxThreshold] = useState("");

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);
  const handleShow1 = (item) => {
    setItemEdit(item);
    setShow1(true);
  };

  // Fetch items and set up socket listeners
  useEffect(() => {
    fetchData();

    socket.on("alert", (data) => {
      setAlerts((prev) => [...prev, data.message]);
      toast.warn(data.message);
    });

    return () => socket.disconnect();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:3001/inventorymanagement/")
      .then((res) => {
        setUserForm(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const item = {
      item_name,
      category,
      quantity: Number(quantity),
      last_updated,
      cost_price,
      selling_price,
      supplier_name,
      min_threshold: Number(min_threshold),
      max_threshold: Number(max_threshold),
    };
  
    // Warn but allow
    if (item.quantity < item.min_threshold) {
      toast.warn(`⚠️ Quantity is below the minimum threshold (${item.min_threshold})`);
    } else if (item.quantity > item.max_threshold) {
      toast.warn(`⚠️ Quantity exceeds the maximum threshold (${item.max_threshold})`);
    }
  
    axios
      .post("http://localhost:3001/inventorymanagement/create-inventory", item)
      .then((res) => {
        setUserForm((prev) => [...prev, res.data.data]);
        handleClose();
        toast.success("Item created successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error creating item");
      });
  };
  

  const onUpdate = (e) => {
    e.preventDefault();
    const updatedItem = {
      ...itemEdit,
      quantity: Number(itemEdit.quantity),
      min_threshold: Number(itemEdit.min_threshold),
      max_threshold: Number(itemEdit.max_threshold),
    };
  
    // Warn but allow
    if (updatedItem.quantity < updatedItem.min_threshold) {
      toast.warn(`⚠️ Quantity is below the minimum threshold (${updatedItem.min_threshold})`);
    } else if (updatedItem.quantity > updatedItem.max_threshold) {
      toast.warn(`⚠️ Quantity exceeds the maximum threshold (${updatedItem.max_threshold})`);
    }
  
    axios
      .put(`http://localhost:3001/inventorymanagement/update-inventory/${itemEdit._id}`, updatedItem)
      .then((res) => {
        setUserForm((prev) =>
          prev.map((item) =>
            item._id === itemEdit._id ? { ...item, ...updatedItem } : item
          )
        );
        handleClose1();
        toast.success("Item updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error updating item");
      });
  };
  

  // Delete item
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/inventorymanagement/delete-inventory/${id}`)
      .then(() => {
        setUserForm((prevUserForm) =>
          prevUserForm.filter((item) => item._id !== id)
        );
        toast("Item deleted successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error deleting item");
      });
  };

  // Download CSV
  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/inventorymanagement/generate-csv",
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inventory_data.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <nav
        className="navbar border-bottom shadow-lg p-3 mb-5 rounded"
        style={{ backgroundColor: "black" }}
      >
        <div className="container-fluid">
          <span className="navbar-brand text-white">
            <b>INVENTORY MANAGEMENT</b>
          </span>
          <div className="ms-auto">
            <Link to="/SupplyChainManagementDashboard" className="btn btn-primary">BACK</Link>
          </div>
        </div>

   
      </nav>

      {/* Alert messages */}
      {alerts.length > 0 && (
        <div className="alert alert-warning mx-3">
          {alerts.map((msg, i) => (
            <p key={i}>⚠️ {msg}</p>
          ))}
        </div>
      )}

      {/* Top actions */}
      <div className="d-flex justify-content-end mx-3 mb-3 gap-2">
      
        <button className="btn btn-primary" onClick={handleDownload}>
          <FaFileCsv /> &nbsp;Download CSV
        </button>
        <Button variant="success" onClick={handleShow}>
          <FiEdit /> Create + 1
        </Button>
      </div>

      {/* Create Modal */}
      <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Create Inventory Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit} className="row g-3">
            <input className="form-control" placeholder="Item Name" required onChange={(e) => setItemName(e.target.value)} />
            <input className="form-control" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
            <input type="number" className="form-control" placeholder="Quantity" required onChange={(e) => setQuantity(e.target.value)} />
            <input type="date" className="form-control" placeholder="Last Updated" onChange={(e) => setLastupdated(e.target.value)} />
            <input type="number" className="form-control" placeholder="Cost Price" onChange={(e) => setCostprice(e.target.value)} />
            <input type="number" className="form-control" placeholder="Selling Price" onChange={(e) => setSellingprice(e.target.value)} />
            <input className="form-control" placeholder="Supplier Name" onChange={(e) => setSuppliername(e.target.value)} />
            <input type="number" className="form-control" placeholder="Min Threshold" onChange={(e) => setMinThreshold(e.target.value)} />
            <input type="number" className="form-control" placeholder="Max Threshold" onChange={(e) => setMaxThreshold(e.target.value)} />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={show1} onHide={handleClose1} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Edit Inventory Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onUpdate} className="row g-3">
            <input className="form-control" 
            value={itemEdit.item_name || ""} onChange={(e) => setItemEdit({ ...itemEdit, item_name: e.target.value })} />
            <input className="form-control" value={itemEdit.category || ""} onChange={(e) => setItemEdit({ ...itemEdit, category: e.target.value })} />
            <input type="number" className="form-control" value={itemEdit.quantity || ""} onChange={(e) => setItemEdit({ ...itemEdit, quantity: e.target.value })} />
            <input type="date" className="form-control" value={itemEdit.last_updated || ""} onChange={(e) => setItemEdit({ ...itemEdit, last_updated: e.target.value })} />
            <input type="number" className="form-control" value={itemEdit.cost_price || ""} onChange={(e) => setItemEdit({ ...itemEdit, cost_price: e.target.value })} />
            <input type="number" className="form-control" value={itemEdit.selling_price || ""} onChange={(e) => setItemEdit({ ...itemEdit, selling_price: e.target.value })} />
            <input className="form-control" value={itemEdit.supplier_name || ""} onChange={(e) => setItemEdit({ ...itemEdit, supplier_name: e.target.value })} />
            <input type="number" className="form-control" value={itemEdit.min_threshold || ""} onChange={(e) => setItemEdit({ ...itemEdit, min_threshold: e.target.value })} />
            <input type="number" className="form-control" value={itemEdit.max_threshold || ""} onChange={(e) => setItemEdit({ ...itemEdit, max_threshold: e.target.value })} />
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="mx-3 mb-5">
  <table className="table table-striped table-bordered">
    <thead className="table-dark">
      <tr>
        <th>Item Name</th>
        <th>Category</th>
        <th>Quantity</th>
        <th>Last Updated</th>
        <th>Cost Price</th>
        <th>Selling Price</th>
        <th>Supplier</th>
        <th>Min</th>
        <th>Max</th>
        <th>Status</th> {/* 👈 New column */}
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {userForm.map((item) => (
        <tr
          key={item._id}
          className={
            Number(item.quantity) < Number(item.min_threshold)
              ? "table-danger"
              : Number(item.quantity) > Number(item.max_threshold)
              ? "table-warning"
              : ""
          }
        >
          <td>{item.item_name}</td>
          <td>{item.category}</td>
          <td>{item.quantity}</td>
          <td>{item.last_updated?.substring(0, 10)}</td>
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
          <td>
            <Button variant="primary" onClick={() => handleShow1(item)}>Edit</Button>{" "}
            <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  
</div>


      {/* Footer */}
      <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Freight Marks Logistics. All rights reserved.
      </footer>
    </div>
  );
};

export default InventoryManagement;
