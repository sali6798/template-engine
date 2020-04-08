const summaryCreation = require("./lib/summaryCreation");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const main = async () => {
    const employees = await summaryCreation.collectSummary();
    console.log("Ok, creating summary!");
    // turns the employee list into a html
    // that will display all the employee info
    const html = render(employees);
    // write html to file in output/ folder
    fs.writeFileSync(outputPath, html);
};

main();
