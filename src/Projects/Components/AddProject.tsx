import React, { useContext, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ProjectContext } from "../../Context/ProjectContext";
import { ProjectToUserContext } from "../../Context/ProjectToUserContext";
import NoticeModal from "../../Shared/Components/NoticeModal";
import Notice from "../../Shared/Components/Notice";

interface modal {
  modalShow: boolean;
  modalMessage: string;
}

const AddProject: React.FC = () => {
  const [success, setSuccess] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [durationMonth, setDurationMonth] = useState<number>(0);
  const [details, setDetails] = useState<string>("");

  const [projects, setProjects] = useContext(ProjectContext);
  const [projectToUser, setProjectToUser] = useContext(ProjectToUserContext);

  const [modal, setModal] = useState<modal>({
    modalShow: false,
    modalMessage: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (projectName.trim() === "") {
      setModal({
        modalShow: true,
        modalMessage: "Please enter a project name",
      });
    } else if (client.trim() === "") {
      setModal({
        modalShow: true,
        modalMessage: "Please enter a client",
      });
    } else {
      let maxProjectId = 0;
      projects.forEach((project: { projectId: number }) => {
        if (project.projectId > maxProjectId) {
          maxProjectId = project.projectId;
        }
      });
      const newProject = {
        projectId: ++maxProjectId,
        projectName: projectName,
        client: client,
        durationMonth: durationMonth,
        details: details,
      };
      const newProjects = [...projects, newProject];
      setProjects(newProjects);
      setSuccess("Project added successfully");
      setTimeout(() => {
        setSuccess("");
      }, 1000);
    }
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      <div style={{ paddingBottom: "10px" }}>
        <h3 className="h6">Add Project</h3>
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
            Project Name*
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Project Name"
              className="form-control"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicUsername">
          <Form.Label column sm={2}>
            Client*
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Client Name"
              className="form-control"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontal2">
          <Form.Label column sm={2}>
            Duration (Months)*
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              step="1"
              min="0"
              value={durationMonth}
              placeholder="Duration of the project in months"
              onChange={(e) => setDurationMonth(parseInt(e.target.value))}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontal">
          <Form.Label column sm={2}>
            Details
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={4}
              value={details}
              placeholder="Project details"
              onChange={(e) => setDetails(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button type="submit" size="lg" block>
          Add Project
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

export default AddProject;
