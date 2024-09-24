import { ErrorDTO } from "../../dto/errors/errorDTO";

export class MailerService {
  static async sendMail(
    to: string,
    subject: string,
    text: string,
    from: string,
  ): Promise<void> {
    try {
      console.log(
        `Email to ${to} from ${from} with subject ${subject} and body ${text}`,
      );
    } catch (error) {
      throw new ErrorDTO("Error sending email to the admin", 500);
    }
  }
}
