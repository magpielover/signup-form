import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import EditableRow from "./EditableRow";
import ColumnHeader from "./ColumnHeader";
import { connect } from "react-redux";
import { deleteUser } from "../redux/actions";
import SignUpForm from "./SignUpForm";
const uuidv1 = require("uuid/v1");

const columns = [
  {
    dataField: "name",
    text: "Name"
  },
  {
    dataField: "email",
    text: "E-mail address"
  },
  {
    dataField: "phone",
    text: "Phone number"
  }
];

class SortableTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      modalShow: false,
      userToDelete: "",
      successAlert: false
    };
  }

  handleClose() {
    this.setState({ modalShow: false });
  }
  onDeletePressed = user => {
    this.setState({ userToDelete: user });
    this.showModal();
  };

  handleDelete = () => {
    this.props.deleteUser(this.state.userToDelete);
    this.setState({ modalShow: false });
  };

  showModal = () => {
    this.setState({ modalShow: true });
  };
  closeModal() {
    this.setState({ modalShow: false });
  }

  componentDidUpdate() {
    console.log("Sortabletable Component updated!");
  }

  render() {
    return (
      <div>
        <h4
          style={{
            textAlign: "left",
            paddingBottom: "35px",
            paddingTop: "50px",
            color: "#757575"
          }}
        >
          List of participants
        </h4>
        <Card className="signup" style={{ width: "100%" }}>
          <SignUpForm />
        </Card>
        <Card style={{ width: "100%" }}>
          <table className="digia-participant-list">
            <thead>
              <tr key={uuidv1()}>
                {columns.map((column, i) => (
                  <ColumnHeader key={uuidv1()} index={i} column={column} />
                ))}
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.tableReducer.participants.map((row, i) => (
                <EditableRow
                  key={uuidv1()}
                  user={row}
                  index={i}
                  onDelete={this.onDeletePressed}
                />
              ))}
            </tbody>
          </table>
        </Card>
        <Modal show={this.state.modalShow} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete user?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you really want to delete the user?{" "}
            <span style={{ color: "red" }}>{this.state.userToDelete.name}</span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={this.handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tableReducer: state
  };
};

export default connect(
  mapStateToProps,
  { deleteUser }
)(SortableTable);
