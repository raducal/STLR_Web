import React from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const authLinks = (
    <React.Fragment>
      <li>
        <a onClick={handleLogout} href="#!">
          Logout
        </a>
      </li>
    </React.Fragment>
  );

  // const guestLinks = (
  //   <React.Fragment>
  //     <li>
  //       <Link to="/">Home</Link>
  //     </li>
  //   </React.Fragment>
  // );
  return (
    <React.Fragment>
      {isAuthenticated ? (
        <nav className="navbar-other">
          <div className="nav-container">
            <div className="navbar-logo">
              {/* <h3>STLR</h3> */}
              <div className="logo"></div>
            </div>
            <ul className="nav-links">{authLinks}</ul>
          </div>
        </nav>
      ) : (
        <nav className="navbar-main">
          <div className="nav-container">
            <div className="navbar-logo">
              {/* <h3>STLR</h3> */}
              <div className="logo"></div>
            </div>
            {/* <ul className="nav-links">{guestLinks}</ul> */}
          </div>
        </nav>
      )}
    </React.Fragment>
  );
};

// return (
//   <nav className="navbar">
//     <div className="nav-container">
//       <div className="navbar-logo">
//         {/* <h3>STLR</h3> */}
//         <div className="logo"></div>
//       </div>
//       <ul className="nav-links">
//         {isAuthenticated ? authLinks : guestLinks}
//       </ul>
//     </div>
//   </nav>
// );
export default Navbar;
