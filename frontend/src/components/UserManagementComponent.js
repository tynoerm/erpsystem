import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiArchiveRegister } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginImage from "../images/insurance2.jpeg"
import nav from "../images/nav.jpeg";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const notify = () => toast("Account registration successful, kindly login!");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = { username, fullname, email, role, password };
    try {
      const response = await fetch("https://enterprise-resource-planning.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        notify(); // Notify user upon successful registration
       // navigate("/");  // Navigate to the login component after successful registration
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please try again later.");
    }
  };

  const navbarStyle = {
    backgroundImage: `url(${nav})`, // Set the background image
    backgroundSize: "cover", // Ensure the image covers the entire navbar
    backgroundPosition: "center", // Center the background image
    color: "black", // Set text color
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
      <ToastContainer /> {/* Render the toast notifications container */}
      <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body shadow-lg p-3 mb-5 bg-body rounded"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>REGISTRATION SECTION</b>
        </a>
      </nav>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ flex: 1 }}
      >
        <div
          className="col-md-5 shadow-lg p-3 mb-5 bg-body rounded"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        >
          <h5 className="shadow-sm p-3 mb-5 bg-body rounded">
            <GiArchiveRegister /> &nbsp; FREIGHT MARKS LOGISTICS
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
              <label>Fullname:</label>
              <input
                type="text"
                className="form-control"
              
                value={fullname}
                onChange={(event) => setFullname(event.target.value)}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
               
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <label>Role:</label>
              <select
                className="form-control"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="client">Client</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              
              </select>
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
               
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>
            <div className="fw-bold">
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
