export enum PROTOCOL_METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}
export const HTTP_OPTIONS = (method: PROTOCOL_METHOD) => {
  return {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };
};