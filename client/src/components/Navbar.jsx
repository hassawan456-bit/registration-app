export default function Navbar({ user, view, setView, onLogout }) {
  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}` || user.firstName?.[0] || "?"
    : "";

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setView("register")}>
        <span className="brand-badge">📝</span>
        <span>Registration App</span>
      </div>
      <div className="nav-links">
        <button className={view === "register" ? "nav-btn active" : "nav-btn"} onClick={() => setView("register")}>
          Register
        </button>
        {!user && (
          <button className={view === "login" ? "nav-btn active" : "nav-btn"} onClick={() => setView("login")}>
            Login
          </button>
        )}
        <button className={view === "users" ? "nav-btn active" : "nav-btn"} onClick={() => setView("users")}>
          Users
        </button>
        {user && (
          <>
            <span className="nav-user" title={`${user.firstName} ${user.lastName}`}>
              <span className="avatar sm">{initials}</span>
              {user.firstName} {user.lastName}
            </span>
            <button className="nav-btn logout" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
