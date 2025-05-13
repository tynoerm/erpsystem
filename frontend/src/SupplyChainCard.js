import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillSchedule } from 'react-icons/ai';

const SupplyChainCard = () => {
  return (
    <div className="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
      <div className="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
        <div className="card shadow p-3 mb-5 bg-body rounded">
          <div className="card-body">
            <h5 className="card-title">
              <AiFillSchedule /> &nbsp; SUPPLY CHAIN MANAGEMENT
            </h5>
            <p className="card-text">
              Supply chain, encompassing procurement, inventory management,
              order fulfillment, demand planning, logistics, and supplier
              relationship management.
            </p>
            <Link
              to="/SupplyChainManagementDashboardManager"
              type="button"
              className="btn btn-primary"
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainCard;
