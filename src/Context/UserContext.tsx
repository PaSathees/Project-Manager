import React, { createContext, useState } from "react";

interface User {
  userId: number;
  username: string;
  password: string;
  role: string;
}

export const UserContext = createContext<any>(null);

export const UserProvider = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [users, setUsers] = useState<User[]>([
    { userId: 1, username: "admin", password: "12345", role: "admin" },
    { userId: 2, username: "jaanu", password: "12345", role: "user" },
    { userId: 3, username: "Kavi", password: "12345", role: "user" },
    { userId: 4, username: "Alexa", password: "12345", role: "user" },
  ]);

  return (
    <UserContext.Provider value={[users, setUsers]}>
      {props.children}
    </UserContext.Provider>
  );
};
