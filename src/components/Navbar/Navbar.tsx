import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const sections = ["home", "about", "events", "organizers", "contact"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;

      if (isBottom) {
        setActiveSection("contact");
        return;
      }

      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);

        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="navbar-wrapper">
      <div className="container">
        <nav className="navbar-custom">
          <div className="navbar-logo" onClick={() => scrollToSection("home")}>
            <div className="logo-icon">E</div>

            <div>
              <h4>Evently</h4>
              <span>Book your moment</span>
            </div>
          </div>

          <ul className="navbar-menu">
            <li
              className={activeSection === "home" ? "active" : ""}
              onClick={() => scrollToSection("home")}
            >
              Home
            </li>

            <li
              className={activeSection === "about" ? "active" : ""}
              onClick={() => scrollToSection("about")}
            >
              About
            </li>

            <li
              className={activeSection === "events" ? "active" : ""}
              onClick={() => scrollToSection("events")}
            >
              Events
            </li>

            <li
              className={activeSection === "organizers" ? "active" : ""}
              onClick={() => scrollToSection("organizers")}
            >
              For Organizers
            </li>

            <li
              className={activeSection === "contact" ? "active" : ""}
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </li>
          </ul>

          <div className="navbar-actions">
  {user ? (
    <>
      <button
        className="btn-login"
        onClick={() =>
          navigate(
            user.role === "participant"
              ? "/user/dashboard"
              : "/organizer/dashboard"
          )
        }
      >
        Dashboard
      </button>

      <button className="btn-register" onClick={handleLogout}>
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login" className="btn-login">
        Login
      </Link>

      <Link to="/register" className="btn-register">
        Register
      </Link>
    </>
  )}
</div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
