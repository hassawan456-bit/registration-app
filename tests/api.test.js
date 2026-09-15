const { describe, it, before, after } = require("node:test");
const assert = require("node:assert");
const http = require("http");
const app = require("../server");

let server;
let BASE;

before(() => {
  return new Promise((resolve) => {
    server = app.listen(0, () => {
      BASE = `http://localhost:${server.address().port}`;
      resolve();
    });
  });
});

after(() => {
  server.close();
});

function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request(`${BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) },
    }, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve({ status: res.statusCode, json: JSON.parse(body) }));
    });
    req.on("error", reject);
    req.end(data);
  });
}

function post(path) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE}${path}`, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve({ status: res.statusCode, json: JSON.parse(body) }));
    }).on("error", reject);
  });
}

describe("Registration API", () => {
  it("should register a new user", async () => {
    const res = await post("/register", {
      firstName: "Test", lastName: "User", email: "test@test.com", password: "123456",
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.json.success, true);
  });

  it("should reject empty fields", async () => {
    const res = await post("/register", { firstName: "" });
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.json.success, false);
  });

  it("should list registered users", async () => {
    const res = await get("/users");
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.json));
  });
});