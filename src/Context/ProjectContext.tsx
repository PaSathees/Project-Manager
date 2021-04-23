import React, { createContext, useState } from "react";

export const ProjectContext = createContext<any>(null);

interface Project {
  projectId: number;
  projectName: string;
  client: string;
  durationMonth: number;
  details: string;
}

export const ProjectProvider = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      projectId: 1,
      projectName: "React",
      client: "Dialog",
      durationMonth: 2,
      details: "Started working",
    },
    {
      projectId: 2,
      projectName: "React Native",
      client: "MobCo",
      durationMonth: 5,
      details: "Finished function 1",
    },
    {
      projectId: 3,
      projectName: "Node",
      client: "P&S",
      durationMonth: 4,
      details: "Finished the project",
    },
  ]);

  return (
    <ProjectContext.Provider value={[projects, setProjects]}>
      {props.children}
    </ProjectContext.Provider>
  );
};
