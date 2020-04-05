const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

let employeesList = [];

// returns details specific to the role - their type, property
// specific to their role and a prompt to ask user for this value
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

function askDetails(roleSpecificQ) {
    return [
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
        roleSpecificQ
    ]
}

async function createEmployee(role) {
    const employeeDetails = employeeTypeDetails(role);
    // prompts for user to answer about their details
    const response = await inquirer.prompt(askDetails(employeeDetails[2]));
    // create a new instance of employee's role type (Manager, Engineer, Intern)
    const newEmployee = new employeeDetails[0](response.name, response.id, response.email, response[employeeDetails[1]]);
    // add new employee to array
    employeesList.push(newEmployee);
    addEmployee();
}

function askMoreEmployees() {
    return {
        type: 'list',
        name: "employee",
        message: "Is there any more employees to add?",
        choices: ['Engineer', 'Intern', 'No one else']
    }
}

// asks user if there are any more employees to add
async function addEmployee() {
    const {employee} = await inquirer.prompt(askMoreEmployees());
    switch(employee) {
        case "Engineer":
            createEmployee("Engineer");
            break;
        case "Intern":
            createEmployee("Intern");
            break;
        default:
            console.log("Ok, creating summary!");
            // turns the employee list into a html
            // that will display all the employee info
            const html = render(employeesList);
            // write html to file in output/ folder
            fs.writeFileSync(outputPath, html);
            break;
    }
}

createEmployee();
