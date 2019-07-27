import { RedisCommandInterface } from "../../../interfaces/RedisAdapterInterface";

export default class RedisCommand implements RedisCommandInterface {
    public command: string;
    public arguments: string[] = [];

    constructor(command: string) {
        this.command = command;
    }

    AddArgument(argument: string) {
        this.arguments.push(argument);
    }

    GetCommandString() {
        return [this.command].concat(this.arguments).join(" ");
    }
}
