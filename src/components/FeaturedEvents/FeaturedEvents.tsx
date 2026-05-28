import { useEffect, useState } from "react";
import EventCard from "../EventCard/EventCard";
import { getAllEvents } from "../../services/eventService";
import "./FeaturedEvents.css";
import { useNavigate } from "react-router-dom";

type EventType = {
  _id: string;
  image: string;
  category: string;
  title: string;
  subtitle: string;
  startDate: string;
  location: string;
  price: number;
  isFree: boolean;
  availableSeats: number;
};

const FeaturedEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getAllEvents();
      setEvents(data.slice(0, 3));
    };

    fetchEvents();
  }, []);

  return (
    <section id="events" className="featured-section">
      <div className="container">
        <div className="featured-header">
          <span className="section-badge">Featured Events</span>
          <h2>Explore Trending Events</h2>
          <p>Discover popular events happening near you.</p>
        </div>

        <div className="featured-grid">
          {events.map((event) => (
            <EventCard key={event._id} {...event} />
          ))}
        </div>
        <div className="featured-btn-wrapper">
          <button className="view-all-btn" onClick={() => navigate("/login")}>
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
