import bcrypt from "bcrypt";
import { UserModel } from "../../models/user.model";
import { CreateUserDTO } from "../../../dto/users/creationDTO";
import { UserRepository } from "./user.repository";
import { UserDTO } from "../../../dto/users/userDTO";
import { Model } from "sequelize";

const userData: CreateUserDTO = {
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  birthDate: new Date("1990-01-01"),
  password: "testpassword",
};

const id = "some-uuid";

const hashedPassword = "hashedPassword";

describe("UserRepository", () => {
  beforeEach(() => {
    jest.spyOn(bcrypt, "genSaltSync").mockReturnValue("randomSalt");

    jest.spyOn(bcrypt, "hashSync").mockReturnValue(hashedPassword);
  });

  describe("create", () => {
    it("should create a new user", async () => {
      jest
        .spyOn(UserModel, "create")
        .mockImplementationOnce((data): UserModel => {
          return {
            dataValues: {
              ...data,
              id,
            },
          } as UserModel;
        });

      const result = await UserRepository.create(userData);

      expect(UserModel.create).toHaveBeenCalledWith({
        ...userData,
        password: hashedPassword,
      });
      expect(result).toStrictEqual({
        ...userData,
        password: hashedPassword,
        id,
      });
    });
    it("should catch error when an incorrect email is provided", async () => {
      const expectedMessage =
        "Validation error: Validation isEmail on email failed";

      await expect(
        UserRepository.create({ ...userData, email: "some" }),
      ).rejects.toThrow(expectedMessage);
    });

    it("should catch error when an incorrect birth date is provided", async () => {
      const expectedMessage =
        "Validation error: Validation isDate on birthDate failed";

      await expect(
        UserRepository.create({ ...userData, birthDate: "some" as any }),
      ).rejects.toThrow(expectedMessage);
    });
  });

  describe("getById", () => {
    it("should get an user if it exists", async () => {
      jest.spyOn(UserModel, "findOne").mockReturnValueOnce({
        dataValues: {
          ...userData,
          id,
        },
      } as any);

      const result = await UserRepository.getById(id);

      expect(UserModel.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toStrictEqual({
        ...userData,
        id,
      });
    });

    it("should catch error when user not find", async () => {
      jest.spyOn(UserModel, "findOne").mockReturnValueOnce(undefined as any);

      await expect(UserRepository.getById(id)).rejects.toThrow(
        "User not found",
      );
    });
  });
});
