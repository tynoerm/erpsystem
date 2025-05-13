import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { AiFillSchedule, AiFillRedEnvelope, AiFillControl, AiFillLayout } from 'react-icons/ai';

function MainDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = location.state?.role || localStorage.getItem('userRole');
  const department = location.state?.dep || localStorage.getItem('userDepartment');

  const cards = [
    {
      icon: <AiFillSchedule size={40} color="#2c3e50" />,
      title: 'SUPPLY CHAIN MANAGEMENT',
      link: '/SupplyChainManagementDashboard',
      departmentKey: 'supply_chain',
    },
    {
      icon: <AiFillRedEnvelope size={40} color="#2c3e50" />,
      title: 'SALES & CUSTOMER RELATION',
      link: '/SalesCustomerRelation',
      departmentKey: 'sales',
    },
    {
      icon: <AiFillControl size={40} color="#2c3e50" />,
      title: 'WAREHOUSE',
      link: '/ManufacturingProductionDashboard',
      departmentKey: 'warehouse',
    },
    {
      icon: <AiFillLayout size={40} color="#2c3e50" />,
      title: 'HUMAN RESOURCES',
      link: '/HumanResourcesDashboard',
      departmentKey: 'hr',
    },
    {
      icon: <AiFillLayout size={40} color="#2c3e50" />,
      title: 'USER MANAGEMENT',
      link: '/Register',
      departmentKey: 'admin',
    },
  ];

  const filteredCards =
    role?.toLowerCase() === 'admin'
      ? cards
      : cards.filter((card) => card.departmentKey.toLowerCase() === department?.toLowerCase());

  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-4">
        <div className="container-fluid">
          <h1 className="navbar-brand">
            <MdDashboard /> Dashboard
          </h1>
          <button className="btn btn-danger" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>

      <div className="container py-4">
        <div className="row g-4">
          {filteredCards.map((card, idx) => (
            <div className="col-md-4" key={idx}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '15px',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)';
                }}
              >
                <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-4">
                  <div
                    className="d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: '#f0f2f5',
                    }}
                  >
                    {card.icon}
                  </div>
                  <h5 className="card-title mb-3 fw-semibold text-dark text-center">{card.title}</h5>
                  <Link
                    to={card.link}
                    className="btn btn-outline-primary fw-semibold"
                    style={{ borderRadius: '30px', padding: '8px 20px' }}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

             <footer className="text-white bg-dark text-center p-2 fixed-bottom">
        &copy; Freight Marks Logistics. All rights reserved.
      </footer>
      </div>
    </>
  );
}

export default MainDashboard;
