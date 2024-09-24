import { Context } from "koa";
import { ErrorDTO } from "../../../dto/errors/errorDTO";
import { CreateUserDTO } from "../../../dto/users/creationDTO";
import { UserRepository } from "../../../domain/repositories/user/user.repository";

export class UserController {
  static async createUser(ctx: Context) {
    try {
      ctx.body = await UserRepository.create(
        UserController.mapCreateRequest(ctx.request.body)
      );
      ctx.status = 201;
    } catch (error) {
      throw new ErrorDTO(error.message, error.status);
    }
  }

  static async getById(ctx: Context) {
    try {
      const { id } = ctx["params"];
      const user = await UserRepository.getById(id);
      ctx.body = user;
    } catch (error) {
      throw new ErrorDTO(error.message, error.status);
    }
  }

  private static mapCreateRequest(request: any): CreateUserDTO {
    return {
      email: request.email,
      password: request.password,
      firstName: request.firstName,
      lastName: request.lastName,
      birthDate: new Date(request.birthDate),
    };
  }
}
