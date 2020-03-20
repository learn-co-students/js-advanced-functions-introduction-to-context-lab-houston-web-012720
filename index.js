

let createEmployeeRecord = (arr) => {return {firstName: arr[0], familyName: arr[1], title: arr[2], payPerHour: arr[3], timeInEvents: [], timeOutEvents: []}}

let createEmployeeRecords = (records) => records.map(rec => createEmployeeRecord(rec))

let createTimeInEvent = (emp, time) => {emp.timeInEvents.push({type: "TimeIn",hour: parseInt(time.split(' ')[1], 10),date: time.split(' ')[0]}); return emp}

let createTimeOutEvent = (emp, time) => {emp.timeOutEvents.push({type: "TimeOut",hour: parseInt(time.split(' ')[1], 10),date: time.split(' ')[0]}); return emp}

let hoursWorkedOnDate = (emp, date) => (emp.timeOutEvents.find(e => e.date == date).hour - emp.timeInEvents.find(e => e.date == date).hour)/100

let wagesEarnedOnDate = (emp, date) => hoursWorkedOnDate(emp,date)*emp.payPerHour

let allWagesFor = (emp) => emp.timeOutEvents.reduce((wealth, event) => wealth + wagesEarnedOnDate(emp, event.date), 0)

let calculatePayroll = (emps) => emps.reduce((total, emp) => total + allWagesFor(emp),0)

let findEmployeeByFirstName = (emps, name) => emps.find(emp => emp.firstName === name)
