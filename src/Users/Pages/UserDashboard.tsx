import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import Navbar from "../../Shared/Components/NavBar";
import Notice from "../../Shared/Components/Notice";
import Footer from "../../Shared/Components/Footer";
import { LoginContext } from "../../Context/LoginContext";
import UserList from "../Components/UserList";
import AddUser from "../Components/AddUser";
import AddProject from "../../Projects/Components/AddProject";
import ProjectList from "../../Projects/Components/ProjectList";

const UserDashboard: React.FC = () => {
  const history = useHistory();

  const [login] = useContext(LoginContext);

  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    if (!login.isLoggedIn && localStorage.getItem("username") === "") {
      history.push("/");
    }
  }, []);

  return (
    <div>
      <div style={{ minHeight: "calc(100vh - 70px" }}>
        <Navbar />
        <div style={{ paddingTop: "60px" }}>
          <div>
            <Container className="d-flex justify-content-between felx-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">
                {login.role === "admin" ||
                localStorage.getItem("role") === "admin"
                  ? "Admin Dashboard"
                  : "Dashboard"}
              </h1>
            </Container>
          </div>

          <Container>
            {success !== "" && success !== undefined && (
              <div style={{ paddingBottom: "5px" }}>
                <Notice
                  variant="success"
                  msg={success}
                  clearError={() => setSuccess("")}
                />
              </div>
            )}
          </Container>

          {localStorage.getItem("role") === "admin" && (
            <>
              <Container>
                <div style={{ paddingBottom: "10px" }}>
                  <h3 className="h4">User Management</h3>
                </div>
                <AddUser />
                <UserList />
              </Container>
              <Container>
                <hr />
              </Container>
            </>
          )}

          <Container>
            <div style={{ paddingBottom: "10px" }}>
              <h3 className="h4">Project Management</h3>
            </div>
            <AddProject />
            <ProjectList />
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
