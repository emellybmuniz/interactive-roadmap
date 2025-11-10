import "dotenv/config";
import request from "supertest";
import { jest } from '@jest/globals';
import mongoose from "mongoose";

const mockUser = {
  findOne: jest.fn(),
  create: jest.fn(),
};

const mockRoadmap = {
  create: jest.fn(),
};

jest.unstable_mockModule("../models/User.js", () => ({
  default: mockUser,
}));

jest.unstable_mockModule("../models/Roadmap.js", () => ({
  default: mockRoadmap,
}));

describe("Auth Endpoints", () => {
  let app;
  let server;

  beforeAll(async () => {
    const imported = await import("../server.js");
    app = imported.default;
    server = imported.server;
  });

  afterAll(async () => {
    await mongoose.disconnect();
    server.close();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user", async () => {
    mockUser.findOne.mockResolvedValue(null);
    mockUser.create.mockResolvedValue({
      _id: "userId",
      name: "Test User",
      email: "testuser@example.com",
    });
    mockRoadmap.create.mockResolvedValue({});

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should not register a user with an existing email", async () => {
    mockUser.findOne.mockResolvedValue({ email: "testuser@example.com" });

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(400);
  });

  it("should log in an existing user", async () => {
    const userInstance = {
      _id: "userId",
      name: "Test User",
      email: "testuser@example.com",
      comparePassword: jest.fn().mockResolvedValue(true),
    };
    mockUser.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue(userInstance),
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not log in with incorrect password", async () => {
    const userInstance = {
      comparePassword: jest.fn().mockResolvedValue(false),
    };
    mockUser.findOne.mockReturnValue({
      select: jest.fn().mockResolvedValue(userInstance),
    });

    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(401);
  });
});
