import { useState, useEffect, useMemo } from "react";
import { api } from "../api.js";

const AVATARS = [
  "linear-gradient(135deg,#ff8a00,#ffd200)",
  "linear-gradient(135deg,#4a90ff,#00d4ff)",
  "linear-gradient(135deg,#a078ff,#ff69b4)",
  "linear-gradient(135deg,#2fd58a,#00b8d4)",
  "linear-gradient(135deg,#ff5f6d,#ff9a44)",
  "linear-gradient(135deg,#7c5cff,#4ac3ff)",
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api("/users")
      .then((data) => setUsers(data.users))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.firstName, u.lastName, u.email, u.city, u.gender].filter(Boolean).join(" ").toLowerCase().includes(q)
    );
  }, [users, query]);

  return (
    <div className="container wide">
      <div className="head-row">
        <div>
          <h1>Registered Users</h1>
          <p className="subtitle">All users in the database</p>
        </div>
        <span className="count-pill">{users.length} total</span>
      </div>

      {loading && (
        <div className="skeleton" aria-label="Loading users">
          {[...Array(5)].map((_, i) => (
            <div className="skeleton-row" key={i} />
          ))}
        </div>
      )}

      {error && <div className="message error">{error}</div>}

      {!loading && !error && users.length === 0 && (
        <div className="empty">
          <span className="empty-icon">🫙</span>
          <h3>No users yet</h3>
          <p>Registered users will show up here once they sign up.</p>
        </div>
      )}

      {!loading && !error && users.length > 0 && (
        <>
          <div className="toolbar">
            <div className="search">
              <span>🔎</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, email, city..."
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty">
              <span className="empty-icon">🔍</span>
              <h3>No matches found</h3>
              <p>Try a different name, email or city.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>City</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => {
                    const initials = `${u.firstName?.[0] || ""}${u.lastName?.[0] || ""}` || "?";
                    const gender = (u.gender || "").toLowerCase();
                    return (
                      <tr key={u._id}>
                        <td className="row-index">{i + 1}</td>
                        <td>
                          <span className="cell-user">
                            <span className="avatar md" style={{ background: AVATARS[i % AVATARS.length] }}>
                              {initials}
                            </span>
                            {u.firstName} {u.lastName}
                          </span>
                        </td>
                        <td className="cell-email">{u.email}</td>
                        <td>
                          <span className={`tag ${gender || "other"}`}>{u.gender || "—"}</span>
                        </td>
                        <td>
                          <span className="city-cell">{u.city ? `📍 ${u.city}` : "—"}</span>
                        </td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
