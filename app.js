import OS from './os.js';
import { FixProcess, UserDrivenProcess, EndlessProzess } from './process.js';

//Fehler werfen, wenn es 0 ist
var numOfProcesses = 0;
let speed = 1;
let interval;

const osStatusLabel = document.getElementById("os-status-label");
const addProcessBtn = document.getElementById("add-process-btn");
const removeProcessBtn = document.getElementById("remove-process-btn");
const speedRadios = document.querySelectorAll('input[name="speed-options"]');
let currentProcessId = null;

const osToggle = document.getElementById("os-toggle");
const processListEl = document.getElementById("process-list");

const os = new OS();

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
    updateButtonsState();

    processHandler();
    osStatusLabel.textContent = "ON";
    interval = setInterval(updateProcessList, 1000);
}

function stopOS() {
    os.stop();
    clearInterval(interval);
    updateProcessList();
    updateButtonsState();
    osStatusLabel.textContent = "OFF";
}

function makeProcess(type) {
    numOfProcesses++;

    let process;
    switch (type) {
        case "fix":
            process = new FixProcess(numOfProcesses, 0, "READY");
            break;
        case "userDriven":
            process = new UserDrivenProcess(numOfProcesses, 0, "READY");
            break;
        case "endless":
            process = new EndlessProzess(numOfProcesses, 0, "READY");
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
    const runningCount = processes.filter(p => p.processStatus === "RUNNING").length;

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
        if (queue.length === 0) {
            currentProcessId = null;
            return;
        }

        const id = queue.shift();
        currentProcessId = id;
        const process = listOfProcesses.find(p => p.id === id);

        if (!process) {
            currentProcessId = null;
            next();
            return;
        }

        processStatusChanger(process, () => {
            queue.push(id);
            currentProcessId = null;
            next();
        });
    }

    next();
}

function processStatusChanger(process, callback) {
    console.log("Process start:", process.type);

    setTimeout(() => {
        if (process.status === "READY") {
            process.status = "RUNNING";
            console.log("Status: READY → RUNNING");

            setTimeout(() => {
                process.status = "BLOCKED";
                console.log("Status: RUNNING → BLOCKED");

                if (process.type === "userDriven") {
                    process.continueBlocked = false;

                    updateProcessList();

                    const waitForContinue = () => {
                        if (process.continueBlocked) {
                            updateProcessList();

                            setTimeout(() => {
                                process.status = "READY";
                                console.log("Status: BLOCKED → READY");

                                process.operating();
                                callback();
                            }, 1000 * speed);

                        } else {
                            setTimeout(waitForContinue, 100);
                        }
                    };

                    waitForContinue();

                } else {
                    setTimeout(() => {
                        process.status = "READY";
                        console.log("Status: BLOCKED → READY");

                        process.operating();
                        callback();
                    }, 3000 * speed);
                }

            }, 3000 * speed);
        }
    }, 1500 * speed);
}

addProcessBtn.addEventListener("click", () => {
    if (!osToggle.checked) return;

    const processes = os.listProcesses();
    if (processes.length === 10) {
        return;
    } else {
        const types = ["fix", "userDriven"];
        const randomType = types[Math.floor(Math.random() * types.length)];
        makeProcess(randomType);
        updateProcessList();
        updateButtonsState();
    }
});

removeProcessBtn.addEventListener("click", () => {
    if (!osToggle.checked) return;

    removeProcess();
    updateProcessList();
    updateButtonsState();
});

function removeProcess() {
    const processes = os.listProcesses();
    if (processes.length === 1) {
        processStatusController();
        return;
    };

    const processToRemove = processes[processes.length - 1];
    os.removeProcess(processToRemove.id);
    numOfProcesses = Math.max(0, numOfProcesses - 1);

    if (currentProcessId === processToRemove.id) {
        currentProcessId = null;
        processStatusController();
    }

    updateProcessList();
    updateButtonsState();
}

function updateButtonsState() {
    const processes = os.listProcesses();
    addProcessBtn.disabled = !osToggle.checked || processes.length >= 10;
    removeProcessBtn.disabled = !osToggle.checked || processes.length <= 1;
}

speedRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        speed = parseFloat(e.target.value);
        console.log("Speed set to:", speed);
    });
});

function updateProcessList() {
    const processes = os.listProcesses();
    processListEl.innerHTML = "";

    processes.forEach(p => {

        const li = document.createElement("li");
        li.className = "list-group-item process-card d-flex flex-column";

        const headerDiv = document.createElement("div");
        headerDiv.className = "process-header text-center mb-3";

        const label = document.createElement("div");
        label.textContent = `Prozess ${p.id}`;
        label.className = "fw-semibold fs-5";

        const typeLabel = document.createElement("div");
        typeLabel.textContent = p.type;
        typeLabel.className = "process-type text-muted fst-italic";

        headerDiv.appendChild(label);
        headerDiv.appendChild(typeLabel);

        const statusContainer = document.createElement("div");
        statusContainer.className = "status-container d-flex justify-content-around";

        const states = ["READY", "RUNNING", "BLOCKED"];

        states.forEach(state => {
            const span = document.createElement("span");
            span.textContent = state;
            span.className = `badge text-center rounded-pill px-3 py-2 fw-medium text-uppercase ${p.status === state ? `status-${state.toLowerCase()}` : "status-inactive"
                }`;
            statusContainer.appendChild(span);
        });

        li.appendChild(headerDiv);
        li.appendChild(statusContainer);
        if (p.type === "userDriven") {
            const continueBtn = document.createElement("button");
            continueBtn.textContent = "Continue";
            continueBtn.className = "btn btn-sm btn-primary mt-1";

            continueBtn.disabled = p.status !== "BLOCKED";

            continueBtn.addEventListener("click", () => {
                p.continueBlocked = true;
                continueBtn.disabled = true;
            });

            li.appendChild(continueBtn);
        }

        processListEl.appendChild(li);
    });
}
