import { Server } from "http";
import { default as Application, default as koa } from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import { RootRouter } from "./router";
import errorMiddleware from "../middlewares/errors.middleware";

export class AppServer {
  private static app: Application = new koa();

  static initServer(): Server {
    this.app.use(errorMiddleware);
    this.app.use(cors());
    this.app.use(bodyParser());
    this.app.use(RootRouter.routes);
    return this.app.listen(process.env["PORT"], async () => {
      console.log(`Listening on ${process.env["PORT"]}`);
    });
  }
}
