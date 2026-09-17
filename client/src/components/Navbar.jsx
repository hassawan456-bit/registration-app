export default function Navbar({ user, view, setView, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => setView("register")}>
        <span className="brand-icon">📝</span> Registration App
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
            <span className="nav-user">
              👋 {user.firstName} {user.lastName}
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