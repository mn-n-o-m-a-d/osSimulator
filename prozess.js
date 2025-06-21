class Process {

    constructor(type, status) {
        this.type = type;
        this.status = status
    }

    get type() {
        return this.type;
    }

    get status() {
        return this.status;
    }

    set type(type) {
        this.type = type;
    }

    set status(status) {
        this.status = status;
    }

    operating() {
        switch (this.status) {
            case "ready":
                console.log("Process ready");
                break;
            case "running":
                console.log("Process running");
                break;
            case "blocked":
                console.log("Process blocked");
                break;
            default:
                console.log("Undefined process status! " + this.status);
        }

    }

    



}