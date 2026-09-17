import { useState, useEffect } from "react";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Users from "./components/Users.jsx";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  const [view, setView] = useState("register");
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("regapp_user") || "null"));

  useEffect(() => {
    if (user) localStorage.setItem("regapp_user", JSON.stringify(user));
    else localStorage.removeItem("regapp_user");
  }, [user]);

  const handleAuth = (result) => {
    localStorage.setItem("regapp_token", result.token);
    setUser(result.user);
    setView("users");
  };

  const handleLogout = () => {
    localStorage.removeItem("regapp_token");
    setUser(null);
    setView("register");
  };

  return (
    <div className="app">
      <Navbar user={user} view={view} setView={setView} onLogout={handleLogout} />

      {view === "register" && (
        <Register onAuth={handleAuth} goLogin={() => setView("login")} />
      )}
      {view === "login" && (
        <Login onAuth={handleAuth} goRegister={() => setView("register")} />
      )}
      {view === "users" && <Users />}
    </div>
  );
}