import { Database } from "./config/database/database";
import { UserRepository } from "./domain/repositories/user/user.repository";
import { AppServer } from "./infrastructure/http/server";

Database.instance.sync({ force: true }).then(async () => {
  const user = await UserRepository.create({
    email: "ruben@gmail.com",
    firstName: "Rubén",
    lastName: "Fernández Lopesino",
    birthDate: new Date("1994-09-28"),
    password: "password",
  });
  console.table({
    password: user.password,
    email: user.email,
    id: user.id,
  });
  AppServer.initServer();
});
