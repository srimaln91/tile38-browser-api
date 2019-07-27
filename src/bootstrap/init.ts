import HttpServer from "../transport/http/server";

export default function Bootstrap() {
    let server = new HttpServer();
    server.Init();
}
