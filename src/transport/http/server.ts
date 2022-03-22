import cors from "cors";
import Express from "express";
import Router from "./router";

export default class HttpServer {
    app: Express.Express
    router: Express.Router

    constructor() {
        this.app = Express();
    }

    Init() {

        let router: Router = new Router();
        router.Init()

        let expressRouter: Express.Router = router.router;

        this.app.use(cors());
        this.app.use("/", expressRouter)

        let port: string = process.env.APP_PORT;

        this.app.listen(parseInt(port), () => {
            return console.log(`server is listening on ${port}`);
        });
    }
}
