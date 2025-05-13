// components/LoginComponent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function LoginComponent({ setLoggedIn, login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });

      const { role, department } = response.data;

      if (response.status === 200 && role) {
        setLoggedIn(true);
        login(role);
        toast.success('Login successful');
        navigate('/MainDashboard', { state: { role, dep: department } });
      } else {
        toast.error('Invalid credentials');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav
        className="navbar border-bottom shadow-lg p-3 mb-0 rounded"
        style={{ backgroundColor: 'purple' }}
      >
        <div className="container-fluid">
          <span className="navbar-brand text-white">
            <b>AUTHENTICATION SECTION</b>
          </span>
            <div className="ms-auto">
                                    <Link to="/CustomerForm" className="btn btn-primary">SUBMIT A QUERY</Link>
                                  </div>
        </div>
      </nav>


      <div
        className="d-flex justify-content-center align-items-center bg-light"
        style={{ height: 'calc(100vh - 70px)' }} // subtract navbar height (adjust if needed)
      >
        <div className="card p-4 shadow" style={{ width: '400px' }}>
          <ToastContainer />
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
        <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Freight Marks Logistics. All rights reserved.
      </footer>
      </div>
    </>
  );
}

export default LoginComponent;
