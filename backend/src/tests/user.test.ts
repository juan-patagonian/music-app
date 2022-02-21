import mongoose from "mongoose";
import app from "../../app";
import supertest from "supertest";
import { User } from "../models/user";

beforeEach((done) => {
  mongoose.connect("mongodb://localhost:27017/test_db").then(() => done());
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

test("POST /auth/login", async () => {
  const userData = {
    nickname: "loginUser",
    email: "loginUser@user.com",
    password: "loginusertest",
  };
  const loginUser = new User(userData);

  await loginUser.save();
  await supertest(app)
    .post("/api/auth/login")
    .send({
      email: userData.email,
      password: userData.password,
    })
    .expect(200)
    .then(async (response) => {
      expect(response.body.token).toBeTruthy();
    });
});

test("POST /auth/register", async () => {
  const userData = {
    nickname: "testingUser",
    email: "testingUser@user.com",
    password: "testtest",
    repeatPassword: "testtest",
  };

  await supertest(app)
    .post("/api/auth/register")
    .send(userData)
    .expect(200)
    .then(async (response) => {
      expect(response.body._id).toBeTruthy();
      expect(response.body.nickname).toBe(userData.nickname);
      expect(response.body.email).toBe(userData.email);
      expect(response.body.password).toBeTruthy();
      expect(Array.isArray(response.body.favoriteSongs)).toBeTruthy();
      expect(response.body.favoriteSongs.length).toEqual(0);
      expect(Array.isArray(response.body.recentSearchTerms)).toBeTruthy();
      expect(response.body.recentSearchTerms.length).toEqual(0);

      // Check the userData in the database
      const user = await User.findOne({ _id: response.body._id }).exec();
      expect(user).toBeTruthy();
    });
});
