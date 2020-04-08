const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");

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
                validate: function(value) {
                    // github usernames can only be a max of 39 chars made up of alphanumeric 
                    // chars and dashes '-' and cannot start or end with a dash
                    var valid = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/g;
                    return valid.test(value) && value.length <= 39 ? true : "Please enter a valid username";
                } 
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
                validate: function(value) {
                    // check office number is a number and greater than 0
                    const input = parseInt(value);
                    return !isNaN(input) && input > 0 ? true : "Office Number must be a number > 0";
                }
            }]
            break;
    }
    return details;
}

function questions(specificQ) {
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
            validate: function(value) {
                // check id is a number and greater than 0
                const input = parseInt(value);
                return !isNaN(input) && input > 0 ? true : "id must be a number > 0";
            } 
        },
        {
            type: 'input',
            name: `email`,
            message: `Email:`,
            validate: function(value) {
                // check email is a valid format ____@____.____
                var valid = /^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,7}$/g;
                return valid.test(value) ? true : "Please enter a valid email";
            } 
        },
        specificQ,
        {
            type: 'list',
            name: "employee",
            message: "Is there any more employees to add?",
            choices: ['Engineer', 'Intern', 'No one else']
        }
    ]
}

// recursively creates a new employee as long as user wants to
// default value for employeeList is an empty array, default for role is empty string
const collectSummary = async (employeeList = [], role = "") => {
    const employeeDetails = employeeTypeDetails(role);
    
    // gets employee property and spreads the remaining properties into the answers object
    const {employee, ...answers} = await inquirer.prompt(questions(employeeDetails[2]));
    
    // create a new instance of employee's role type (Manager, Engineer, Intern)
    const newEmployee = new employeeDetails[0](answers.name, answers.id, answers.email, answers[employeeDetails[1]]);
    
    // add existing employees and new employee to a new array
    const newEmployeeList = [...employeeList, newEmployee];

    // calls collectSummary again if user chooses to add an Engineer or Intern, if
    // they don't want to return the newEmployeeList
    switch(employee) {
        case "Engineer":
            return collectSummary(newEmployeeList, "Engineer");
        case "Intern":
            return collectSummary(newEmployeeList, "Intern");
        default:
            return newEmployeeList;
    }
}

module.exports = {
    collectSummary
}
