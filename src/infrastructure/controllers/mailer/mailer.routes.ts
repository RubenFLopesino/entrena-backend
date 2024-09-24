import Router from "koa-router";
import { MailerController } from "./mailer.controller";

const mailerRouter = new Router();

mailerRouter.put("/send-mail", MailerController.sendMail);

export default mailerRouter;
