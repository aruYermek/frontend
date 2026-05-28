import "./About.css";

import {
  Ticket,
  Building2,
  ChartNoAxesCombined,
} from "lucide-react";

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container about-container">
        <div className="about-header">
          <span className="section-badge">
            About Evently
          </span>

          <h2>
            One platform for discovering
            and managing events
          </h2>

          <p>
            Evently connects participants with organizers
            and helps people find, book and manage events
            in a simple and modern way.
          </p>
        </div>

        <div className="about-cards">
          <div className="about-card">
            <div className="about-icon">
              <Ticket size={30} strokeWidth={2.2} />
            </div>

            <h3>Easy Booking</h3>

            <p>
              Discover exciting events, explore detailed information and reserve your seat in just a few clicks with a simple and user-friendly booking process.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">
              <Building2 size={30} strokeWidth={2.2} />
            </div>

            <h3>For Organizers</h3>

            <p>
                Organizers can publish events, edit details, track registrations and manage participants through one centralized dashboard.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">
              <ChartNoAxesCombined
                size={30}
                strokeWidth={2.2}
              />
            </div>

            <h3>Smart Management</h3>

            <p>
              The system automatically tracks available seats, prevents duplicate bookings and keeps all event information organized and accessible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;