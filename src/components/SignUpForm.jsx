import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { addUser } from "../redux/actions";
import Modal from "react-bootstrap/Modal";
import {
  validatePhone,
  validateName,
  validateEmail
} from "../helpers/FormValidator";
const uuidv1 = require("uuid/v1");
class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      successAlert: false,
      modalShow: false,
      warningMessage: "",
      user: {
        name: "",
        email: "",
        phone: ""
      },
      validEmail: true,
      validName: true,
      validPhone: true
    };
    this.addUser = this.addUser.bind(this);
    this.handeNameChange = this.handeNameChange.bind(this);
    this.handeEmailChange = this.handeEmailChange.bind(this);
    this.handePhoneChange = this.handePhoneChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handeNameChange(e) {
    var user = this.state.user;
    user.name = e.target.value;
    if (!validateName(e.target.value)) {
      this.setState({ validName: false });
      return;
    }
    this.setState({ user: user, validName: true });
  }
  handeEmailChange(e) {
    var user = this.state.user;
    user.email = e.target.value;
    if (!validateEmail(e.target.value)) {
      this.setState({ validEmail: false });
      return;
    }

    this.setState({ user: user, validEmail: true });
  }
  handePhoneChange(e) {
    var user = this.state.user;
    user.phone = e.target.value;
    if (!validatePhone(e.target.value)) {
      this.setState({ validPhone: false });
      return;
    }
    this.setState({ user: user, validPhone: true });
  }
  isEmptyField() {
    if (
      this.state.user.name === "" ||
      this.state.user.phone === "" ||
      this.state.user.email === ""
    ) {
      return true;
    }
    return false;
  }
  isFormValid() {
    return (
      !this.state.validEmail || !this.state.validName || !this.state.validPhone
    );
  }
  addUser() {
    if (this.isFormValid()) {
      this.setState({
        modalShow: true,
        warningMessage: "Signup form has some error, check it and try again!"
      });

      return;
    } else if (this.isEmptyField()) {
      this.setState({
        modalShow: true,
        warningMessage: "Nothing to add!"
      });
      return;
    }
    this.props.addUser(this.state.user);
    this.setState({ successAlert: true });
    setTimeout(() => {
      this.setState({ successAlert: false });
    }, 2000);
    this.reset();
  }
  handleClose() {
    this.setState({ modalShow: false });
  }

  reset() {
    var user = {
      name: "",
      email: "",
      phone: ""
    };
    this.setState({ user: user, isEmptyField: true });
  }

  render() {
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  value={this.state.user.name}
                  onChange={this.handeNameChange}
                  placeholder="Full name"
                  className={this.state.validName ? "valid" : "invalid"}
                />
              </th>
              <th>
                <input
                  value={this.state.user.email}
                  onChange={this.handeEmailChange}
                  placeholder="E-mail address"
                  className={this.state.validEmail ? "valid" : "invalid"}
                />
              </th>
              <th>
                <input
                  value={this.state.user.phone}
                  onChange={this.handePhoneChange}
                  placeholder="Phone number"
                  className={this.state.validPhone ? "valid" : "invalid"}
                />
              </th>
              <th>
                <Button className="digia-button" onClick={this.addUser}>
                  Add new
                </Button>
              </th>
            </tr>
          </thead>
          <tbody />
        </table>

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
              onClick={this.handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Alert
          show={this.state.successAlert}
          key={uuidv1()}
          variant={"success"}
        >
          User added successfully!
        </Alert>
      </React.Fragment>
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
  { addUser }
)(SignUpForm);
