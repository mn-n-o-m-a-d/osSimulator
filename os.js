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

    addProcess(id, pc, processStatus) {
        this.processTable.push({ id, pc, processStatus });
    };

    listProcesses() {
        return this.processTable;
    }
};
