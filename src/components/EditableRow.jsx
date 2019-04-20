import React from "react";
import EditableCell from "./EditableCell";
import { connect } from "react-redux";
import { editUser } from "../redux/actions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  validatePhone,
  validateName,
  validateEmail
} from "../helpers/FormValidator";
const uuidv1 = require("uuid/v1");
class EditableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      oldUser: Object.assign({}, this.props.user),
      user: Object.assign({}, this.props.user),
      validEmail: true,
      validName: true,
      validPhone: true,
      nameFocus: false,
      emailFocus: false,
      phoneFocus: false,
      modalShow: false,
      warningMessage: ""
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  isFormValid() {
    return (
      this.state.validPhone && this.state.validName && this.state.validEmail
    );
  }

  handleSave(e) {
    if (!this.isFormValid()) {
      let warningMessage = "Please check the inputs again!";
      this.setState({
        warningMessage: warningMessage,
        modalShow: true,
        nameFocus: false,
        phoneFocus: false,
        emailFocus: false
      });

      return;
    }
    let user = {
      id: this.state.user.id,
      name: this.refs.name.value,
      email: this.refs.email.value,
      phone: this.refs.phone.value
    };
    this.setState({
      user: user,
      isEditing: false,
      oldUser: user
    });
    this.props.editUser(user);
  }
  handleEdit(e) {
    this.setState({ isEditing: true });
  }
  handleDelete(e) {
    let param = this.state.user;
    this.props.onDelete(param);
  }
  handleCancel(e) {
    this.reset();
  }
  handleKeyDown(e) {
    switch (e.keyCode) {
      case 13: //  enter pressed
        this.setState({ isEditing: false });
        break;
      case 9: // tab pressed
        this.setState({ isEditing: false });
        break;
      default:
        break;
    }
  }
  isEmailValid(field) {
    let text = this.refs[field].value;
    return validateEmail(text) ? true : false;
  }
  reset() {
    this.setState({
      nameFocus: false,
      phoneFocus: false,
      emailFocus: false,
      validPhone: true,
      validName: true,
      validEmail: true,
      isEditing: false,
      user: Object.assign({}, this.state.oldUser)
    });
  }
  handleNameChange(e) {
    let temp = this.state.user;
    temp.name = e.target.value;
    if (!validateName(e.target.value)) {
      this.setState({
        validName: false,
        nameFocus: true,
        emailFocus: false,
        phoneFocus: false,
        user: temp
      });
      return;
    }
    this.setState({
      validName: true,
      nameFocus: true,
      emailFocus: false,
      phoneFocus: false,
      user: temp
    });
  }
  handleEmailChange(e) {
    let temp = this.state.user;
    temp.email = e.target.value;
    if (!validateEmail(e.target.value)) {
      this.setState({
        validEmail: false,
        emailFocus: true,
        nameFocus: false,

        phoneFocus: false,
        user: temp
      });
      return;
    }
    this.setState({
      validEmail: true,
      emailFocus: true,
      user: temp,
      nameFocus: false,
      phoneFocus: false
    });
  }
  handlePhoneChange(e) {
    let temp = this.state.user;
    temp.phone = e.target.value;
    if (!validatePhone(e.target.value)) {
      this.setState({
        validPhone: false,
        phoneFocus: true,
        user: temp,
        emailFocus: false,
        nameFocus: false
      });
      return;
    }
    this.setState({
      validPhone: true,
      phoneFocus: true,
      user: temp,
      emailFocus: false,
      nameFocus: false
    });
  }
  render() {
    var editable;
    if (this.state.isEditing) {
      editable = (
        <React.Fragment>
          <tr key={uuidv1()} className="editing">
            <td key={uuidv1()}>
              <input
                ref="name"
                type="text"
                value={this.state.user.name}
                autoFocus={this.state.nameFocus}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleNameChange}
                className={this.state.validName ? "valid" : "invalid"}
              />
            </td>
            <td>
              <input
                ref="email"
                type="text"
                autoFocus={this.state.emailFocus}
                defaultValue={this.state.user.email}
                onKeyDown={this.handleKeyDown}
                onChange={this.handleEmailChange}
                className={this.state.validEmail ? "valid" : "invalid"}
              />
            </td>
            <td>
              <input
                ref="phone"
                type="text"
                autoFocus={this.state.phoneFocus}
                defaultValue={this.state.user.phone}
                onKeyDown={this.handleKeyDown}
                className={this.state.validPhone ? "valid" : "invalid"}
                onChange={this.handlePhoneChange}
              />
            </td>
            <td>
              <button
                className="digia-button-cancel"
                onClick={this.handleCancel}
                style={{ cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                className="digia-button-save"
                onClick={this.handleSave}
                style={{ cursor: "pointer" }}
              >
                Save
              </button>
            </td>
          </tr>
          <Modal
            size="sm"
            show={this.state.modalShow}
            onHide={this.handleClose}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Warning!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.warningMessage}</Modal.Body>
            <Modal.Footer>
              <Button
                style={{ float: "left" }}
                variant="warning"
                onClick={() => this.setState({ modalShow: false })}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
    } else {
      editable = (
        <tr key={uuidv1()}>
          <EditableCell
            isEditing={this.state.isEditing}
            user={this.state.user}
            value={this.state.user.name}
            field={"name"}
          />
          <EditableCell
            isEditing={this.state.isEditing}
            user={this.state.user}
            value={this.state.user.email}
            field={"email"}
          />
          <EditableCell
            isEditing={this.state.isEditing}
            user={this.state.user}
            value={this.state.user.phone}
            field={"phone"}
          />
          <td>
            <span
              className="action-button"
              onClick={this.handleEdit}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-pen" />
            </span>
            <span
              className="action-button"
              onClick={this.handleDelete}
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-trash" />
            </span>
          </td>
        </tr>
      );
    }
    return editable;
  }
}
const mapStateToProps = state => {
  return {
    tableReducer: state
  };
};

export default connect(
  mapStateToProps,
  { editUser }
)(EditableRow);
