class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    (this.data = data), (this.message = message), (this.success = statusCode);
    this.statusCode = statusCode;
  }
}

export { ApiResponse };
