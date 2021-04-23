import React, { createContext, useState } from "react";

export const LoginContext = createContext<any>(null);

interface Login {
  isLoggedIn: boolean;
  username: string;
  userId: number;
  role: string;
}

export const LoginProvider = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [login, setLogin] = useState<Login>({
    isLoggedIn: false,
    username: "",
    userId: -1,
    role: "",
  });

  return (
    <LoginContext.Provider value={[login, setLogin]}>
      {props.children}
    </LoginContext.Provider>
  );
};
