import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { FaFileCsv } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const AccountsReceivables = () => {
  const [modalShow, setModalShow] = useState(false);
  const [accountsReceivablesForm, setAccountsReceivablesForm] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  const handleShow = () => setShow(true);
  const handleShow1 = (a) => {
    setShow1(true);
    setAccountsReceivablesEdit(a);
    console.log(a);
  };

  const [accountsReceivablesinsert, setAccountsReceivablesinsert] = useState(
    {}
  );
  const [accountsReceivablesEdit, setAccountsReceivablesEdit] = useState({});

  const [customer_information, setCustomersInformation] = useState("");
  const [invoice_details, setInvoiceDetails] = useState("");
  const [payment_information, setPaymentInformation] = useState("");
  const [accounting_codes, setAccountingCodes] = useState("");
  const [aging_information, setAgingInformation] = useState("");
  const [payment_history, setPaymentHistory] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/accountsreceivables/")
      .then((res) => {
        setAccountsReceivablesForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



 const notify1 = (message) => toast(message);

  const handleSubmit = (e) => {
    e.preventDefault();
    const accountsReceivablesinsert = {
      customer_information,
      invoice_details,
      payment_information,
      accounting_codes,
      aging_information,
      payment_history,
    };
    axios
      .post(
        "http://localhost:3001/accountsreceivables/create_accountsreceivables",
        accountsReceivablesinsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setAccountsReceivablesForm((prev) => [...prev, accountsReceivablesinsert]);
      });

      setShow(false);

      notify1("Accounts receivables created successfully")
   
  };

  const notify =  (message) => toast(message);

  const handleDelete = async (id) => {
    axios
      .delete(
        `http://localhost:3001/accountsreceivables/delete-accountsreceivables/${id}`
      )
      .then(() => {
        console.log("Data successfully deleted!");

        setAccountsReceivablesForm((prevaccountsReceivablesForm) =>
          prevaccountsReceivablesForm.filter((item) => item._id !== id)
        );
        notify("Account Receivables Deleted Successfully")
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const notify4 = (message) => toast(message);


  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/accountsreceivables/update-accountsreceivables/${accountsReceivablesEdit._id}`,
        accountsReceivablesEdit
      )
      .then((res) => {
        console.log({ status: res.status });
        // update userform
        handleClose();
      })
      .catch((error) => {
        console.error(" Error updating item:", error);
      });

      setShow(false);

      notify4("Accounts receivables edited successfully")
  };


  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/accountsreceivables/generate-csv",
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
            <b>ACCOUNTS RECEIVABLES</b>
          </a>
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
        <Modal.Header closeButton>
          <Modal.Title>ACCOUNTS RECEIVABLES</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label"> customer_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="customer_information"
                  id="customer_information"
                  value={accountsReceivablesForm.customer_information}
                  onChange={(event) => {
                    setCustomersInformation(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">invoice_details</label>
                <input
                  type="text"
                  className="form-control"
                  name="invoice_details"
                  id="invoice_details"
                  value={accountsReceivablesForm.invoice_details}
                  onChange={(event) => {
                    setInvoiceDetails(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">payment_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="payment_information"
                  id="payment_information"
                  value={accountsReceivablesForm.payment_information}
                  onChange={(event) => {
                    setPaymentInformation(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">accounting_codes</label>
                <input
                  type="text"
                  className="form-control"
                  name="accounting_codes"
                  id="accounting_codes"
                  value={accountsReceivablesForm.accounting_codes}
                  onChange={(event) => {
                    setAccountingCodes(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">aging_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="aging_information"
                  id="aging_information"
                  value={accountsReceivablesForm.aging_information}
                  onChange={(event) => {
                    setAgingInformation(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> payment_history</label>
                <input
                  type="text"
                  className="form-control"
                  name=" payment_history"
                  id=" payment_history"
                  value={accountsReceivablesForm.payment_history}
                  onChange={(event) => {
                    setPaymentHistory(event.target.value);
                  }}
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

      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>EDIT</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label"> customer_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="customer_information"
                  id="customer_information"
                  value={accountsReceivablesEdit.customer_information}
                  onChange={(e) =>
                    setAccountsReceivablesEdit({
                      ...accountsReceivablesEdit,
                      customer_information: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">invoice_details</label>
                <input
                  type="text"
                  className="form-control"
                  name="invoice_details"
                  id="invoice_details"
                  value={accountsReceivablesEdit.invoice_details}
                  onChange={(e) =>
                    setAccountsReceivablesEdit({
                      ...accountsReceivablesEdit,
                      invoice_details: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">payment_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="payment_information"
                  id="payment_information"
                  value={accountsReceivablesEdit.payment_information}
                  onChange={(e) =>
                    setAccountsReceivablesEdit({
                      ...accountsReceivablesEdit,
                      payment_information: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">accounting_codes</label>
                <input
                  type="text"
                  className="form-control"
                  name="accounting_codes"
                  id="accounting_codes"
                  value={accountsReceivablesEdit.accounting_codes}
                  onChange={(e) =>
                    setAccountsReceivablesEdit({
                      ...accountsReceivablesEdit,
                      accounting_codes: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">aging_information</label>
                <input
                  type="text"
                  className="form-control"
                  name="aging_information"
                  id="aging_information"
                  value={accountsReceivablesEdit.aging_information}
                  onChange={(e) =>
                    setAccountsReceivablesEdit({
                      ...accountsReceivablesEdit,
                      aging_information: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> payment_history</label>
                <input
                  type="text"
                  className="form-control"
                  name=" payment_history"
                  id=" payment_history"
                  value={accountsReceivablesEdit.payment_history}
                  onChange={(e) =>
                    setAccountsReceivablesEdit({
                      ...accountsReceivablesEdit,
                      payment_history: e.target.value,
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
            <th>customer_information</th>
            <th> invoice_details</th>
            <th>payment_information</th>
            <th> accounting_codes</th>
            <th> aging_information</th>
            <th> payment_history</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {accountsReceivablesForm.map((accountsreceivables, index) => {
            return (
              <tr key={index}>
                <td>{accountsreceivables.customer_information}</td>
                <td>{accountsreceivables.invoice_details}</td>
                <td>{accountsreceivables.payment_information}</td>
                <td>{accountsreceivables.accounting_codes}</td>
                <td>{accountsreceivables.aging_information}</td>
                <td>{accountsreceivables.payment_history}</td>

                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(accountsreceivables);
                    }}
                  >
                    Edit
                  </Button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(accountsreceivables._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default AccountsReceivables;
