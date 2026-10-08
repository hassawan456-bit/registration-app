import { useState } from "react";
import { api } from "../api.js";

export default function Login({ onAuth, goRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const data = await api("/auth/login", { method: "POST", body: form });
      setMessage({ type: "success", text: data.message });
      onAuth(data);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container auth-card">
      <div className="card-head">
        <div className="card-icon">👋</div>
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to your account</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="pw-wrap">
            <input
              type={showPw ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Your password"
            />
            <button type="button" className="pw-toggle" onClick={() => setShowPw((s) => !s)}>
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {message && <div className={`message ${message.type}`}>{message.text}</div>}

      <p className="switch">
        Don't have an account? <a onClick={goRegister}>Register</a>
      </p>
      <p className="foot-note">🔒 Session secured with JWT authentication.</p>
    </div>
  );
}
