import React, { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import { ProjectContext } from "../../Context/ProjectContext";
import EditProject from "./EditProject";

interface Project {
  projectId: number;
  projectName: string;
  client: string;
  durationMonth: number;
  details: string;
}

const ProjectList: React.FC = () => {
  const [projects] = useContext(ProjectContext);

  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [currentProjectId, setCurrentProjectId] = useState<number>(-1);

  const getProjectList = () => {
    return projects.map((project: Project) => {
      return (
        <tr
          onClick={() => {
            setCurrentProjectId(project.projectId);
            setShowProjectModal(true);
          }}
          key={project.projectId}
        >
          <td>{project.projectId}</td>
          <td>{project.projectName}</td>
          <td>{project.client}</td>
          <td>{project.durationMonth}</td>
          <td>{project.details}</td>
        </tr>
      );
    });
  };
  return (
    <div>
      {projects.length !== 0 ? (
        <div>
          <div style={{ paddingBottom: "10px" }}>
            <h3 className="h6">All Projects</h3>
          </div>
          <Table striped hover responsive>
            <thead>
              <tr key="x">
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Client</th>
                <th>Duration (Months)</th>
                <th>details</th>
              </tr>
            </thead>
            <tbody>{getProjectList()}</tbody>
          </Table>
        </div>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "25px" }}>
          <h3>There are no projects created</h3>
        </div>
      )}
      <EditProject
        show={showProjectModal}
        onHide={() => setShowProjectModal(false)}
        title="Make changes to Project"
        projectId={currentProjectId}
      />
    </div>
  );
};

export default ProjectList;
