import OS from './os.js';
import Process, { FixProcess, UserDrivenProcess, EndlessProzess } from './process.js';

//Fehler werfen, wenn es 0 ist
var numOfProcesses = 0;
let speed = 1;

const os = new OS();
os.start();

// First process
makeProcess("endless");

console.log("OS status:", os.status);

makeProcess("fix");
makeProcess("endless");
processHandler();

/*
os.stop();
console.log("OS status after stop:", os.status);
console.log("Processes:", os.listProcesses());
console.log("Queue:", os.runQueue);
*/

///////////////////// Functions

function makeProcess(type) {
    numOfProcesses++;

    let process;
    switch (type) {
        case "fix":
            process = new FixProcess(numOfProcesses, 0, "ready");
            break;
        case "userDriven":
            process = new UserDrivenProcess(numOfProcesses, 0, "ready");
            break;
        case "endless":
            process = new EndlessProzess(numOfProcesses, 0, "ready");
            break;
        default:
            throw new Error("Unknown process type: " + type);
    }

    os.addProcess(process);
}

function processHandler() {
    processController();
    processStatusController();
};

function processController() {
    const processes = os.listProcesses();
    const runningCount = processes.filter(p => p.processStatus === "running").length;

    if (runningCount > 1) {
        console.log("ERROR");
    } else {
        console.log("OK");
    }
};

function processStatusController() {
    const listOfProcesses = os.listProcesses();
    const queue = os.runQueue;

    console.log("QUEUE:", [...queue]);

    if (queue.length > 1) {
        const firstId = queue.shift();
        console.log("QUEUE ID: ", firstId);
        const process = listOfProcesses.find(p => p.id === firstId);
        processStatusChanger(process);
        queue.push(firstId);
    }
}

function processStatusChanger(process) {
    console.log("Process start: ", process);

    if (process.status === "ready") {
        process.status = "running";
        console.log("Status: ready → running");

        setTimeout(() => {
            process.status = "blocked";
            console.log("Status: running → blocked");

            setTimeout(() => {
                process.status = "ready";
                console.log("Status: blocked → ready");

            }, 3000 * speed);

        }, 3000 * speed);
    }

    process.operating(speed);
}

/*
const process2 = new Process(2, 16, "running");
const process3 = new Process(3, 2, "ready");
const process4 = new Process(4, 2, "ready");
*/

/*
os.addProcess(2, process2.type, process2.programmCounter, process2.status);
os.addProcess(3, process3.type, process3.programmCounter, process3.status);
os.addProcess(4, process4.type, process4.programmCounter, process4.status);
*/