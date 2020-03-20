function createEmployeeRecord(arr){
  return {
    firstName: arr[0],
    familyName: arr[1], 
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arr){
  let employees = []
  arr.forEach(employee => employees.push(createEmployeeRecord(employee)))
  return employees
}

function createTimeInEvent(employee, dateTime){
  let newEvent = {
    type: "TimeIn",
    date: dateTime.slice(0,10), 
    hour: parseInt(dateTime.slice(-4))
  }
  employee.timeInEvents.push(newEvent)
  return employee
}

function createTimeOutEvent(employee, dateTime){
  let newEvent = {
    type: "TimeOut",
    date: dateTime.slice(0,10), 
    hour: parseInt(dateTime.slice(-4))
  }
  employee.timeOutEvents.push(newEvent)
  return employee
}

function hoursWorkedOnDate(employee, date){
  let eventIn = employee.timeInEvents.find(event => event.date === date)
  let eventOut = employee.timeOutEvents.find(event => event.date === date)
  let hrs = eventOut.hour/100 - eventIn.hour/100 // /100 because convert time to hour (0800 -> 08)
  return  hrs
}

function wagesEarnedOnDate(employee, date){
  let hrs = hoursWorkedOnDate(employee, date)
  let wages = hrs * employee.payPerHour
  return wages
}

function allWagesFor(employee){
  let dates = employee.timeOutEvents.map( event => event.date )
  let earned =  dates.reduce( (total, date) => total + wagesEarnedOnDate(employee, date), 0)
  return earned
}

function calculatePayroll(employees){
  let payroll = employees.reduce( (total, employee) => total + allWagesFor(employee), 0)
  return payroll
}

function findEmployeeByFirstName(employees, name){ 
  let employee = employees.find( employee => employee.firstName === name)
  return employee
}