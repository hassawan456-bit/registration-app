import { useState } from "react";
import { api } from "../api.js";

const empty = { firstName: "", lastName: "", email: "", password: "", phone: "", gender: "Male", dob: "", city: "" };

export default function Register({ onAuth, goLogin }) {
  const [form, setForm] = useState(empty);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <input type={type} name={name} value={form[name]} onChange={handleChange} {...opts} />
    </div>
  );

  return (
    <div className="container auth-card">
      <h1>Create Account</h1>
      <p className="subtitle">Register with your details below</p>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {input("First Name *", "firstName", "text", { required: true })}
          {input("Last Name *", "lastName", "text", { required: true })}
        </div>
        {input("Email Address *", "email", "email", { required: true, placeholder: "you@example.com" })}
        {input("Phone", "phone", "tel", { placeholder: "+92 300 1234567" })}
        {input("Password *", "password", "password", { required: true, minLength: 6, placeholder: "Min 6 characters" })}

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
    </div>
  );
}