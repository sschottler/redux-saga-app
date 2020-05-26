import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError,
} from "../actions/users";
import UsersList from "./UsersList";
import NewUserForm from "./NewUserForm";

interface AppProps {
  getUsersRequest(): void;
  createUserRequest(user: { firstName: string; lastName: string }): void;
  deleteUserRequest(userId: number): void;
  usersError(error: any): void;
  users: any;
}
class App extends Component<AppProps> {
  constructor(props) {
    super(props);
    this.props.getUsersRequest();
  }

  handleSubmit = ({ firstName, lastName }) => {
    this.props.createUserRequest({ firstName, lastName });
  };

  handleDeleteUserClick = (userId) => {
    this.props.deleteUserRequest(userId);
  };

  handleCloseAlert = () => {
    this.props.usersError({
      error: "",
    });
  };

  render() {
    const users = this.props.users;
    return (
      <div
        style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}
        className="App"
      >
        <Alert
          color="danger"
          isOpen={!!this.props.users.error}
          toggle={this.handleCloseAlert}
        >
          {this.props.users.error}
        </Alert>
        <NewUserForm onSubmit={this.handleSubmit} />
        <UsersList
          onDeleteUser={this.handleDeleteUserClick}
          users={users.items}
        />
      </div>
    );
  }
}

export default connect(
  // @ts-ignore
  ({ users }) => ({ users }),
  {
    getUsersRequest,
    createUserRequest,
    deleteUserRequest,
    usersError,
  }
)(App);
