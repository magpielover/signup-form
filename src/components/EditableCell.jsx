import React from "react";
import { connect } from "react-redux";
import { editUser } from "../redux/actions";
import {
  validatePhone,
  validateName,
  validateEmail
} from "../helpers/FormValidator";
class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: this.props.isEditing,
      value: this.props.value,
      oldValue: this.props.value,
      userToBeSaved: null,
      isValid: true
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit(e) {
    this.setState({ isEditing: true });
  }
  saveUser(e) {
    if (!this.state.isValid) {
      alert("Value not valid!");
      this.setState({ value: this.state.oldValue });
      return;
    }
    let user = this.props.user;
    user[this.props.field] = e.target.value;
    this.setState({
      isEditing: true,
      userToBeSaved: user,
      oldValue: e.target.value
    });
    this.props.editUser(user);
  }
  handleCancel() {
    this.setState({ value: this.state.oldValue });
  }
  handleKeyDown(e) {
    switch (e.keyCode) {
      case 13: //  enter pressed
        this.setState({ isEditing: false });
        this.saveUser(e);
        break;
      case 9: // tab pressed
        this.setState({ isEditing: false });
        this.saveUser(e);
        break;
      case 27: // esc pressed
        this.setState({ isEditing: false });
        this.handleCancel();
        break;
      default:
        break;
    }
  }

  handleChange(e) {
    switch (this.props.field) {
      case "email":
        this.setState({ isValid: validateEmail(this.refs["text"].value) });
        break;
      case "name":
        this.setState({ isValid: validateName(this.refs["text"].value) });
        break;
      case "phone":
        this.setState({ isValid: validatePhone(this.refs["text"].value) });
        break;
      default:
        break;
    }
    this.setState({ value: e.target.value });
  }
  render() {
    var editable;
    if (this.state.isEditing || this.props.isEditing) {
      editable = (
        <input
          type="text"
          ref="text"
          value={this.state.value}
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          className={this.state.isValid ? "valid" : "invalid"}
        />
      );
    } else {
      editable = <span onClick={this.handleEdit}>{this.state.value}</span>;
    }
    return <td className="inline-editing">{editable}</td>;
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
)(EditableCell);
