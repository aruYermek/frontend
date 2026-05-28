import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout/UserLayout";
import EventCard from "../../components/EventCard/EventCard";
import { getAllEvents } from "../../services/eventService";
import { bookEvent } from "../../services/bookingService";
import "./UserEvents.css";
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

const UserEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleBook = async (eventId: string) => {
    try {
      await bookEvent(eventId);

      await fetchEvents();

      alert("Event booked successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to book event");
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    eventDate.setHours(0, 0, 0, 0);

    const isUpcoming = eventDate >= today;

    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      event.category.toLowerCase() === category.toLowerCase();

    return isUpcoming && matchesSearch && matchesCategory;
  });

  return (
    <UserLayout>
      <div className="user-events-header">
        <h1>Browse Events</h1>
        <p>Find exciting events and reserve your seat.</p>
      </div>

      <div className="events-filters">
        <input
          type="text"
          placeholder="Search event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="music">Music</option>
          <option value="business">Business</option>
          <option value="tech">Tech</option>
          <option value="education">Education</option>
          <option value="sports">Sports</option>
          <option value="wellness">Wellness</option>
        </select>
      </div>

      {loading ? (
        <p style={{ marginTop: "30px" }}>Loading events...</p>
      ) : (
        <div className="user-events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                {...event}
                onBook={() => handleBook(event._id)}
                onView={() => navigate(`/user/events/${event._id}`)}
              />
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      )}
    </UserLayout>
  );
};

export default UserEvents;
