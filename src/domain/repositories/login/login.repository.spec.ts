import bcrypt from "bcrypt";
import { UserDTO } from "../../../dto/users/userDTO";
import { UserModel } from "../../models/user.model";
import { LoginRepository } from "./login.repository";

const userData: UserDTO = {
  id: "some-id",
  email: "test@example.com",
  firstName: "Test",
  lastName: "User",
  birthDate: new Date("1990-01-01"),
  password: "testpassword",
};

describe("LoginRepository", () => {
  describe("login", () => {
    it("should login correctly if email and password are correct", async () => {
      jest.spyOn(bcrypt, "compareSync").mockReturnValue(true);
      jest.spyOn(UserModel, "findOne").mockReturnValueOnce({
        dataValues: userData,
      } as any);

      const user = await LoginRepository.login(
        userData.email,
        userData.password,
      );

      expect(user).toStrictEqual(userData);
    });

    it("Should catch error when user not find", async () => {
      jest.spyOn(UserModel, "findOne").mockReturnValueOnce(undefined as any);
      jest.spyOn(bcrypt, "compareSync").mockReturnValue(true);

      await expect(
        LoginRepository.login(userData.email, userData.password),
      ).rejects.toThrow("User not found");
    });
    it("Should catch error when user is found but password is incorrect", async () => {
      jest.spyOn(UserModel, "findOne").mockReturnValueOnce({
        dataValues: userData,
      } as any);
      jest.spyOn(bcrypt, "compareSync").mockReturnValue(false);

      await expect(
        LoginRepository.login(userData.email, userData.password),
      ).rejects.toThrow("Incorrect password");
    });
  });
});
