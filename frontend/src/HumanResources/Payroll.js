import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaFileCsv } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Payroll = () => {

   const [modalShow, setModalShow] = useState(false);
   const [payrollForm, setPayrollForm] = useState([]);
   const [show, setShow] = useState(false);
   const [show1, setShow1] = useState(false);
   const handleClose = () => setShow(false);
   const handleClose1 = () => setShow1(false);
   const handleShow = () => setShow(true);
   const handleShow1 = (a) => { setShow1(true); setPayrollEdit(a); }

   const [payrollinsert, setPayrollinsert] = useState({});
   const [payrollEdit, setPayrollEdit] = useState({})

   const [employee_name, setEmployee_name] = useState("");
   const [employee_status, setEmployee_status] = useState("");
   const [job_title, setJob_title] = useState("");
   const [base_salary, setBase_salary] = useState("");
   const [bonuses, setBonuses] = useState("");
   const [deductions_medicalcontribution, setDeductions_medicalcontribution] = useState("");
   const [banking_details, setBanking_details] = useState("");

   useEffect(() => {
      axios
         .get("http://localhost:3001/payroll/")
         .then((res) => {
            setPayrollForm(res.data.data);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   const notify1 = (message) => toast(message);

   const handleSubmit = (e) => {
      e.preventDefault();
      const payrollData = { employee_name, employee_status, job_title, base_salary, bonuses, deductions_medicalcontribution, banking_details }
      axios
         .post("http://localhost:3001/payroll/create-payroll", payrollData)
         .then((res) => {
            setPayrollForm(prev => [...prev, payrollData]);
         });
      setShow(false);
      notify1("Created successfully");
   };

   const notify2 = (message) => toast(message);

   const handleUpdate = (e) => {
      e.preventDefault();
      axios
         .put(`http://localhost:3001/payroll/update-payroll/${payrollEdit._id}`, payrollEdit)
         .then((res) => {
            handleClose();
         })
         .catch((error) => {
            console.error("Error updating item:", error);
         });
      setShow(false);
      notify2("Edited successfully");
   };

   const notify = (message) => toast(message);

   const handleDelete = async (id) => {
      axios
         .delete(`http://localhost:3001/payroll/delete-payroll/${id}`)
         .then(() => {
            setPayrollForm(prevpayrollForm => prevpayrollForm.filter(item => item._id !== id));
         })
         .catch((error) => {
            console.log(error);
         });
      setShow(false);
      notify("Deleted successfully");
   };

   const handleDownload = async () => {
      try {
         const response = await axios.get("http://localhost:3001/payroll/generate-csv", { responseType: "blob" });
         const url = window.URL.createObjectURL(new Blob([response.data]));
         const link = document.createElement("a");
         link.href = url;
         link.setAttribute("download", "payroll_data.csv");
         document.body.appendChild(link);
         link.click();
      } catch (error) {
         console.error("Error downloading CSV:", error);
      }
   };

   return (
      <div>
         <ToastContainer />
         <nav className="navbar bg-dark p-3 mb-5">
         <span className="navbar-brand text-white">
            <b>PAYROLL</b>
          </span>
            <div className="ms-auto">
                      <Link to="/HumanResourcesDashboard" className="btn btn-primary">BACK</Link>
                    </div>

         </nav>

         <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleDownload}>
               <FaFileCsv /> &nbsp;Reports
            </button>
            <Button variant="btn btn-success" onClick={handleShow}>Create + 1</Button>
         </div>

         {/* Modal for Adding Payroll */}
         <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
               <Modal.Title>CREATE PAYROLL</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                     <label className="form-label">Employee Name</label>
                     <input type="text" className="form-control" value={employee_name} onChange={(e) => setEmployee_name(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Employee Status</label>
                     <input type="text" className="form-control" value={employee_status} onChange={(e) => setEmployee_status(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Job Title</label>
                     <input type="text" className="form-control" value={job_title} onChange={(e) => setJob_title(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Base Salary</label>
                     <input type="number" className="form-control" value={base_salary} onChange={(e) => setBase_salary(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Bonuses</label>
                     <input type="number" className="form-control" value={bonuses} onChange={(e) => setBonuses(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Medical Contribution Deductions</label>
                     <input type="number" className="form-control" value={deductions_medicalcontribution} onChange={(e) => setDeductions_medicalcontribution(e.target.value)} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Banking Details</label>
                     <input type="text" className="form-control" value={banking_details} onChange={(e) => setBanking_details(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
               </form>
            </Modal.Body>
         </Modal>

         {/* Modal for Editing Payroll */}
         <Modal show={show1} onHide={handleClose1} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
               <Modal.Title>EDIT PAYROLL</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                     <label className="form-label">Employee Name</label>
                     <input type="text" className="form-control" value={payrollEdit.employee_name} onChange={(e) => setPayrollEdit({ ...payrollEdit, employee_name: e.target.value })} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Employee Status</label>
                     <input type="text" className="form-control" value={payrollEdit.employee_status} onChange={(e) => setPayrollEdit({ ...payrollEdit, employee_status: e.target.value })} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Job Title</label>
                     <input type="text" className="form-control" value={payrollEdit.job_title} onChange={(e) => setPayrollEdit({ ...payrollEdit, job_title: e.target.value })} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Base Salary</label>
                     <input type="number" className="form-control" value={payrollEdit.base_salary} onChange={(e) => setPayrollEdit({ ...payrollEdit, base_salary: e.target.value })} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Bonuses</label>
                     <input type="number" className="form-control" value={payrollEdit.bonuses} onChange={(e) => setPayrollEdit({ ...payrollEdit, bonuses: e.target.value })} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Medical Contribution Deductions</label>
                     <input type="number" className="form-control" value={payrollEdit.deductions_medicalcontribution} onChange={(e) => setPayrollEdit({ ...payrollEdit, deductions_medicalcontribution: e.target.value })} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Banking Details</label>
                     <input type="text" className="form-control" value={payrollEdit.banking_details} onChange={(e) => setPayrollEdit({ ...payrollEdit, banking_details: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary">Update</button>
               </form>
            </Modal.Body>
         </Modal>

         {/* Payroll Table */}
         <table className="table table-striped table-bordered">
         <thead className="table-dark">
               <tr>
                  <th>Employee Name</th>
                  <th>Employee Status</th>
                  <th>Job Title</th>
                  <th>Base Salary</th>
                  <th>Bonuses</th>
                  <th>Medical Deductions</th>
                  <th>Banking Details</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {payrollForm.map((payroll, index) => (
                  <tr key={index}>
                     <td>{payroll.employee_name}</td>
                     <td>{payroll.employee_status}</td>
                     <td>{payroll.job_title}</td>
                     <td>{payroll.base_salary}</td>
                     <td>{payroll.bonuses}</td>
                     <td>{payroll.deductions_medicalcontribution}</td>
                     <td>{payroll.banking_details}</td>
                     <td>
                        <Button variant="btn btn-primary" onClick={() => handleShow1(payroll)}>Edit</Button>
                        <button className="btn btn-danger" onClick={() => handleDelete(payroll._id)}>Delete</button>
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

export default Payroll;
