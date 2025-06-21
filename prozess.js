export default class Process {

    constructor(type, programmCounter, status) {
        this.type = type;
        this.programmCounter = programmCounter;
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