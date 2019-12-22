import Express from "express";
import RedisClient from "../../externals/adapters/redis/Client";
import RedisCommand from "../../externals/adapters/redis/Command";
import RedisConn from "../../externals/adapters/redis/Connection";

export default class Router {

    public router: Express.Router;

    constructor() {
        this.router = Express.Router()
    }

    public Init() {
        this.attachMiddlewares()
        this.attachRoutes()
    }

    private attachRoutes() {

        let redisConfig = new RedisConn("34.87.7.98", 9851, 0);
        let redisClient = new RedisClient(redisConfig);
        redisClient.Connect();

        this.router.get('/collections', (req, res) => {

            let cmd: RedisCommand = new RedisCommand("KEYS");
            cmd.AddArgument("*");
            console.log(cmd.GetCommandString());

            redisClient.Exec(cmd).then(result => {
                res.status(200).set({ "Content-Type": "application/json" }).write(result)
                res.end()

            }).catch(err => {
                console.error(err);
                res.sendStatus(404).end()
            });

        })

        this.router.get('/collections/:collection', (req, res) => {
            let cmd: RedisCommand = new RedisCommand("SCAN");
            cmd.AddArgument(req.params.collection);
            cmd.AddArgument("IDS");
            console.log(cmd.GetCommandString());
            redisClient.Exec(cmd).then(result => {
                res.status(200).set({ "Content-Type": "application/json" }).write(result)
                res.end()

            }).catch(err => {
                console.error(err);
                res.sendStatus(404).end()
            });
        })

        this.router.get('/collections/:coll/id/:id', (req, res) => {
            let cmd: RedisCommand = new RedisCommand("GET");
            cmd.AddArgument(req.params.coll);
            cmd.AddArgument(req.params.id);;
            console.log(cmd.GetCommandString());

            redisClient.Exec(cmd).then(result => {
                res.status(200).set({ "Content-Type": "application/json" }).write(result)
                res.end()

            }).catch(err => {
                console.error(err);
                res.sendStatus(404).end()
            });
        })
    }

    private attachMiddlewares() {

        // middleware that is specific to this router
        this.router.use(function (req, res, next) {
            console.log('Time: ', Date.now())
            next()
        })
    }

}
