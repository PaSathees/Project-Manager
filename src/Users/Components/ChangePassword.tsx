import React, { useContext, useState } from "react";

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
}

const ChangePassword: React.FC<props> = (props) => {
  const [success, setSuccess] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const [users, setUsers] = useContext(UserContext);

  const [modal, setModal] = useState<modal>({
    modalShow: false,
    modalMessage: "",
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentPassword.trim() === "") {
      setModal({
        modalShow: true,
        modalMessage: "Please enter the current password",
      });
    }
    if (newPassword.trim() === "") {
      setModal({
        modalShow: true,
        modalMessage: "Please enter the new password",
      });
    }
    if (confirmNewPassword.trim() === "") {
      setModal({
        modalShow: true,
        modalMessage: "Please enter new password again to confirm",
      });
    }
    if (newPassword !== confirmNewPassword) {
      setModal({
        modalShow: true,
        modalMessage: "New password and confirmed password does not match",
      });
    } else {
      const user = users.find(
        (user: { username: string }) =>
          user.username === localStorage.getItem("username")
      );
      if (user === undefined) {
        setModal({
          modalShow: true,
          modalMessage: "User account not found",
        });
      } else {
        if (user.password === currentPassword) {
          const newUsers = [...users];
          const currentUserIndex = newUsers.findIndex(
            (userStored) => userStored.userId === user.userId
          );
          newUsers[currentUserIndex].password = newPassword;
          setUsers(newUsers);
          setSuccess("Password changed successfully");
          setTimeout(() => {
            props.onHide();
          }, 1000);
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
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
          <Form.Group as={Row} controlId="formBasicPassword">
            <Form.Label column sm={2}>
              Current Password*
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Current Password"
                className="form-control"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicPassword">
            <Form.Label column sm={2}>
              New Password*
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="New Password"
                className="form-control"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicPassword">
            <Form.Label column sm={2}>
              Confirm New Password*
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                className="form-control"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button type="submit" size="lg" block>
            Change Password
          </Button>
        </Form>
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

export default ChangePassword;
