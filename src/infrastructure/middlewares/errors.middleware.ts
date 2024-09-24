import { Context, Next } from "koa";

const errorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status;
    ctx.body = {
      error: error.status,
      message: error.message,
    };
  }
};

export default errorMiddleware;
