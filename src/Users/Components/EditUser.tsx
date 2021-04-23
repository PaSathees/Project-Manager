import React, { useContext, useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Notice from "../../Shared/Components/Notice";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NoticeModal from "../../Shared/Components/NoticeModal";
import { UserContext } from "../../Context/UserContext";

interface modal {
  modalShow: boolean;
  modalMessage: string;
}

interface props {
  show: boolean;
  title: string;
  onHide: () => void;
  userId: number;
}

const EditUser: React.FC<props> = (props) => {
  const [success, setSuccess] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [password, setPassword] = useState<string>("");

  const [users, setUsers] = useContext(UserContext);

  const [modal, setModal] = useState<modal>({
    modalShow: false,
    modalMessage: "",
  });

  useEffect(() => {
    const currentUser = users.find(
      (user: { userId: number }) => user.userId === props.userId
    );
    if (currentUser !== undefined) {
      setUsername(currentUser.username);
      setPassword(currentUser.password);
      setRole(currentUser.role);
    }
  }, [props.userId]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === "") {
      setModal({
        modalShow: true,
        modalMessage: "Please enter a username",
      });
    } else if (password.trim() === "") {
      setModal({
        modalShow: true,
        modalMessage: "Please enter a password",
      });
    } else {
      if (localStorage.getItem("role") === "admin") {
        const newUsers = [...users];
        const currentUserIndex = newUsers.findIndex(
          (userStored) => userStored.userId === props.userId
        );
        newUsers[currentUserIndex].username = username;
        newUsers[currentUserIndex].role = role;
        newUsers[currentUserIndex].password = password;
        setUsers(newUsers);
        setSuccess("User updated successfully");
        setTimeout(() => {
          setSuccess("");
          props.onHide();
        }, 1000);
      } else {
        setModal({
          modalShow: true,
          modalMessage: "You are not authorized to make this change",
        });
      }
    }
  };

  const deleteUser = (userId: number) => {
    const newUsers = users.filter(
      (user: { userId: number }) => user.userId !== userId
    );
    setUsers(newUsers);
    setSuccess("User deleted successfully");
    setTimeout(() => {
      setSuccess("");
      props.onHide();
    }, 1000);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title} : {props.userId}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success !== "" && success !== undefined && (
          <div style={{ paddingBottom: "5px" }}>
            <Notice
              variant="success"
              msg={success}
              clearError={() => setSuccess("")}
            />
          </div>
        )}
        <Form onSubmit={submit}>
          <Form.Group as={Row} controlId="formBasicUsername">
            <Form.Label column sm={2}>
              Username*
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
          </Form.Group>

          <fieldset>
            <Form.Group as={Row} controlId="formHorizontal">
              <Form.Label column sm={2}>
                User role*
              </Form.Label>
              <Col sm={10}>
                <div key="inline-radio" className="mt-1">
                  <Form.Check
                    inline
                    label="Admin"
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === "admin"}
                    onChange={(e) => setRole(e.target.value)}
                    id="inline-radio-1"
                  />
                  <Form.Check
                    inline
                    label="User"
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === "user"}
                    onChange={(e) => setRole(e.target.value)}
                    id="inline-radio-2"
                  />
                </div>
              </Col>
            </Form.Group>
          </fieldset>

          <Form.Group as={Row} controlId="formHorizontal">
            <Form.Label column sm={2}>
              Password*
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button type="submit" size="lg" block>
            Update User
          </Button>
        </Form>
        <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
          <Button
            size="lg"
            variant="danger"
            block
            onClick={() => {
              deleteUser(props.userId);
            }}
          >
            Delete User
          </Button>
        </div>
        <NoticeModal
          show={modal.modalShow}
          onHide={() => setModal({ modalShow: false, modalMessage: "" })}
          title="Attention!"
          message={modal.modalMessage}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditUser;
