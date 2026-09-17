const { describe, it, before, after } = require("node:test");
const assert = require("node:assert");
const http = require("http");
const app = require("../server/server");

let server;
let BASE;

before(async () => {
  // wait for the app to finish connecting to DB
  return new Promise((resolve, reject) => {
    const tries = () => {
      try {
        server = app.listen(0, () => {
          BASE = `http://localhost:${server.address().port}`;
          resolve();
        });
      } catch (e) {
        if (tries.calls > 10) return reject(e);
        tries.calls = (tries.calls || 0) + 1;
        setTimeout(tries, 500);
      }
    };
    tries();
  });
});

after(() => {
  server.close();
});

function req(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      method,
      path,
      headers: data ? { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(data) } : {},
    };
    const r = http.request(`${BASE}${path}`, options, (res) => {
      let out = "";
      res.on("data", (c) => (out += c));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, json: JSON.parse(out) });
        } catch {
          resolve({ status: res.statusCode, json: {} });
        }
      });
    });
    r.on("error", reject);
    if (data) r.write(data);
    r.end();
  });
}

describe("Auth API", () => {
  it("GET /api/users should return 401 without token", async () => {
    const res = await req("GET", "/api/users");
    assert.strictEqual(res.status, 401);
  });

  it("should register a new user", async () => {
    const res = await req("POST", "/api/auth/register", {
      firstName: "Test", lastName: "User", email: `test${Date.now()}@test.com`, password: "123456",
    });
    assert.strictEqual(res.status, 201);
    assert.strictEqual(res.json.success, true);
    assert.ok(res.json.token);
  });

  it("should reject empty register fields", async () => {
    const res = await req("POST", "/api/auth/register", { firstName: "" });
    assert.strictEqual(res.status, 400);
  });

  it("should reject wrong login", async () => {
    const res = await req("POST", "/api/auth/login", { email: "nobody@test.com", password: "wrong" });
    assert.strictEqual(res.status, 401);
  });
});