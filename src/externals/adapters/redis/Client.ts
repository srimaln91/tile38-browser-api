import Redis from "redis";
import { RedisAdapterInterface } from "../../../interfaces/RedisAdapterInterface";
import Command from "./Command";
import Conn from "./Connection";

export default class RedisClient implements RedisAdapterInterface {

    conn: Conn;
    client: Redis.client;

    constructor(conn: Conn) {
        this.conn = conn;
    }

    Connect() {
        this.client = Redis.createClient({
            host: this.conn.server,
            port: this.conn.port,
            db: this.conn.database
        })

        this.client.on("ready", () => {
            let setJSONCommand = new Command("OUTPUT");
            setJSONCommand.AddArgument("json");

            this.Exec(setJSONCommand).then((res) => {
                console.log(res);
            })

            console.log("Ready");
        });

        this.client.on("connect", () => {
            console.log("Connected");
        });

        this.client.on("error", (err) => {
            console.log("Error:", err);
        });
    }

    Exec(cmd: Command) {
        return new Promise((resolve, reject) => {
            this.client.sendCommand(cmd.command, cmd.arguments, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }
}
