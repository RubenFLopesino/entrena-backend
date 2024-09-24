import { MailerService } from "./mailer.service";

describe("MailerService", () => {
  const to = "test@example.com";
  const subject = "Test Subject";
  const text = "Test Body";
  const from = "noreply@example.com";
  it("should send an email and log the details", async () => {
    const consoleSpy = jest.spyOn(console, "log");

    await MailerService.sendMail(to, subject, text, from);

    expect(consoleSpy).toHaveBeenCalledWith(
      `Email to ${to} from ${from} with subject ${subject} and body ${text}`,
    );
  });

  it("should throw an error if there is an error during sendMail", async () => {
    jest.spyOn(console, "log").mockImplementationOnce(() => {
      throw new Error("Simulated failure");
    });

    await expect(
      MailerService.sendMail(to, subject, text, from),
    ).rejects.toThrow("Error sending email to the admin");
  });
});
