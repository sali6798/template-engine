# template-engine
![npm](https://img.shields.io/npm/v/inquirer?label=inquirer) ![npm](https://img.shields.io/npm/v/jest?label=jest)

## Description
An application that allows a user to create a summary of their team (a Manager, Engineers and Interns) straight from the command line. After answering all the prompts about the team, a html is then produced that displays all the information the user provided for each member. Each employee has details for their name, id, email and a detail specific to the employee type (Manager: office number, Engineer: GitHub username, intern: school name). The email will be a link that opens the user's default email service and set up an email addressed to the employee clicked, the GitHub username will be a link to their GitHub profile. At the start the user will be prompted for information about the manager, then they are given the choice of adding an Engineer, Intern or nothing more. The user is able to add as many Engineers or Interns as they want. When the user is finished adding employees, a message will be displayed saying that the summary is being created. After creation the user is able to view the HTML with all the employee information that they entered.

## Installation
Node.js is required to run this application. 

1. Check if Node.js is installed by entering `node --version` into the command line. If it is installed, a version number should be displayed. 
   - If not, it can be [downloaded from their website](https://nodejs.org/en/download/), then check if it was installed properly by performing `node --version` 
2. Run `npm install` in the command line to install all dependencies
3. Create an 'output' folder in the directory of the project for the html file to go when created

## Usage
Run the application by entering `node app` into the command line.

Employee detail restrictions
* id and Manager's office number must be a number > 0
* email must in a format of _val1_@_val2_._val3_
  * _val1_ and _val2_ can be made up of any alphanumeric characters, dots ( . ), dashes ( - ) and underscores ( _ )
  * _val3_ must be a length between 2 and 7, inclusive and can be made up of the alphabet
* according to GitHub, the username can only be a max length of 39 characters and made up of alphanumeric characters and dashes, but cannot start or end with a dash 

## Credits
Modularization of code and recursive inquirer adapted from [tutorial](http://www.penandpaperprogrammer.com/blog/2018/12/16/repeating-questions-with-inquirerjs) by [Zachary Abresch](https://github.com/zacharyabresch)

## Tests
Includes a testing suite that tests the creation and methods of the different employee classes (Employee, Engineer, Intern, Manager). To run these tests run `npm test` on the command line.


