import React, { Component } from "react";

/**
 * The Wrapped component will have two additional methods on its props:
 * 1) validateBeforeSubmit: receive key and value of a field, and a callback of handleSubmit,
 * it will validate the fields value against all of the validators, once there is an matched
 * error, it will push the error message into the state.errors
 *
 * 2) clearErrors: once called, it will reset the errors to an empty array
 *
 * And the Wrapped component will also receive an errors props, which is an array of strings
 */

const withValidator = (...validators) => InnerComponent => {
  class Wrapped extends Component {
    state = {
      errors: []
    };

    validateBeforeSubmit = (key, value, callback) => {
      for (let { fieldName, validate, message } of validators) {
        if (fieldName === key && !validate(value)) {
          this.setState({
            errors: [...this.state.errors, message]
          });
        }
      }

      // need to refactor
      setTimeout(() => {
        if (this.state.errors.length === 0) {
          callback();
        }
      });
    };

    clearErrors = () => {
      this.setState({
        errors: []
      });
    };

    render() {
      return (
        <InnerComponent
          {...this.props}
          errors={this.state.errors}
          validateBeforeSubmit={this.validateBeforeSubmit}
          clearErrors={this.clearErrors}
        />
      );
    }
  }

  return Wrapped;
};

export { withValidator };
