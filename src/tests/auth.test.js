import request from "supertest";
import app from "../app.js";

describe("Auth Tests", () => {
  test("Login should return a token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "basharalkhawlani@gmail.com",
        password: "Bb2016bb"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
