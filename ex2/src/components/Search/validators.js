export const validators = [
  {
    fieldName: "firstName",
    validate: value => value.length > 2,
    message: "First name should have more than 2 charactors"
  },
  {
    fieldName: "lastName",
    validate: value => value.length > 2,
    message: "Last name should have more than 2 charactors"
  },
  {
    fieldName: "age",
    validate: value => !isNaN(parseInt(value)),
    message: "Age should be a number"
  },
  {
    fieldName: "grade",
    validate: value => ["HD", "D", "C", "P", "F"].includes(value),
    message: 'Grade must be "HD", "D", "C", "P" or "F"'
  }
];
