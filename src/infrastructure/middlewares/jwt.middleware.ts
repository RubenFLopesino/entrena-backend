import jwt from "koa-jwt";

export const jwtMiddleware = jwt({
  secret: process.env["SECRET_KEY"] as string,
});
