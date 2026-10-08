import { useState } from "react";
import { api } from "../api.js";

const empty = { firstName: "", lastName: "", email: "", password: "", phone: "", gender: "Male", dob: "", city: "" };

export default function Register({ onAuth, goLogin }) {
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const data = await api("/auth/register", { method: "POST", body: form });
      setMessage({ type: "success", text: data.message });
      onAuth(data);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const input = (label, name, type = "text", opts = {}) => (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        className={type === "date" ? "date-input" : ""}
        {...opts}
      />
    </div>
  );

  return (
    <div className="container auth-card">
      <div className="card-head">
        <div className="card-icon">🚀</div>
        <h1>Create Account</h1>
        <p className="subtitle">Register with your details below</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {input("First Name *", "firstName", "text", { required: true, placeholder: "Ali" })}
          {input("Last Name *", "lastName", "text", { required: true, placeholder: "Khan" })}
        </div>
        {input("Email Address *", "email", "email", { required: true, placeholder: "you@example.com" })}
        {input("Phone", "phone", "tel", { placeholder: "+92 300 1234567" })}

        <div className="form-group">
          <label>Password *</label>
          <div className="pw-wrap">
            <input
              type={showPw ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="Min 6 characters"
            />
            <button type="button" className="pw-toggle" onClick={() => setShowPw((s) => !s)}>
              {showPw ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g}>
                <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={handleChange} />
                {g}
              </label>
            ))}
          </div>
        </div>

        <div className="row">
          {input("Date of Birth", "dob", "date")}
          <div className="form-group">
            <label>City</label>
            <select name="city" value={form.city} onChange={handleChange}>
              <option value="">Select City</option>
              {["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Peshawar", "Quetta", "Multan"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Registering..." : "Register Now"}
        </button>
      </form>

      {message && <div className={`message ${message.type}`}>{message.text}</div>}

      <p className="switch">
        Already have an account? <a onClick={goLogin}>Login</a>
      </p>
      <p className="foot-note">🔒 Your data is safe and never shared with anyone.</p>
    </div>
  );
}
