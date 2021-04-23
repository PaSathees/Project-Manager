import React, { useContext, useState } from "react";
import "./Login.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import logo from "./logo.png";
import NoticeModal from "../../Shared/Components/NoticeModal";

import { UserContext } from "./../../Context/UserContext";
import { LoginContext } from "./../../Context/LoginContext";
import { useHistory } from "react-router";

interface modal {
  modalShow: boolean;
  modalMessage: string;
}

const Login: React.FC = () => {
  const history = useHistory();

  const [users] = useContext(UserContext);
  const [, setLogin] = useContext(LoginContext);

  const [modal, setModal] = useState<modal>({
    modalShow: false,
    modalMessage: "",
  });
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim() === "") {
      setModal({
        modalShow: true,
        modalMessage: "Please enter the username",
      });
    } else if (password.trim() === "") {
      setModal({
        modalShow: true,
        modalMessage: "Please enter the password",
      });
    } else {
      const user = users.find(
        (user: { username: string }) => user.username === username
      );
      if (user === undefined) {
        setModal({
          modalShow: true,
          modalMessage: "User account not found, Please check your username",
        });
      } else {
        if (user.password === password) {
          setLogin({
            isLoggedIn: true,
            username: user.username,
            userId: user.userId,
            role: user.role,
          });
          localStorage.setItem("username", user.username);
          localStorage.setItem("role", user.role);
          localStorage.setItem("userId", user.userId);

          history.push("/user_dashboard");
        } else {
          setModal({
            modalShow: true,
            modalMessage: "Password incorrect, Please check your password",
          });
        }
      }
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="login-container">
        <div className="text-center" style={{ height: "100%" }}>
          <div className="align-vertical">
            <Form onSubmit={submit} className="form-signin">
              <img
                width={150}
                height={150}
                className="mb-4"
                src={logo}
                alt="logo"
              />
              <h1 className="h3 font-weight-normal">Project Manager</h1>
              <h2 className="h4 mb-3 font-weight-normal">
                Project Management made easy!
              </h2>
              <Form.Group controlId="formBasicUsername">
                <Form.Label className="sr-only">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="sr-only">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="btn btn-lg btn-primary btn-block" type="submit">
                Log in
              </Button>
              <p className="mt-5 mb-3 text-muted">iTelaSoft &copy; 2021</p>
            </Form>
          </div>
        </div>
      </div>
      <NoticeModal
        show={modal.modalShow}
        onHide={() => setModal({ modalShow: false, modalMessage: "" })}
        title="Attention!"
        message={modal.modalMessage}
      />
    </div>
  );
};

export default Login;
