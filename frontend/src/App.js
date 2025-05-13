// App.jsx
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import EmailForm from './EmailForm';
import LoginComponent from './components/LoginComponent';
import MainDashboard from './components/MainDashboard';  // ✅ FIXED import
import Register from './components/RegisterComponent';
import AdminUserManagement from './components/AdminUserManagement';
import SupplyChainManagementDashboard from './SupplyChainManagement/Dashboard';
import Procurement from './SupplyChainManagement/Procurement';
import LogisticsandShipping from './SupplyChainManagement/LogisticsandShipping';
import InventoryManagement from './SupplyChainManagement/InventoryManagement';
import HumanResourcesDashboard from './HumanResources/Dashboard';
import Payroll from './HumanResources/Payroll';
import NotFound from './NotFound';
import CustomerForm from './SalesCustomerRelation/CustomerForm.js';
import FinanceAccountingDashboard from './FinanceAccounting/Dashboard';
import AccountsPayables from './FinanceAccounting/AccountsPayables';
import AccountsReceivables from './FinanceAccounting/AccountsReceivables';
import ExpenseAccount from './FinanceAccounting/ExpenseAccount';
import SalesCustomerRelation from './SalesCustomerRelation/Dashboard';
import ManufacturingProductionDashboard from './ManufacturingProduction/Dashboard';
import { UserProvider } from './UserContext.js';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = (role) => {
    setLoggedIn(true);
    setUserRole(role);
    setError('');
  };

  const logout = () => {
    setLoggedIn(false);
    setUserRole('');
    setUsername('');
    setPassword('');
  };

  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* Login Route */}
          <Route 
            path="/" 
            element={<LoginComponent setLoggedIn={setLoggedIn} login={login} />} 
          />

          {/* Register Route */}
          <Route path="Register" element={<Register />} />

          {/* Main Dashboard Route (accessible if logged in) */}
          <Route 
            path="MainDashboard" 
            element={loggedIn ? <MainDashboard /> : <Navigate to="/" />} 
          />

          {/* Admin User Management (admin only) */}
          <Route 
            path="AdminUserManagement" 
            element={loggedIn && userRole === 'admin' ? <AdminUserManagement /> : <Navigate to="/" />} 
          />

          {/* Supply Chain Management Routes */}
          <Route 
            path="SupplyChainManagementDashboard" 
            element={loggedIn ? <SupplyChainManagementDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="Procurement" 
            element={loggedIn ? <Procurement /> : <Navigate to="/" />} 
          />
          <Route 
            path="LogisticsandShipping" 
            element={loggedIn ? <LogisticsandShipping /> : <Navigate to="/" />} 
          />
          <Route 
            path="InventoryManagement" 
            element={loggedIn ? <InventoryManagement /> : <Navigate to="/" />} 
          />

          {/* Human Resources Routes */}
          <Route 
            path="HumanResourcesDashboard" 
            element={loggedIn ? <HumanResourcesDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="Payroll" 
            element={loggedIn ? <Payroll /> : <Navigate to="/" />} 
          />
 

          {/* Finance and Accounting Routes */}
          <Route 
            path="FinanceAccountingDashboard" 
            element={loggedIn ? <FinanceAccountingDashboard /> : <Navigate to="/" />} 
          />
          <Route 
            path="AccountsPayables" 
            element={loggedIn ? <AccountsPayables /> : <Navigate to="/" />} 
          />
          <Route 
            path="AccountsReceivables" 
            element={loggedIn ? <AccountsReceivables /> : <Navigate to="/" />} 
          />
          <Route 
            path="ExpenseAccount" 
            element={loggedIn ? <ExpenseAccount /> : <Navigate to="/" />} 
          />

          {/* Sales & Customer Relation */}
          <Route 
            path="SalesCustomerRelation" 
            element={loggedIn ? <SalesCustomerRelation /> : <Navigate to="/" />} 
          />



          {/* Manufacturing Production */}
          <Route 
            path="ManufacturingProductionDashboard" 
            element={loggedIn ? <ManufacturingProductionDashboard /> : <Navigate to="/" />} 
          />

<Route path="CustomerForm" element={<CustomerForm/>} /> 

          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
