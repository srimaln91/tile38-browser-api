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

        this.app.use("/", expressRouter)

        let port: number = 3003;

        this.app.listen(port, err => {
            if (err) {
                return console.error(err);
            }
            return console.log(`server is listening on ${port}`);
        });

    }

}
