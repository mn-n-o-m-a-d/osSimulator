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
        if (processInstance.status == "READY") this.runQueue.push(processInstance.id);
    };

    removeProcess(id) {
        this.processTable = this.processTable.filter(p => p.id !== id);
        this.runQueue = this.runQueue.filter(pid => pid !== id);
    };

    listProcesses() {
        return this.processTable;
    }

    listQueue() {
        return this.runQueue;
    }
};
