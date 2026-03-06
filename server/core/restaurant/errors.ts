export class RestaurantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RestaurantError";
  }
}
