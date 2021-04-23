import React, { useContext, useState } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import { Link, useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import logo from "./../../Users/Pages/logo.png";
import { LoginContext } from "../../Context/LoginContext";
import ChangePassword from "../../Users/Components/ChangePassword";

const NavBar: React.FC = () => {
  const history = useHistory();

  const isMobileDevice = useMediaQuery({
    query: "(max-device-width: 1200px)",
  });

  const isDesktopDevice = useMediaQuery({
    query: "(min-device-width: 1200px)",
  });

  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  const [, setLogin] = useContext(LoginContext);

  const [changePassword, setChangePassword] = useState<boolean>(false);

  const logout = () => {
    setLogin({ isLoggedIn: false, username: "", userId: -1, role: "" });
    history.push("/");
  };

  return (
    <div>
      <Navbar
        fixed="top" //sticky="top"
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
      >
        <Link to="/user_dashboard">
          <Image
            src={logo}
            rounded
            width="40px"
            height="40px"
            className="mr-3"
          />
        </Link>

        {isDesktopDevice && (
          <Navbar.Brand href="/user_dashboard">Project Manager</Navbar.Brand>
        )}

        {isMobileDevice &&
          (isPortrait ? (
            <Navbar.Brand href="/user_dashboard">PM</Navbar.Brand>
          ) : (
            <Navbar.Brand href="/user_dashboard">Project Manager</Navbar.Brand>
          ))}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              href="Project Manager"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                history.push("/user_dashboard");
              }}
            >
              Dashboard
            </Nav.Link>

            <NavDropdown
              title={localStorage.getItem("username")}
              id="collasible-nav-dropdown"
              alignRight
              drop="down"
            >
              <div onClick={() => setChangePassword(true)}>
                <NavDropdown.Item>Change Password</NavDropdown.Item>
              </div>
              <NavDropdown.Divider />
              <div onClick={logout}>
                <NavDropdown.Item>Log out</NavDropdown.Item>
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <ChangePassword
        show={changePassword}
        onHide={() => setChangePassword(false)}
        title="Change Password"
      />
    </div>
  );
};

export default NavBar;
