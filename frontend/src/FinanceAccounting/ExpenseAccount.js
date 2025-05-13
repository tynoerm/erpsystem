import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { FaFileCsv } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpenseAccount = () => {
  const [modalShow, setModalShow] = useState(false);
  const [expenseaccountForm, setExpenseAccountForm] = useState([]);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);

  const handleShow = () => setShow(true);
  const handleShow1 = (a) => {
    setShow1(true);
    setExpenseAccounEdit(a);
    console.log(a);
  };

  const [expenseaccountinsert, setExpenseAccountinsert] = useState({});
  const [expenseaccountEdit, setExpenseAccounEdit] = useState({});

  const [account_name, setAccountName] = useState("");
  const [account_number, setAccountNumber] = useState("");
  const [description, setDescription] = useState("");
  const [opening_balance, setOpeningBalance] = useState("");
  const [transactions, setTransaction] = useState("");
  const [debits_andcredits, setDebitsandCredits] = useState("");
  const [sub_accountsCategories, setSubaccountsCategories] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/expenseaccount/")
      .then((res) => {
        setExpenseAccountForm(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const notify3 = (message) => toast(message);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseaccountinsert = {
      account_name,
      account_number,
      description,
      opening_balance,
      transactions,
      debits_andcredits,
      sub_accountsCategories,
    };
    axios
      .post(
        "http://localhost:3001/expenseaccount/create_expenseaccount",
        expenseaccountinsert
      )
      .then((res) => {
        console.log({ status: res.status });
        setExpenseAccountForm((prev) => [...prev, expenseaccountinsert]);
      });
      setShow(false);
      notify3("expense deleted successfully");
      
  };

  const notify2 = (message) => toast(message);


  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:3001/expenseaccount/update-expenseaccount/${expenseaccountEdit._id}`,
        expenseaccountEdit
      )
      .then((res) => {
        console.log({ status: res.status });
        // update userform
        handleClose();
      })
      .catch((error) => {
        console.error(" Error updating item:", error);
      });
      setShow1(false);
      notify2("expense updated successfully");

  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/expenseaccount/generate-csv",
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

  const notify = (message) => toast(message);

  const handleDelete = async (id) => {
    axios
      .delete(
        `http://localhost:3001/expenseaccount/delete-expenseaccount/${id}`
      )
      .then(() => {
        console.log("Data successfully deleted!");

        setExpenseAccountForm((prevexpenseaccountForm) =>
          prevexpenseaccountForm.filter((item) => item._id !== id)
        );
        notify("Deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <nav class=" navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded">
        <div class="container-fluid">
          <a class="navbar-brand">
            <b>EXPENSE ACCOUNT</b>
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
          <Modal.Title>EXPENSE ACCOUNT</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label"> account_name</label>
                <input
                  type="text"
                  className="form-control"
                  name="account_name"
                  id="account_name"
                  value={expenseaccountForm.account_name}
                  onChange={(event) => {
                    setAccountName(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">account_number</label>
                <input
                  type="text"
                  className="form-control"
                  name="account_number"
                  id="account_number"
                  value={expenseaccountForm.account_number}
                  onChange={(event) => {
                    setAccountNumber(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">debits_andcredits</label>
                <input
                  type="text"
                  className="form-control"
                  name="debits_andcredits"
                  id="debits_andcredits"
                  value={expenseaccountForm.debits_andcredits}
                  onChange={(event) => {
                    setDebitsandCredits(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                  value={expenseaccountForm.description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">opening_balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="opening_balance"
                  id="opening_balance"
                  value={expenseaccountForm.opening_balance}
                  onChange={(event) => {
                    setOpeningBalance(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> transactions</label>
                <input
                  type="text"
                  className="form-control"
                  name=" transactions"
                  id=" transactions"
                  value={expenseaccountForm.transactions}
                  onChange={(event) => {
                    setTransaction(event.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> sub_accountsCategories</label>
                <input
                  type="text"
                  className="form-control"
                  name=" sub_accountsCategories"
                  id=" sub_accountsCategories"
                  value={expenseaccountForm.sub_accountsCategories}
                  onChange={(event) => {
                    setSubaccountsCategories(event.target.value);
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
                <label className="form-label"> account_name</label>
                <input
                  type="text"
                  className="form-control"
                  name="account_name"
                  id="account_name"
                  value={expenseaccountEdit.account_name}
                  onChange={(e) =>
                    setExpenseAccounEdit({
                      ...expenseaccountEdit,
                      account_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">account_number</label>
                <input
                  type="text"
                  className="form-control"
                  name="account_number"
                  id="account_number"
                  value={expenseaccountEdit.account_number}
                  onChange={(e) =>
                    setExpenseAccounEdit({
                      ...expenseaccountEdit,
                      account_number: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">debits_andcredits</label>
                <input
                  type="text"
                  className="form-control"
                  name="debits_andcredits"
                  id="debits_andcredits"
                  value={expenseaccountEdit.debits_andcredits}
                  onChange={(e) =>
                    setExpenseAccounEdit({
                      ...expenseaccountEdit,
                      debits_andcredits: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                  value={expenseaccountEdit.description}
                  onChange={(e) =>
                    setExpenseAccounEdit({
                      ...expenseaccountEdit,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">opening_balance</label>
                <input
                  type="text"
                  className="form-control"
                  name="opening_balance"
                  id="opening_balance"
                  value={expenseaccountEdit.opening_balance}
                  onChange={(e) =>
                    setExpenseAccounEdit({
                      ...expenseaccountEdit,
                      opening_balance: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> transactions</label>
                <input
                  type="text"
                  className="form-control"
                  name=" transactions"
                  id=" transactions"
                  value={expenseaccountEdit.transactions}
                  onChange={(e) =>
                    setExpenseAccounEdit({
                      ...expenseaccountEdit,
                      transactions: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label"> sub_accountsCategories</label>
                <input
                  type="text"
                  className="form-control"
                  name=" sub_accountsCategories"
                  id=" sub_accountsCategories"
                  value={expenseaccountEdit.sub_accountsCategories}
                  onChange={(e) =>
                    setExpenseAccounEdit({
                      ...expenseaccountEdit,
                      sub_accountsCategories: e.target.value,
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
            <th>account_name</th>
            <th> account_number</th>
            <th>debits_andcredits</th>
            <th> description</th>
            <th> opening_balance</th>
            <th> transactions</th>
            <th>sub_accountsCategories</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {expenseaccountForm.map((expenseaccount, index) => {
            return (
              <tr key={index}>
                <td>{expenseaccount.account_name}</td>
                <td>{expenseaccount.account_number}</td>
                <td>{expenseaccount.debits_andcredits}</td>
                <td>{expenseaccount.description}</td>
                <td>{expenseaccount.opening_balance}</td>
                <td>{expenseaccount.transactions}</td>
                <td>{expenseaccount.sub_accountsCategories}</td>

                <td>
                  <Button
                    variant="btn btn-primary"
                    onClick={() => {
                      handleShow1(expenseaccount);
                    }}
                  >
                    Edit
                  </Button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(expenseaccount._id)}
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
export default ExpenseAccount;
