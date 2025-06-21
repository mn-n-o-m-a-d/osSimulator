export default class Process {

    constructor(id, type, programmCounter, status) {
        this.id = id;
        this.type = type;
        this.programmCounter = programmCounter;
        this.status = status;
    }

    operating() {
        console.log(`[${this.type}] Process operating (status: ${this.status})`);
    }

    programmCounting() {
        this.programmCounter++;
        if (this.programmCounter > 6) {
            this.programmCounter = 0;
        }
    }
}

export class FixProcess extends Process {
    constructor(id, programmCounter, status) {
        super(id, "fix", programmCounter, status);
    }

    operating() {
        this.programmCounting();
    }
}

export class UserDrivenProcess extends Process {
    constructor(id, programmCounter, status) {
        super(id, "userDriven", programmCounter, status);
    }

    operating() {
        this.programmCounting();
    }
}

export class EndlessProzess extends Process {
    constructor(id, programmCounter, status) {
        super(id, "endless", programmCounter, status);
    }

    operating() {
        this.programmCounting();
    }
}