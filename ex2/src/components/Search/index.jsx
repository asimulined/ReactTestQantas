import React, { Component } from "react";
import { connect } from "../../context";
import { fieldKeyValueMap } from "../../constants/fieldKeyValueMap";
import { withValidator } from "../Validate";
import { validators as searchValidators } from "./validators";

class SearchComponent extends Component {
  defaultState = {
    selectedFieldName: "id",
    fieldValue: ""
  };
  state = {
    ...this.defaultState
  };

  handlePropNameChange = e => {
    this.props.clearErrors();
    this.setState({
      selectedFieldName: e.target.value
    });
  };

  handlePropValueChange = e => {
    this.props.clearErrors();
    this.setState({
      fieldValue: e.target.value
    });
  };

  handleSubmit = e => {
    this.props.clearErrors();
    e.preventDefault();
    const { selectedFieldName, fieldValue } = this.state;
    this.props.validateBeforeSubmit(selectedFieldName, fieldValue, () =>
      this.props.search(selectedFieldName, fieldValue)
    );
  };

  handleReset = () => {
    this.props.clearErrors();
    this.setState(
      {
        ...this.defaultState
      },
      () => {
        this.props.getAll();
      }
    );
  };

  renderSearchField = () => {
    return (
      <div className="form-group col-4">
        <label htmlFor="fieldValue">
          {fieldKeyValueMap[this.state.selectedFieldName]}
        </label>
        <input
          type="text"
          className="form-control"
          value={this.state.fieldValue}
          onChange={this.handlePropValueChange}
        />
      </div>
    );
  };

  renderFieldNameSelect = () => {
    return (
      <div className="form-group col-4">
        <label htmlFor="selectedFieldName">Example select</label>
        <select
          className="form-control"
          id="selectedFieldName"
          value={this.state.selectedFieldName}
          onChange={this.handlePropNameChange}
        >
          {Object.keys(fieldKeyValueMap).map(key => (
            <option value={key} key={key}>
              {fieldKeyValueMap[key]}
            </option>
          ))}
        </select>
      </div>
    );
  };

  renderErrors = errors => {
    return (
      <div>
        <ul>
          {errors.map((error, idx) => (
            <li className="text-danger" key={idx}>
              {error}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderErrors(this.props.errors)}
        <div className="row align-items-end">
          {this.renderFieldNameSelect()}
          {this.renderSearchField()}
          <div className="form-group col-2">
            <button type="submit" className="btn btn-success align-self-end">
              Search
            </button>
          </div>
          <div className="form-group col-2">
            <button
              type="button"
              className="btn btn-danger align-self-end"
              onClick={this.handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export const Search = connect(
  undefined,
  methods => ({
    search: methods.onSearch,
    getAll: methods.getAllStudents
  })
)(withValidator(...searchValidators)(SearchComponent));
