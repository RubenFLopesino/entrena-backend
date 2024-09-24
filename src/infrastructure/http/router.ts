import { Middleware } from "koa";
import combineRouters from "koa-combine-routers";
import userRouter from "../controllers/users/users.routes";
import loginRouter from "../controllers/login/login.routes";
import mailerRouter from "../controllers/mailer/mailer.routes";

export class RootRouter {
  private static readonly prefix = "/api";

  static get routes(): Middleware {
    return combineRouters(
      userRouter.prefix(this.prefix),
      loginRouter.prefix(this.prefix),
      mailerRouter.prefix(this.prefix),
    )();
  }
}
