import { CreateUserDTO } from "./creationDTO";

export interface UserDTO extends CreateUserDTO {
  id: string;
}
