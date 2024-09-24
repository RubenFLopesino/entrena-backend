import { Context } from "koa";
import { ErrorDTO } from "../../../dto/errors/errorDTO";
import { MailerService } from "../../services/mailer.service";

export class MailerController {
  static async sendMail(ctx: Context) {
    try {
      const { subject, body, from } = ctx.request.body as MailerDTO;

      MailerService.sendMail(
        process.env["ADMIN_EMAIL"] as string,
        subject,
        body,
        from,
      );

      ctx.status = 200;
      ctx.body = {
        status: 200,
        message:
          "You have failed your login 3 times within the last minute, a email to the admin have been sent",
      };
    } catch (error) {
      throw new ErrorDTO(error.message, error.status);
    }
  }
}
