import Router from "koa-router";
import { UserController } from "./users.controller";
import { jwtMiddleware } from "../../middlewares/jwt.middleware";
import { verifyUserId } from "../../middlewares/verifyUserId.middleware";

const userRouter = new Router();

userRouter.post("/users", UserController.createUser);
userRouter.get(
  "/users/:id",
  jwtMiddleware,
  verifyUserId,
  UserController.getById,
);

export default userRouter;
