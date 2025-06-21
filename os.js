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

    addProcess(id, type, pc, processStatus) {
        this.processTable.push({ id, type, pc, processStatus });
        if (processStatus === 'ready') this.runQueue.push(id);
    };

    listProcesses() {
        return this.processTable;
    }

    listQueue() {
        return this.runQueue;
    }
};
