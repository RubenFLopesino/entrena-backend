import { Sequelize } from "sequelize";
import { Database } from "./database";

jest.mock("sequelize");

describe("Database", () => {
  it("should return an instance of Sequelize", () => {
    const instance = Database.instance;
    expect(instance).not.toBeUndefined();
    expect(instance).toBeInstanceOf(Sequelize);
  });

  it("should always return the same instance", () => {
    const instance1 = Database.instance;
    const instance2 = Database.instance;
    expect(instance1).toBe(instance2);
  });
});
