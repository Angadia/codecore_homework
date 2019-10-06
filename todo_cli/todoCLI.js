const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});

const todoList = [];

console.log("\nWelcome to Todo CLI!");
console.log("--------------------");

function todoView() {
    console.log('');
    for (let index = 0; index < todoList.length; index++) {
        const todoEntry = todoList[index];
        console.log(`${index} [${todoEntry.completed ? '✓' : ' '}] ${todoEntry.title}`);
    };
    console.log('');
};

function todoAdd() {
    console.log('\nWhat?');
    rl.question('> ', (answer) => {
        todoList.push({"completed":false, "title":answer.toString()});
        console.log('');
        todoMenu();
    });
};

function todoComplete(n) {
    todoList[n].completed = true;
    console.log(`\nCompleted \"${todoList[n].title}\"\n`);
};

function todoDelete(n) {
    console.log(`\nDeleted \"${todoList.splice(n,1)[0].title}\"\n`);
};

function todoQuit() {
    console.log('\nSee you soon! 😄');
    rl.close();
    process.exit();
};

function isValidTodoIndex(ansNum) {
    if (Number.isInteger(parseInt(ansNum))) {
        const index = parseInt(ansNum);
        return index >= 0 && index < todoList.length;
    };
    return false;
};

function todoMenu() {
    console.log("(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit");

    rl.question("> ", (answer) => {
        if (answer == 'v') {
            todoView();
            todoMenu();
        } else if (answer == 'n') {
            todoAdd();
        } else if (answer.toString().charAt(0) == 'c' && 
                    isValidTodoIndex(answer.toString().slice(1))){
            todoComplete(parseInt(answer.toString().slice(1)));
            todoMenu();
        } else if (answer.toString().charAt(0) == 'd' && 
                    isValidTodoIndex(answer.toString().slice(1))) {
            todoDelete(parseInt(answer.toString().slice(1)));
            todoMenu();
        } else if (answer == 'q') {
            todoQuit();
        } else {
            console.log("\nPlease enter one of the listed options.\n")
            todoMenu();
        };
    });
};

function loadTodoFile(fileName) {
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        JSON.parse(data.toString()).forEach(todoEntry => {
            todoList.push(todoEntry);
        });
    });
};

if (process.argv.length == 3) {
    loadTodoFile(process.argv[2]);
};
todoMenu();
