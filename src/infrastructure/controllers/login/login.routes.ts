import Router from "koa-router";
import { LoginController } from "./login.controller";

const loginRouter = new Router();

loginRouter.post("/login", LoginController.login);

export default loginRouter;
