import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./components.css";

export default function Nav() {
  const [showTabs, setShowTabs] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("mytoken")) {
      setShowTabs(true);
    }
  },[]);

  return (
    <div>
      <div className="topnav">
        <ul>
          <h1 className="title">ToDo</h1>
          {/* <li className='title'><h1>ToDo</h1></li> */}
          {showTabs && (
            <>
              <li className="navitems log">
                <Link
                  to={"/"}
                  onClick={() => {
                    setShowTabs(false)
                    window.localStorage.clear();
                  }}
                >
                  <b>logout</b>
                </Link>
              </li>

              <div className="midnav">
                <li className="navitems">
                  <Link to={"/home"}>
                    <b>Home</b>
                  </Link>
                </li>
                <li className="navitems">
                  <Link to={"/complete"}>
                    <b>Completed</b>
                  </Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
