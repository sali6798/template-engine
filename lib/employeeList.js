const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
let employees = [];
let isFinished = false;

function employeeTypeDetails(role) {
    let details = [];
    switch(role) {
        case "Engineer":
            details = [Engineer, "github", {
                type: 'input',
                name: `github`,
                message: `Github username:`,
            }]
            break;
        case "Intern":
            details = [Intern, "school", {
                type: 'input',
                name: `school`,
                message: `School:`,
            }]
            break;
        default:
            details = [Manager, "officeNumber", {
                type: 'input',
                name: `officeNumber`,
                message: `Office Number:`,
            }]
            break;
    }
    return details;
}

function createEmployee(role) {
    const employeeDetails = employeeTypeDetails(role);
    inquirer
        .prompt([
            {
                type: 'input',
                name: `name`,
                message: `Name:`,
            },
            {
                type: 'input',
                name: `id`,
                message: `id:`,
            },
            {
                type: 'input',
                name: `email`,
                message: `Email:`,
            },
            employeeDetails[2]
        ])
        .then(response => {
            const newEmployee = new employeeDetails[0](response.name, response.id, response.email, response[employeeDetails[1]]);
            employees.push(newEmployee);
        })
        .then(() => addEmployee())
}

function addEmployee() {
    inquirer
        .prompt({
            type: 'list',
            name: "employee",
            message: "Is there any more employees to add?",
            choices: ['Engineer', 'Intern', 'No one else']
        })
        .then(({employee}) => {
            switch(employee) {
                case "Engineer":
                    createEmployee("Engineer");
                    break;
                case "Intern":
                    createEmployee("Intern");
                    break;
                default:
                    isFinished = true;
                    console.log("finished");
                    break;
            }
        })
}

const employeeSummary = async() => {
    try {
        const response = await createEmployee();
        const newEmployee = new employeeDetails[0](response.name, response.id, response.email, response[employeeDetails[1]]);
        employees.push(newEmployee);
        const employee = await addEmployee();
        switch(employee) {
            case "Engineer":
                createEmployee("Engineer");
                break;
            case "Intern":
                createEmployee("Intern");
                break;
            default:
                isFinished = true;
                console.log("finished");
                break;
        }
        
    }
    catch {
        console.log("error")
    }
}


module.exports = {
    employeeSummary,
    createEmployee
    // employees
}