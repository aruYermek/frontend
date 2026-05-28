import { Mail, MapPin, Phone } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo" onClick={() => scrollToSection("home")}>
              <div className="footer-icon">E</div>
              <div>
                <h3>Evently</h3>
                <p>Book your moment</p>
              </div>
            </div>

            <p className="footer-description">
              Discover, book and manage events with one simple and modern platform.
            </p>
          </div>

          <div className="footer-links">
            <h4>Navigation</h4>
            <ul>
              <li onClick={() => scrollToSection("home")}>Home</li>
              <li onClick={() => scrollToSection("about")}>About</li>
              <li onClick={() => scrollToSection("events")}>Events</li>
              <li onClick={() => scrollToSection("organizers")}>For Organizers</li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>

            <div className="contact-item">
              <Mail size={18} />
              <span>info@evently.kz</span>
            </div>

            <div className="contact-item">
              <Phone size={18} />
              <span>+7 (708) 405 39 07</span>
            </div>

            <div className="contact-item">
              <MapPin size={18} />
              <span>Astana, Kazakhstan</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Evently. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;