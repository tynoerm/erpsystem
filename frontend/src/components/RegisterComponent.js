import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiArchiveRegister } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../images/fmslogin.jpg";
import nav from "../images/nav.jpeg";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const notify = () => toast("Account registration successful, kindly login!");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, fullname, email, role, department, password };
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        notify();
        navigate("/AdminComponent");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again later.");
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const navbarStyle = {
    backgroundImage: `url(${nav})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginImage})`,
        backgroundSize: "cover",
        height: "100vh",
        backgroundPosition: "center",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ToastContainer />
      <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>Registration Section</b>
        </a>
        <div className="ms-auto">
          <button className="btn btn-primary" onClick={handleBack}>
            BACK
          </button>
        </div>
      </nav>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ flex: 1 }}
      >
        <div
          className="col-md-6 col-lg-4 shadow-lg p-4 mb-5 bg-white rounded"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <h5 className="text-center mb-4">
            <GiArchiveRegister /> <strong>Freight Marks Logistics</strong>
          </h5>
          <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex mb-3">
              <div className="form-group me-3">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  className="form-control"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>
            </div>


            <div className="form-group mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Role:</label>
              <select
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label>Department:</label>
              <select
                className="form-control"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                <option value="supply_chain">Supply Chain</option>
                <option value="warehouse">Warehouse</option>
                <option value="hr">HR</option>
                <option value="admin">Admin</option>
                <option value="sales">Sales</option>
              </select>
            </div>
            <div className="form-group mb-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
