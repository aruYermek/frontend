import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-badge">
            1200+ events hosted
          </span>

          <h1>
            Discover,
            <br />
            Book &
            <span> Amazing Events</span>
          </h1>

          <p>
            Explore concerts, workshops, business forums,
            networking meetups and unforgettable experiences.
          </p>

          <div className="hero-buttons">
            <Link to='/register'>
            <button className="primary-btn">
              Explore Events
            </button>
            </Link>
            <Link to='/register'>
            <button className="secondary-btn">
              Become Organizer
            </button>
            </Link>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
            alt="event"
            className="hero-image"
          />

          <div className="floating-card left-card">
            <h3>25K+</h3>
            <p>Happy Attendees</p>
          </div>

          <div className="floating-card right-card">
            <h3>4.9★</h3>
            <p>Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;