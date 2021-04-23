import React, { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import Table from "react-bootstrap/Table";
import EditUser from "./EditUser";

interface User {
  userId: number;
  username: string;
  password: string;
  role: string;
}

const UserList: React.FC = () => {
  const [users] = useContext(UserContext);

  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<number>(-1);

  const getUserList = () => {
    return users.map((user: User) => {
      return (
        <tr
          onClick={() => {
            setCurrentUserId(user.userId);
            setShowUserModal(true);
          }}
          key={user.userId}
        >
          <td>{user.userId}</td>
          <td>{user.username}</td>
          <td>{user.role}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      {users.length !== 0 ? (
        <div>
          <div style={{ paddingBottom: "10px" }}>
            <h3 className="h6">All Users</h3>
          </div>
          <Table striped hover responsive>
            <thead>
              <tr key="x">
                <th>User ID</th>
                <th>Username</th>
                <th>role</th>
              </tr>
            </thead>
            <tbody>{getUserList()}</tbody>
          </Table>
        </div>
      ) : (
        <div style={{ textAlign: "center", paddingTop: "25px" }}>
          <h3>There are no registered users</h3>
        </div>
      )}
      <EditUser
        show={showUserModal}
        onHide={() => setShowUserModal(false)}
        title="Make changes to user"
        userId={currentUserId}
      />
    </div>
  );
};

export default UserList;
