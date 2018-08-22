import React, { Component } from "react";
import { ApiHelper } from "../helpers/Api";

const Context = React.createContext({
  students: [],
  isLoading: false
});

class Provider extends Component {
  state = {
    students: [],
    isLoading: false
  };

  componentDidMount = () => {
    this.getAllStudents();
  };

  getAllStudents = async () => {
    this.setState({
      isLoading: true
    });

    const response = await ApiHelper.get("students");

    this.setState({
      isLoading: false,
      students: response.data
    });
  };

  onSearch = async (fieldName, keywords) => {
    this.setState({
      isLoading: true
    });

    const response = await ApiHelper.get(`students?${fieldName}=${keywords}`);

    this.setState({
      isLoading: false,
      students: response.data
    });
  };

  render() {
    return (
      <Context.Provider
        value={{
          values: { ...this.state },
          methods: {
            onSearch: this.onSearch,
            getAllStudents: this.getAllStudents
          }
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

// { students: state.students, isLoading2: state.isLoading }
// { searchStudents: methods.searchStudents}
const connect = (
  propsMapFn = () => ({}),
  methodsMapFn = () => ({})
) => InnerComponent => {
  return () => (
    <Consumer>
      {({ values, methods }) => {
        return (
          <InnerComponent {...propsMapFn(values)} {...methodsMapFn(methods)} />
        );
      }}
    </Consumer>
  );
};

export { Provider };
export const Consumer = Context.Consumer;
export { connect };
