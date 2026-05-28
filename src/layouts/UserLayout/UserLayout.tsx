import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Ticket,
  User,
  LogOut,
} from "lucide-react";

import "./UserLayout.css";

type UserLayoutProps = {
  children: React.ReactNode;
};

const UserLayout = ({ children }: UserLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="user-layout">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <div className="logo-icon">
              E
            </div>

            <h2>Evently</h2>
          </div>

          <div className="sidebar-user">
            <h4>
              {user?.firstName || "User"}
            </h4>
            

            <span>Participant</span>
          </div>

          <nav className="sidebar-menu">
            <Link
              to="/user/dashboard"
              className={
                location.pathname === "/user/dashboard"
                  ? "menu-item active"
                  : "menu-item"
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              to="/user/events"
              className="menu-item"
            >
              <CalendarDays size={20} />
              Browse Events
            </Link>

            <Link
              to="/user/bookings"
              className="menu-item"
            >
              <Ticket size={20} />
              My Bookings
            </Link>

            <div className="menu-title">
              Account
            </div>

            <Link
              to="/user/profile"
              className="menu-item"
            >
              <User size={20} />
              Profile
            </Link>
          </nav>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
};

export default UserLayout;