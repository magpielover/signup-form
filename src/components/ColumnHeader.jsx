import React from "react";
import { connect } from "react-redux";
import { toggleSort } from "../redux/actions";

class ColumnHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAsc: this.props.isAsc };
    this.handleToggleSort = this.handleToggleSort.bind(this);
  }
  handleToggleSort(field) {
    this.props.toggleSort(field);
  }

  render() {
    var column;
    if (this.props.tableReducer.order === "asc") {
      column = (
        <React.Fragment>
          <th
            style={{ cursor: "pointer" }}
            key={this.props.column.text + "-" + this.props.column.index}
            onClick={() => this.handleToggleSort(this.props.column.dataField)}
            className={
              this.props.tableReducer.activeField ===
              this.props.column.dataField
                ? "active-sort-field"
                : ""
            }
          >
            {this.props.column.text}{" "}
            <i
              className={
                "fas fa-angle-down " +
                (this.props.tableReducer.activeField ===
                this.props.column.dataField
                  ? "show"
                  : "hidden")
              }
            />
          </th>
        </React.Fragment>
      );
    } else {
      column = (
        <React.Fragment>
          <th
            style={{ cursor: "pointer" }}
            key={this.props.column.text + "-" + this.props.column.index}
            onClick={() => this.handleToggleSort(this.props.column.dataField)}
            className={
              this.props.tableReducer.activeField ===
              this.props.column.dataField
                ? "active-sort-field"
                : ""
            }
          >
            {this.props.column.text}{" "}
            <i
              className={
                "fas fa-angle-up " +
                (this.props.tableReducer.activeField ===
                this.props.column.dataField
                  ? "show"
                  : "hidden")
              }
            />
          </th>
        </React.Fragment>
      );
    }
    return column;
  }
}
const mapStateToProps = state => {
  return {
    tableReducer: state
  };
};

export default connect(
  mapStateToProps,
  { toggleSort }
)(ColumnHeader);
