import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
const Sidebar = (props) => {
  return (
    <div className="col-lg-3 my-lg-0 my-md-1">
      <div id="sidebar" className="bg-purple">
        <div className="h4 text-white">Account</div>
        <ul>
          <li className="active">
            <Link
              to="/profile"
              className="text-decoration-none d-flex align-items-start"
            >
              <div className="fas fa-box pt-2 me-3" />
              <div className="d-flex flex-column">
                <div className="link">My Account</div>
                <div className="link-desc">
                  View &amp; Manage orders and returns
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
