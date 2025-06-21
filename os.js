export default class OS {
    constructor() {
        this.status = "stop";
        this.processTable = [];
    };

    start() {
        this.status = "start";
    };

    stop() {
        this.status = "stop";
    };

    addProcess() {
        this.processTable.push({ id, pc, status });
    };

    listProcesses() {
        return this.processTable;
    }
};
