import OS from './os.js';
import Process from  './prozess.js';

const process1 = new Process(1, 1, "ready");

//Fehler werfen, wenn es 0 ist
var numOfProcesses = 1;

const os = new OS();
os.start();
console.log(os.status);
os.addProcess(1, process1.type, process1.programmCounter, process1.status);
console.log(os.listProcesses());
console.log(os.listQueue());
os.stop();
console.log(os.status);
console.log(os.listProcesses());
console.log(os.runQueue);

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