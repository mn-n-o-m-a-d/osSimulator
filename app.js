import OS from './os.js';

const os = new OS();
os.start();
console.log(os.status);
os.addProcess(1, 15, "READY");
os.addProcess(3, 10, "BLOCKED");
console.log(os.listProcesses());
os.stop();
console.log(os.status);
