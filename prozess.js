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
                setTimeout(() => {
                    console.log("Process running");
                }, 5000 * this.type);
                break;
            case "blocked":
                setTimeout(() => {
                    console.log("Process blocked");
                }, 2000 * this.type);
                break;
            default:
                console.log("Undefined process status! " + this.status);
        }

    }

}