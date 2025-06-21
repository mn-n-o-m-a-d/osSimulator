export default class OS {
    constructor() {
        this.status = false;
        this.processTable = [];
        this.runQueue = [];
    };

    start() {
        this.status = true;
    };

    stop() {
        this.status = false;
        this.processTable = [];
        this.runQueue = [];
    };

    addProcess(processInstance) {
        this.processTable.push(processInstance);
        if (processInstance.status == "ready") this.runQueue.push(processInstance.id);
    };

    listProcesses() {
        return this.processTable;
    }

    listQueue() {
        return this.runQueue;
    }
};
