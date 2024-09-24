import bcrypt from "bcrypt";

import { UserDTO } from "../../../dto/users/userDTO";
import { UserModel } from "../../models/user.model";
import { ErrorDTO } from "../../../dto/errors/errorDTO";

export class LoginRepository {
  static async login(email: string, password: string): Promise<UserDTO> {
    try {
      const user = (
        await UserModel.findOne({
          where: { email },
        })
      )?.dataValues;

      if (!user) throw new ErrorDTO("User not found", 404);

      if (!bcrypt.compareSync(password, user.password))
        throw new ErrorDTO("Incorrect password", 401);

      return user;
    } catch (error) {
      throw new ErrorDTO(error.message, error.status);
    }
  }
}
