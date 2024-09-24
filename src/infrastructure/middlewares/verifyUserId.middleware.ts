import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { Context, Next } from "koa";

export const verifyUserId = async (ctx: Context, next: Next) => {
  const token = ctx.request.headers["authorization"]
    ? ctx.request.headers["authorization"].split(" ")[1]
    : undefined;

  if (!token) {
    ctx.status = 401;
    ctx.body = { status: 401, message: "Token missing" };
    return;
  }

  try {
    const decoded = jsonwebtoken.decode(token) as JwtPayload;
    const tokenUserId = decoded?.["id"];
    const { id } = ctx["params"];
    if (tokenUserId !== id) {
      ctx.status = 403;
      ctx.body = {
        status: 403,
        message: "You are not authorized to access this resource",
      };
      return;
    }
    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { status: 401, message: "Invalid token" };
  }
};
