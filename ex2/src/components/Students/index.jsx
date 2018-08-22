import React, { Component } from "react";
import { connect } from "../../context";
import { Student } from "./Student";
import { fieldKeyValueMap } from "../../constants/fieldKeyValueMap";

class StudentsComponent extends Component {
  renderHead = () => {
    return (
      <thead>
        <tr>
          {Object.keys(fieldKeyValueMap).map(key => (
            <th key={key}>{fieldKeyValueMap[key]}</th>
          ))}
        </tr>
      </thead>
    );
  };

  renderBody = students => {
    return (
      <tbody>
        {students.map(student => (
          <Student
            key={student.id}
            student={student}
            propNames={Object.keys(fieldKeyValueMap)}
          />
        ))}
      </tbody>
    );
  };
  render() {
    const { students, isLoading } = this.props;
    if (isLoading) {
      return <h3>Loading...</h3>;
    }

    return (
      <table className="table table-striped">
        {this.renderHead()}
        {this.renderBody(students)}
      </table>
    );
  }
}

export const Students = connect(state => ({
  students: state.students,
  isLoading: state.isLoading
}))(StudentsComponent);
