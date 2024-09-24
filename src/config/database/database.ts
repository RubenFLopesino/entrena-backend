import { Sequelize } from "sequelize";

export class Database {
  private static _instance: Sequelize;

  static get instance(): Sequelize {
    if (!this._instance)
      this._instance = new Sequelize({
        dialect: "sqlite",
        storage: "./database.sqlite",
        logging: process.env["ENVIRONMENT"] === "PROD" ? false : true,
      });
    return this._instance;
  }
}
