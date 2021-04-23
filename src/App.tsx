import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Login from "./Users/Pages/Login";
import UserDashboard from "./Users/Pages/UserDashboard";
import { UserProvider } from "./Context/UserContext";
import { LoginProvider } from "./Context/LoginContext";
import { ProjectProvider } from "./Context/ProjectContext";
import { ProjectToUserProvider } from "./Context/ProjectToUserContext";

const App: React.FC = () => {
  return (
    <UserProvider>
      <LoginProvider>
        <ProjectProvider>
          <ProjectToUserProvider>
            <Router>
              <Switch>
                <Route
                  path="/user_dashboard"
                  exact
                  render={() => <UserDashboard />}
                />

                <Route path="/" exact component={Login} />
                <Redirect to="/" />
              </Switch>
            </Router>
          </ProjectToUserProvider>
        </ProjectProvider>
      </LoginProvider>
    </UserProvider>
  );
};

export default App;
