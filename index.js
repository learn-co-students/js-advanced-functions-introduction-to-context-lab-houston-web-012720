
function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employees) {
 return employees.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(employee, dt) {
  let  [date, hour] = dt.split(" ")
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

function createTimeOutEvent(employee, dt) {
  let  [date, hour] = dt.split(" ")
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

function hoursWorkedOnDate(employee, date) {
  let inTime = employee.timeInEvents.find((e) => e.date == date)
  let outTime = employee.timeOutEvents.find((e) => e.date == date)
  return (outTime.hour - inTime.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
  let dates = employee.timeOutEvents.reduce((acc, e) => {return acc.concat(e.date)}, [])
  return dates.reduce((acc, date) => acc + wagesEarnedOnDate(employee, date), 0)
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(employee => employee.firstName == name)
}

function calculatePayroll(employees) {
  return employees.reduce((acc, employee) => acc + allWagesFor(employee), 0)
}
