var employee = {
  name: "Joe",
  age: 28,
  designation: "developer",
  display() {
    return this.designation;
    },
    setDestination(parameter) {
    this.designation = parameter;
  }
};
//this will generate an error
console.log(employee.display());
console.log("Before Update: " + employee.designation);
employee.setDestination("manager");
console.log("After Update: " + employee.designation);
console.log(employee.display());
console.log(employee)