export class ErrorDTO extends Error {
  public status!: number;

  constructor(message?: string, status?: number) {
    super(message ?? "System error");
    this.status = status ?? 500;
  }
}
