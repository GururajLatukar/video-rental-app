import React from "react";

const Navbar = ({ count }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Navbar <span className="badge badge-pill badge-secondary">{count}</span>
      </a>
    </nav>
  );
};

export default Navbar;
