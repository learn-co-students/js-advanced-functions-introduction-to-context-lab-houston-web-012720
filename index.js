// Your code here

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfarray) {
    return arrayOfarray.map(function(arrayOfobject) {
        return createEmployeeRecord(arrayOfobject)
    })
}

function createTimeInEvent(object, date) {
    const [day, hour] = date.split(' ')

    object.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour, 10), date: day })
    return object
}

function createTimeOutEvent(object, date) {
    const [day, hour] = date.split(' ')

    object.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date: day })
    return object
}


function hoursWorkedOnDate(object, date) {
    let timeinevent = object.timeInEvents.find(function(one) {
        return one.date == date
    })

    let timeoutevent = object.timeOutEvents.find(function(one) {
        return one.date == date
    })

    return (timeoutevent.hour - timeinevent.hour) / 100

}


function wagesEarnedOnDate(object, date) {
    return object.payPerHour * hoursWorkedOnDate(object, date)
}

function allWagesFor(object) {
    return object.timeInEvents.reduce(function(acc, timeineventt) {
        return acc += wagesEarnedOnDate(object, timeineventt.date)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(object) {
            return object.firstName == firstName
        })
        // if (employee)
        //     return employee
        // else
        //     return undefined
}

function calculatePayroll(arrayofrecord) {
    return arrayofrecord.reduce(function(acc, employee) {
        return acc += allWagesFor(employee)
    }, 0)
}