import { RedisConnectionInterface } from "../../../interfaces/RedisAdapterInterface";

export default class RedisConn implements RedisConnectionInterface {

    public server: string
    public port: number
    public database: number

    constructor(server: string, port: number, db: number) {
        this.server = server;
        this.port = port;
        this.database = db;

        return this;
    }

}
