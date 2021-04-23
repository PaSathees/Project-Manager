import React, { useContext, useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Notice from "../../Shared/Components/Notice";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ProjectContext } from "../../Context/ProjectContext";
import { ProjectToUserContext } from "../../Context/ProjectToUserContext";
import NoticeModal from "../../Shared/Components/NoticeModal";
import { UserContext } from "../../Context/UserContext";
import WorkingUserList from "./WorkingUserList";
import { Table } from "react-bootstrap";

interface modal {
  modalShow: boolean;
  modalMessage: string;
}

interface props {
  show: boolean;
  title: string;
  onHide: () => void;
  projectId: number;
}

interface User {
  userId: number;
  username: string;
  password: string;
  role: string;
}

const EditProject: React.FC<props> = (props) => {
  const [success, setSuccess] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [durationMonth, setDurationMonth] = useState<number>(0);
  const [details, setDetails] = useState<string>("");
  const [members, setMembers] = useState<Array<User>>([]);
  const [search, setSearch] = useState<string>("");
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);

  const [users, setUsers] = useContext(UserContext);
  const [projects, setProjects] = useContext(ProjectContext);
  const [projectToUser, setProjectToUser] = useContext(ProjectToUserContext);

  const [modal, setModal] = useState<modal>({
    modalShow: false,
    modalMessage: "",
  });

  useEffect(() => {
    const currentProject = projects.find(
      (project: { projectId: number }) => project.projectId === props.projectId
    );
    if (currentProject !== undefined) {
      setProjectName(currentProject.projectName);
      setClient(currentProject.client);
      setDurationMonth(currentProject.durationMonth);
      setDetails(currentProject.details);
    }

    const currentProjectMap = projectToUser.find(
      (projectMap: { projectId: number }) =>
        projectMap.projectId === props.projectId
    );
    if (currentProjectMap !== undefined) {
      const members = currentProjectMap.userIds.map((userId: number) =>
        users.find((user: { userId: number }) => user.userId === userId)
      );
      setMembers(members);
    }
  }, [props.projectId]);

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
      const newProjects = [...projects];
      const currentProjectIndex = newProjects.findIndex(
        (projectStored) => projectStored.projectId === props.projectId
      );
      newProjects[currentProjectIndex].projectName = projectName;
      newProjects[currentProjectIndex].client = client;
      newProjects[currentProjectIndex].durationMonth = durationMonth;
      newProjects[currentProjectIndex].details = details;

      const removedMapping = projectToUser.filter(
        (project: { projectId: number }) =>
          project.projectId !== props.projectId
      );

      const newProjectMappings = members.map((member: User) => {
        return { projectId: props.projectId, userId: member.userId };
      });

      setProjectToUser([...removedMapping, ...newProjectMappings]);

      setProjects(newProjects);
      setSuccess("Project updated successfully");
      setTimeout(() => {
        setSuccess("");
        props.onHide();
      }, 1000);
    }
  };

  const deleteProject = (projectId: number) => {
    const newProjects = projects.filter(
      (project: { projectId: number }) => project.projectId !== projectId
    );
    setProjects(newProjects);
    setSuccess("Project deleted successfully");
    setTimeout(() => {
      setSuccess("");
      props.onHide();
    }, 1000);
  };

  const removeMember = (memberId: number) => {
    const newMembers = members.filter((member) => member.userId !== memberId);
    setMembers(newMembers);
  };

  useEffect(() => {
    const searchedUsers = users.filter((user: User) =>
      user.username.includes(search)
    );
    setSearchedUsers(searchedUsers);
  }, [search]);

  const addMember = (userId: number) => {
    if (members.findIndex((member: User) => member.userId === userId) === -1) {
      const newMember = users.find((user: User) => user.userId === userId);
      const newMembers = [...members, newMember];
      setMembers(newMembers);
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
          {props.title} : {props.projectId}
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

          <Form.Group as={Row} controlId="formHorizontal">
            <Form.Label column sm={2}>
              Members
            </Form.Label>
            <Col sm={10}>
              <Table striped hover responsive>
                <thead>
                  <tr key="x">
                    <th>User ID</th>
                    <th>Username</th>
                    <th>role</th>
                    {localStorage.getItem("role") === "admin" && (
                      <th>remove</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {members.map((member: User) => {
                    return (
                      <tr key={member.userId}>
                        <td>{member.userId}</td>
                        <td>{member.username}</td>
                        <td>{member.role}</td>
                        {localStorage.getItem("role") === "admin" && (
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => {
                                removeMember(member.userId);
                              }}
                            >
                              X
                            </Button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Form.Group>

          {localStorage.getItem("role") === "admin" && (
            <Form.Group as={Row} controlId="formHorizontal">
              <Form.Label column sm={2}>
                Add Users
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="search"
                  autoComplete="off"
                  placeholder="Search users"
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search.trim() !== "" && (
                  <Table striped hover responsive>
                    <thead>
                      <tr key="x">
                        <th>User ID</th>
                        <th>Username</th>
                        <th>role</th>

                        <th>Add</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchedUsers.map((member: User) => {
                        return (
                          <tr key={member.userId}>
                            <td>{member.userId}</td>
                            <td>{member.username}</td>
                            <td>{member.role}</td>

                            <td>
                              <Button
                                variant="primary"
                                onClick={() => {
                                  addMember(member.userId);
                                }}
                              >
                                Add
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </Col>
            </Form.Group>
          )}

          <Button type="submit" size="lg" block>
            Update Project
          </Button>
        </Form>
        {localStorage.getItem("role") === "admin" && (
          <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
            <Button
              size="lg"
              variant="danger"
              block
              onClick={() => {
                deleteProject(props.projectId);
              }}
            >
              Delete Project
            </Button>
          </div>
        )}

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

export default EditProject;
