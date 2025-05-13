import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { FaFileCsv } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AccountsPayables = () => {
  const [modalShow, setModalShow] = useState(false);
  const [accountsPayablesForm, setAccountsPayablesForm] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleShow = () => setShow(true);


  const handleShow1 = (a) => {
    setShow1(true);
    setAccountspayableEdit(a);
    console.log(a);
  };

  const footerStyle = {
    backgroundColor: "navy",
    color: "white",
    textAlign: "center",
    padding: "10px 0",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
  };

 

  const [accountspayableinsert, setAccountspayableinsert] = useState({});
  const [accountspayableEdit, setAccountspayableEdit] = useState({});

  const [vendor_name, setVendorname] = useState("");
  const [vendor_address, setVendoraddress] = useState("");
  const [vendor_contactdetails, setVendorcontactdetails] = useState("");
  const [invoice_number, setInvoicenumber] = useState("");
  const [invoice_date, setInvoicedate] = useState("");
  const [invoice_amount, setInvoiceamount] = useState("");
  const [invoice_description, setInvoiceDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/accountspayables/")
      .then((res) => {
        setAccountsPayablesForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const notify = (message) => toast(message);

  const notify1 = (message) => toast(message);
   

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const accountspayableinsert = {
      vendor_name,
      vendor_address,
      vendor_contactdetails,
      invoice_number,
      invoice_date,
      invoice_amount,
      invoice_description,
    };
    axios
      .post(
        "http://localhost:3001/accountspayables/create-accountspayables",
        accountspayableinsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setAccountsPayablesForm((prev) => [...prev, accountspayableinsert]);
      });
      setShow(false)
      notify1("accounts payables created successfully")
      
  };
  
  const notify2 = (message) => toast(message);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/accountspayables/update-accountspayable/${accountspayableEdit._id}`,
        accountspayableEdit
      )
      .then((res) => {
        console.log({ status: res.status });
        // update userform
        handleClose();
      })
      .catch((error) => {
        console.error(" Error updating item:", error);
      });
      setShow(false)
      notify2("accounts payables edited successfully")
      
  };

  const handleDelete = async (id) => {
    axios
      .delete(
        `http://localhost:3001/accountspayables/delete-accountspayable/${id}`
      )
      .then(() => {
        console.log("Data successfully deleted!");

        setAccountsPayablesForm((prevaccountsPayablesForm) =>
          prevaccountsPayablesForm.filter((item) => item._id !== id)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/accountspayables/generate-csv",
        {
          responseType: "blob", // Important to handle binary data
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  
  return (
    <div>
      <ToastContainer/>
      <nav class=" navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded">
        <div class="container-fluid">
          <a class="navbar-brand">
            <b>ACCOUNTS PAYABLES CLIENT</b>
          </a>
          <ul className="nav justify-content-end">
      <li className="nav-item">
        <Link className="nav-link active" aria-current="page" to="/AccountsPayablesClient" type="button" class="btn btn-outline-primary">
          ACCOUNTS PAYABLES
        </Link>
      </li>
      &nbsp;
      <li className="nav-item">
        <Link className="nav-link" to="/AccountsReceivablesClient"type="button" class="btn btn-outline-primary">
          ACCOUNTS RECEIVABLES
        </Link>
      </li>
      &nbsp;
      <li className="nav-item">
        <Link className="nav-link" to="/ExpenseAccountClient"type="button" class="btn btn-outline-primary">
          EXPENSE ACCOUNT
        </Link>
      </li>
      &nbsp;
      <li className="nav-item">
        <Link className="nav-link" to="/"type="button" class="btn btn-outline-success">
          LOG OUT
        </Link>
      </li>
    </ul>
        </div>
      </nav>

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleDownload}>
          {" "}
          <FaFileCsv /> &nbsp;Reports
        </button>
        <Button variant="btn btn-success" onClick={handleShow}>
          Create + 1
        </Button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton
        style={{ backgroundColor: "blue", color: "white" }}>
          <Modal.Title>ACCOUNTS PAYABLES</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label"> vendor_name</label>
                <input
                  type="text"
                  className="form-control"
                  name="vendor_name"
                  id="vendor_name"
                  value={accountsPayablesForm.vendor_name}
                  onChange={(event) => {
                    setVendorname(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">vendor_address</label>
                <input
                  type="text"
                  className="form-control"
                  name="vendor_address"
                  id="vendor_address"
                  value={accountsPayablesForm.vendor_address}
                  onChange={(event) => {
                    setVendoraddress(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">vendor_contactdetails</label>
                <input
                  type="text"
                  className="form-control"
                  name="vendor_contactdetails"
                  id="vendor_contactdetails"
                  value={accountsPayablesForm.vendor_contactdetails}
                  onChange={(event) => {
                    setVendorcontactdetails(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">invoice_number</label>
                <input
                  type="text"
                  className="form-control"
                  name="invoice_number"
                  id="invoice_number"
                  value={accountsPayablesForm.payment_terms}
                  onChange={(event) => {
                    setInvoicenumber(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">invoice_date</label>
                <input
                  type="date"
                  className="form-control"
                  name="invoice_date"
                  id="invoice_date"
                  value={accountsPayablesForm.invoice_date}
                  onChange={(event) => {
                    setInvoicedate(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label"> invoice_amount</label>
                <input
                  type="text"
                  className="form-control"
                  name=" invoice_amount"
                  id=" invoice_amount"
                  value={accountsPayablesForm.invoice_amount}
                  onChange={(event) => {
                    setInvoiceamount(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> invoice_description</label>
                <input
                  type="text"
                  className="form-control"
                  name=" invoice_description"
                  id=" invoice_description"
                  value={accountsPayablesForm.invoice_description}
                  onChange={(event) => {
                    setInvoiceDescription(event.target.value);
                  }}
                />
              </div>

              <div>
                <button
                  type="submit"
                  onClick={notify}
                  className="btn btn-primary"
                  id="liveToastBtn"
                >
                  Submit
                </button>

                <ToastContainer />
              </div>
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton
        style={{ backgroundColor: "blue", color: "white" }}>
          <Modal.Title>EDIT</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label"> vendor_name</label>
                <input
                  type="text"
                  className="form-control"
                  name="vendor_name"
                  id="vendor_name"
                  value={accountspayableEdit.vendor_name}
                  onChange={(e) =>
                    setAccountspayableEdit({
                      ...accountspayableEdit,
                      vendor_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">vendor_address</label>
                <input
                  type="text"
                  className="form-control"
                  name="vendor_address"
                  id="vendor_address"
                  value={accountspayableEdit.vendor_address}
                  onChange={(e) =>
                    setAccountspayableEdit({
                      ...accountspayableEdit,
                      vendor_address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">vendor_contactdetails</label>
                <input
                  type="text"
                  className="form-control"
                  name="vendor_contactdetails"
                  id="vendor_contactdetails"
                  value={accountspayableEdit.vendor_contactdetails}
                  onChange={(e) =>
                    setAccountspayableEdit({
                      ...accountspayableEdit,
                      vendor_contactdetails: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">invoice_number</label>
                <input
                  type="text"
                  className="form-control"
                  name="invoice_number"
                  id="invoice_number"
                  value={accountspayableEdit.invoice_number}
                  onChange={(e) =>
                    setAccountspayableEdit({
                      ...accountspayableEdit,
                      invoice_number: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">invoice_date</label>
                <input
                  type="text"
                  className="form-control"
                  name="invoice_date"
                  id="invoice_date"
                  value={accountspayableEdit.invoice_date}
                  onChange={(e) =>
                    setAccountspayableEdit({
                      ...accountspayableEdit,
                      invoice_date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label"> invoice_amount</label>
                <input
                  type="text"
                  className="form-control"
                  name=" invoice_amount"
                  id=" invoice_amount"
                  value={accountspayableEdit.invoice_amount}
                  onChange={(e) =>
                    setAccountspayableEdit({
                      ...accountspayableEdit,
                      invoice_amount: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> invoice_description</label>
                <input
                  type="text"
                  className="form-control"
                  name=" invoice_description"
                  id=" invoice_description"
                  value={accountspayableEdit.invoice_description}
                  onChange={(e) =>
                    setAccountspayableEdit({
                      ...accountspayableEdit,
                      invoice_description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>vendor_name</th>
            <th> vendor_address</th>
            <th>vendor_contactdetails</th>
            <th> invoice_number</th>
            <th> invoice_date</th>
            <th> invoice_amount</th>
            <th> invoice_description</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {accountsPayablesForm.map((accountspayables, index) => {
            return (
              <tr key={index}>
                <td>{accountspayables.vendor_name}</td>
                <td>{accountspayables.vendor_address}</td>
                <td>{accountspayables.vendor_contactdetails}</td>
                <td>{accountspayables.invoice_number}</td>
                <td>{accountspayables.invoice_date}</td>
                <td>{accountspayables.invoice_amount}</td>
                <td>{accountspayables.invoice_description}</td>

                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(accountspayables);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={footerStyle}>
      <p>&copy; Freight Marks Logistics. All rights reserved.</p>
     
    </div>
    </div>
  );
};

export default AccountsPayables;
