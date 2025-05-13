import React from "react";
import { Link } from "react-router-dom";
import { AiFillSchedule } from "react-icons/ai";
import { BsAwardFill } from "react-icons/bs";
import { AiFillRedEnvelope } from "react-icons/ai";
import { FcFactory } from "react-icons/fc";
import { AiFillControl } from "react-icons/ai";
import { AiFillLayout } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import nav from "../images/nav.jpeg";





const supplyChainManagementManager = () => {
  const navbarStyle = {
    backgroundImage: `url(${nav})`, // Set the background image
    backgroundSize: "cover", // Ensure the image covers the entire navbar
    backgroundPosition: "center", // Center the background image
    color: "black", // Set text color
  };

  return (
    <div>
      <nav
        className="navbar bg-body-tertiary bg-dark border-bottom border-body"
        style={navbarStyle}
      >
        <a className="navbar-brand" style={{ color: "white" }}>
          <b>
            {" "}
            <MdDashboard /> &nbsp;MANAGER DASHBOARD{" "}
          </b>
        </a>
      </nav>

      <div>

        
        <div class="row row-cols-1 row-cols-md-3 shadow p-3 mb-5 bg-body rounded">
          <div class="col mb-3 shadow-sm p-3 mb-5 bg-body rounded">
            <div class="card shadow p-3 mb-5 bg-body rounded">
              <div class="card-body ">
                <h5 class="card-title">
                  <AiFillSchedule /> &nbsp; SUPPLY CHAIN MANAGEMENT
                </h5>
                <p class="card-text">
                  supply chain, encompassing procurement, inventory management,
                  order fulfillment, demand planning, logistics, and supplier
                  relationship management.{" "}
                </p>
                <Link
                  to="/SupplyChainManagementDashboardManager"
                  type="button"
                  class="btn btn-primary"
                >
                  {" "}
                  Next{" "}
                </Link>
              </div>
            </div>
          </div>
          
        
        
          
        </div>
      </div>
    </div>
  );
};

export default supplyChainManagementManager;
