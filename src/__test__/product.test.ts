import supertest from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../server";
import { createProductToDB } from "../service/product.service";

const app = createServer();

const productPayload = {
  name: "test",
  price: 100,
  stock: 10,
};

describe("product", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get all products", () => {
    it("should return 200 and all products", async () => {
      const { body } = await supertest(app).get("/product").expect(200);
      console.log("🚀 ~ it ~ body:", body);
    });
  });

  describe("get detail product", () => {
    describe("given a fake id", () => {
      it("should return 404 if product not found", async () => {
        const productId = "667560e87e4c45a83d9259d6";
        await supertest(app).get(`/product/${productId}`).expect(404);
      });
    });
  });

  describe("create product", () => {
    describe("given a valid payload", () => {
      it("should return 200 once product created", async () => {
        const product = await createProductToDB(productPayload);
        await supertest(app).get(`/product/${product._id}`).expect(22);
      });
    });
  });
});
