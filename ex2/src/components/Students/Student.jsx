import React from "react";

const Student = ({ student, propNames }) => (
  <tr>
    {propNames.map(propName => <td key={propName}>{student[propName]}</td>)}
  </tr>
);

export { Student };
