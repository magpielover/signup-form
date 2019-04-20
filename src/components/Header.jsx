import React from "react";
import Navbar from "react-bootstrap/Navbar";

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar variant="dark">
          <Navbar.Brand href="#">
            <img
              alt=""
              width="32"
              height="32"
              className="d-inline-block align-top"
            />
            {"Digia kilpailu"}
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}
