import { BarChart3, CalendarPlus, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ForOrganizers.css";

const ForOrganizers = () => {
  const navigate = useNavigate();

  return (
    <section id="organizers" className="organizers-section">
      <div className="container organizers-container">
        <div className="organizers-content">
          <span className="section-badge">For Organizers</span>

          <h2>Create, manage and grow your events</h2>

          <p>
            Evently helps companies and organizers publish events, manage
            participants and track available seats in one simple dashboard.
          </p>

          <div className="organizer-features">
            <div>
              <CalendarPlus size={26} />
              <span>Create events easily</span>
            </div>

            <div>
              <UsersRound size={26} />
              <span>View participant lists</span>
            </div>

            <div>
              <BarChart3 size={26} />
              <span>Manage bookings and seats</span>
            </div>
          </div>

          <button
            className="organizer-btn"
            onClick={() => navigate("/register")}
          >
            Become an Organizer
          </button>
        </div>

        <div className="organizers-card">
          <div className="mini-dashboard">
            <div className="mini-header">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="mini-stat">
              <p>Total Events</p>
              <h3>24</h3>
            </div>

            <div className="mini-list">
              <div>
                <strong>Startup Meetup</strong>
                <span>120 participants</span>
              </div>
              <div>
                <strong>Music Night</strong>
                <span>87 participants</span>
              </div>
              <div>
                <strong>Tech Conference</strong>
                <span>210 participants</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForOrganizers;