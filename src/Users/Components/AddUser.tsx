import React, { useContext, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NoticeModal from "../../Shared/Components/NoticeModal";
import { UserContext } from "../../Context/UserContext";
import Notice from "../../Shared/Components/Notice";

interface modal {
  modalShow: boolean;
  modalMessage: string;
}

const AddUser: React.FC = () => {
  const [success, setSuccess] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const [password, setPassword] = useState<string>("");

  const [users, setUsers] = useContext(UserContext);

  const [modal, setModal] = useState<modal>({
    modalShow: false,
    modalMessage: "",
  });
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
        let maxUserId = 0;
        users.forEach((user: { userId: number }) => {
          if (user.userId > maxUserId) {
            maxUserId = user.userId;
          }
        });
        const newUser = {
          userId: ++maxUserId,
          username: username,
          role: role,
          password: password,
        };
        const newUsers = [...users, newUser];
        setUsers(newUsers);
        setSuccess("User added successfully");
        setTimeout(() => {
          setSuccess("");
        }, 1000);
      } else {
        setModal({
          modalShow: true,
          modalMessage: "You are not authorized to make this change",
        });
      }
    }
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      <div style={{ paddingBottom: "10px" }}>
        <h3 className="h6">Add User</h3>
      </div>
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
          Add User
        </Button>
      </Form>
      <NoticeModal
        show={modal.modalShow}
        onHide={() => setModal({ modalShow: false, modalMessage: "" })}
        title="Attention!"
        message={modal.modalMessage}
      />
    </div>
  );
};

export default AddUser;
