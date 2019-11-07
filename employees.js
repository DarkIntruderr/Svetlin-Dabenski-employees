const fs = require('fs')

let processedArr = [];
let projectIdArr = [];
let empPairs = [];

function processArr(arr) {

    arr.forEach(element => {

        let splitEl = element.split(', ');

        let currentEl = {
            EmpID: splitEl[0],
            ProjectID: splitEl[1],
            DateFrom: new Date(splitEl[2]),
            DateTo: checkDateTo(splitEl[3])
        }

        processedArr.push(currentEl);
    });
}

function checkDateTo(date) {

    if (date != "NULL") {
        return new Date(date);
    } else {
        return new Date()
    }
}

function getProjectsIds(arr) {
    arr.forEach(element => {
        if (!projectIdArr.includes(element.ProjectID)) {
            projectIdArr.push(element.ProjectID)
        }
    });
}

function groupPairs(idProject) {

    let filterdByProjectID = processedArr.filter(item => item.ProjectID == idProject)

    for (let i = 0; i < filterdByProjectID.length; i++) {

        if (i == filterdByProjectID.length - 1) {

            if (filterdByProjectID[i].DateFrom <= filterdByProjectID[0].DateTo &&
                filterdByProjectID[i].DateTo >= filterdByProjectID[0].DateFrom) {

                let Id1 = filterdByProjectID[i].EmpID
                let Id2 = filterdByProjectID[0].EmpID
                let DateFrom1 = filterdByProjectID[i].DateFrom
                let DateFrom2 = filterdByProjectID[0].DateFrom
                let DateTo1 = filterdByProjectID[i].DateTo
                let DateTo2 = filterdByProjectID[0].DateTo

                let pairObj = {

                    Id1: Id1,
                    Id2: Id2,
                    DateFrom1: DateFrom1,
                    DateFrom2: DateFrom2,
                    DateTo1: DateTo1,
                    DateTo2: DateTo2,
                    idProject: idProject
                }

                empPairs.push(pairObj)
            }
        }

        else {
            if (filterdByProjectID[i].DateFrom <= filterdByProjectID[i + 1].DateTo &&
                filterdByProjectID[i].DateTo >= filterdByProjectID[i + 1].DateFrom) {

                let Id1 = filterdByProjectID[i].EmpID
                let Id2 = filterdByProjectID[i + 1].EmpID
                let DateFrom1 = filterdByProjectID[i].DateFrom
                let DateFrom2 = filterdByProjectID[i + 1].DateFrom
                let DateTo1 = filterdByProjectID[i].DateTo
                let DateTo2 = filterdByProjectID[i + 1].DateTo

                let pairObj = {

                    Id1: Id1,
                    Id2: Id2,
                    DateFrom1: DateFrom1,
                    DateFrom2: DateFrom2,
                    DateTo1: DateTo1,
                    DateTo2: DateTo2,
                    idProject: idProject
                }

                empPairs.push(pairObj)
            }
        }
    }
}

fs.readFile('inputEmployees.txt', (err, data) => {
    if (err) throw err;

    let lineInputArr = data.toString().split('\r\n');

    processArr(lineInputArr)

    getProjectsIds(processedArr)
    projectIdArr.forEach(item => {

        groupPairs(item)
    });

    
})


