import React from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface props {
  show: boolean;
  title: string;
  message: string;
  onHide: () => void;
}

const NoticeModal: React.FC<props> = (props) => {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoticeModal;
