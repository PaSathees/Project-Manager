import React, { createContext, useState } from "react";

export const ProjectToUserContext = createContext<any>(null);

interface ProjectToUser {
  projectId: number;
  userIds: number[];
}

export const ProjectToUserProvider = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [projectToUsers, setProjectToUsers] = useState<ProjectToUser[]>([
    { projectId: 1, userIds: [1, 3] },
    { projectId: 2, userIds: [2, 3, 1] },
    { projectId: 3, userIds: [2, 3] },
  ]);

  return (
    <ProjectToUserContext.Provider value={[projectToUsers, setProjectToUsers]}>
      {props.children}
    </ProjectToUserContext.Provider>
  );
};
