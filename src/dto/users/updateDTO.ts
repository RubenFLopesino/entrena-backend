export interface UpdateUserDTO {
  id: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
}
