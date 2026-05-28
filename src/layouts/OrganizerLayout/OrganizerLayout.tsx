import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  CalendarPlus,
  User,
  LogOut,
} from "lucide-react";

import "./OrganizerLayout.css";

type OrganizerLayoutProps = {
  children: React.ReactNode;
};

const OrganizerLayout = ({ children }: OrganizerLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="organizer-layout">
      <aside className="organizer-sidebar">
        <div>
          <div className="organizer-sidebar-logo">
            <div className="organizer-logo-icon">
              <img
                src="/src/assets/logo.png"
                alt="Evently logo"
                className="logo-img"
              />
            </div>
            <h2>Evently</h2>
          </div>

          <div className="organizer-sidebar-user">
            <h4>{user?.companyName || "Organizer"}</h4>
            <span>Organizer</span>
          </div>

          <nav className="organizer-menu">
            <Link
              to="/organizer/dashboard"
              className={
                location.pathname === "/organizer/dashboard"
                  ? "organizer-menu-item active"
                  : "organizer-menu-item"
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>

            <Link
              to="/organizer/my-events"
              className={
                location.pathname === "/organizer/my-events"
                  ? "organizer-menu-item active"
                  : "organizer-menu-item"
              }
            >
              <CalendarDays size={20} />
              My Events
            </Link>

            <Link
              to="/organizer/create-event"
              className={
                location.pathname === "/organizer/create-event"
                  ? "organizer-menu-item active"
                  : "organizer-menu-item"
              }
            >
              <CalendarPlus size={20} />
              Create Event
            </Link>

            <div className="organizer-menu-title">Account</div>

            <Link to="/organizer/profile" className="organizer-menu-item">
              <User size={20} />
              Profile
            </Link>
          </nav>
        </div>

        <button className="organizer-logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main className="organizer-dashboard-content">{children}</main>
    </div>
  );
};

export default OrganizerLayout;
