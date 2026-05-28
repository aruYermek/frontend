import { useEffect, useState } from "react";
import { CalendarDays, Ticket, Clock3 } from "lucide-react";
import UserLayout from "../../layouts/UserLayout/UserLayout";
import { getAllEvents } from "../../services/eventService";
import { getMyBookings } from "../../services/bookingService";
import "./UserDashboard.css";

type EventType = {
  _id: string;
  image: string;
  category: string;
  title: string;
  subtitle: string;
  startDate: string;
  location: string;
};

type BookingType = {
  _id: string;
  event: EventType;
};

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [events, setEvents] = useState<EventType[]>([]);
  const [bookings, setBookings] = useState<BookingType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await getAllEvents();
      const bookingsData = await getMyBookings();

      setEvents(eventsData);
      setBookings(bookingsData);
    };

    fetchData();
  }, []);

  const validBookings = bookings.filter((booking) => booking.event);

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const upcomingEvents = validBookings.filter((booking) => {
    const eventDate = new Date(booking.event.startDate);

    return eventDate >= today;
  });
  return (
    <UserLayout>
      <div className="dashboard-header">
        <div>
          <h1>
            Welcome back, {user?.firstName || user?.contactPerson || "User"}
          </h1>
          <p>Discover new events and manage your bookings easily.</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon purple">
            <CalendarDays size={28} />
          </div>
          <div>
            <h3>{events.length}</h3>
            <p>Available Events</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pink">
            <Ticket size={28} />
          </div>
          <div>
            <h3>{bookings.length}</h3>
            <p>My Bookings</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blue">
            <Clock3 size={28} />
          </div>
          <div>
            <h3>{upcomingEvents.length}</h3>
            <p>Upcoming Events</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-title">
          <h2>Recommended Events</h2>
          <button>View All</button>
        </div>

        <div className="recommended-grid">
          {events.slice(0, 2).map((event) => (
            <div className="event-preview-card" key={event._id}>
              <img
                src={
                  event.image?.startsWith("http")
                    ? event.image
                    : `http://localhost:5000${event.image}`
                }
                alt={event.title}
              />

              <div className="event-preview-content">
                <span>{event.category}</span>
                <h3>{event.title}</h3>
                <p>
                  {event.location} •{" "}
                  {new Date(event.startDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
