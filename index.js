// Your code here
const createEmployeeRecord = (records) => {
    let inEvent = records[4] ? records[4] : []
    let outEvent = records[5] ? records[5] : []
    return { 
    firstName: records[0],
    familyName: records[1],
    title: records[2],
    payPerHour: records[3],
    timeInEvents: inEvent,
    timeOutEvents: outEvent
}}
 
const createEmployeeRecords = (records) => 
    records.map(record => createEmployeeRecord(record))

const createTimeInEvent = (obj,time) => {
    let eventTime = {
        type: "TimeIn",
        date: time.split(" ")[0],
        hour: parseInt(time.split(" ")[1])
    }
    obj.timeInEvents.push(eventTime)
    return obj 
}

const createTimeOutEvent = (obj,time) => {
    let eventTime = {
        type: "TimeOut",
        date: time.split(" ")[0],
        hour: parseInt(time.split(" ")[1])
    }
    obj.timeOutEvents.push(eventTime)
    return obj 
}

const hoursWorkedOnDate = (obj,date) => {
    let time_in = obj.timeInEvents.find(event => event.date === date).hour 

    let time_out = obj.timeOutEvents.find(event => event.date === date).hour

    return (time_out - time_in) / 100
    
}

const wagesEarnedOnDate = (obj,date) => 
    hoursWorkedOnDate(obj,date) * obj.payPerHour


const allWagesFor = (obj) => {
    let total = 0
    obj.timeInEvents.map(event => event.date).forEach(event_date => {
        total += wagesEarnedOnDate(obj,event_date)
    });
    return total
}

const calculatePayroll = (employees) => 
    employees.map(employe => allWagesFor(employe)).reduce((sum,employe_total) => sum + employe_total)

const findEmployeeByFirstName = (emps, first_name) => emps.find(employe => employe.firstName === first_name)