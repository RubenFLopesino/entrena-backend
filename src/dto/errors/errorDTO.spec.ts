import { ErrorDTO } from "./errorDTO";

describe("ErrorDTO", () => {
  const defaultStatus = 500;
  const defaultMessage = "System error";
  it("should create an instance of ErrorDTO with default values", () => {
    const error = new ErrorDTO();

    expect(error.message).toBe(defaultMessage);
    expect(error.status).toBe(defaultStatus);
  });

  it("should create an instance of ErrorDTO with a custom message", () => {
    const customMessage = "Custom error message";

    const error = new ErrorDTO(customMessage);

    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(defaultStatus);
  });

  it("should create an instance of ErrorDTO with a custom message and status", () => {
    const customMessage = "Custom error message";
    const customStatus = 404;

    const error = new ErrorDTO(customMessage, customStatus);

    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(customStatus);
  });

  it("should create an instance of ErrorDTO with a default message and custom status", () => {
    const customStatus = 403;

    const error = new ErrorDTO(undefined, customStatus);

    expect(error.message).toBe(defaultMessage);
    expect(error.status).toBe(customStatus);
  });
});
