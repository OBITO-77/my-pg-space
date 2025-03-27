import React from "react";
import "../../styles/HomeStyles/Header.css";

function Header() {
  return (
    <header>
      <div className="logo">My PG Space</div>
      <nav>
        <ul>
          <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="#pgs">PGs</a>
          </li>
          <li>
            <a href="/find-roommate">Find Roommate</a>
          </li>
          <li>
            <a href="/">CONTACT</a>
          </li>
        </ul>
      </nav>
      {/* <div className="user-actions">
        <button>
          <a href="/login">Login</a>
        </button>
      </div> */}
    </header>
  );
}

export default Header;
