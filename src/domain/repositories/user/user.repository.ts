import bcrypt from "bcrypt";
import { ErrorDTO } from "../../../dto/errors/errorDTO";
import { CreateUserDTO } from "../../../dto/users/creationDTO";
import { UserDTO } from "../../../dto/users/userDTO";
import { UserModel } from "../../models/user.model";

export class UserRepository {
  private static readonly saltRounds = 10;
  private static readonly salt = bcrypt.genSaltSync(this.saltRounds);

  static async create(data: CreateUserDTO): Promise<UserDTO> {
    try {
      const creationData = {
        ...data,
        password: bcrypt.hashSync(data.password, this.salt),
      };
      const user = (await UserModel.create(creationData)).dataValues;

      return user;
    } catch (error) {
      throw new ErrorDTO(error.message, error.status);
    }
  }

  static async getById(id: string): Promise<UserDTO | undefined> {
    try {
      const user = (await UserModel.findOne({ where: { id } }))?.dataValues;

      if (!user) throw new ErrorDTO("User not found", 404);

      return user;
    } catch (error) {
      throw new ErrorDTO(error.message, error.status);
    }
  }
}
