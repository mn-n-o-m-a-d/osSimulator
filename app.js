import OS from './os.js';
import { FixProcess, UserDrivenProcess, EndlessProzess } from './process.js';

//Fehler werfen, wenn es 0 ist
var numOfProcesses = 0;
let speed = 1;

const osToggle = document.getElementById("os-toggle");
const processListEl = document.getElementById("process-list");
const os = new OS();

/*
os.stop();
console.log("OS status after stop:", os.status);
console.log("Processes:", os.listProcesses());
console.log("Queue:", os.runQueue);
*/

///////////////////// Functions

osToggle.addEventListener("change", () => {
    if (osToggle.checked) {
        startOS();
    } else {
        stopOS();
    }
});

function startOS() {
    numOfProcesses = 0;
    os.stop();
    os.start();
    makeProcess("endless");
    makeProcess("fix");
    makeProcess("endless");

    processHandler();
    interval = setInterval(updateProcessList, 500);
}

function stopOS() {
    os.stop();
    clearInterval(interval);
    updateProcessList();
}

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

    function next() {
        if (queue.length === 0) return;

        const id = queue.shift();
        const process = listOfProcesses.find(p => p.id === id);

        processStatusChanger(process, () => {
            queue.push(id);
            next();  
        });
    }

    next();
}


function processStatusChanger(process, callback) {
    console.log("Process start:", process);

    if (process.status === "ready") {
        process.status = "running";
        console.log("Status: ready → running");

        setTimeout(() => {
            process.status = "blocked";
            console.log("Status: running → blocked");

            setTimeout(() => {
                process.status = "ready";
                console.log("Status: blocked → ready");

                process.operating();

                // Nur wenn komplett durch ist → Callback für nächsten Prozess aufrufen
                callback();

            }, 3000 * speed);

        }, 3000 * speed);
    }
}

function updateProcessList() {
    const processes = os.listProcesses();
    processListEl.innerHTML = "";

    processes.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `Prozess ${p.id}: ${p.status}`;
        li.className = `status-${p.status.toLowerCase()}`;
        processListEl.appendChild(li);
    });
}