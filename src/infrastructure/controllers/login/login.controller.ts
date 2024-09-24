import jsonwebtoken from "jsonwebtoken";
import { Context } from "koa";
import { LoginRepository } from "../../../domain/repositories/login/login.repository";
import { LoginDTO } from "../../../dto/login/loginDTO";
import { ErrorDTO } from "../../../dto/errors/errorDTO";

export class LoginController {
  static async login(ctx: Context) {
    try {
      const { email, password } = ctx.request.body as LoginDTO;
      const { id } = await LoginRepository.login(email, password);
      const token = jsonwebtoken.sign(
        { id },
        process.env["SECRET_KEY"] as string,
        {
          expiresIn: "1m",
        },
      );
      const status = 200;

      ctx.status = status;
      ctx.body = { status, token };
    } catch (error) {
      throw new ErrorDTO(error.message, error.status);
    }
  }
}
