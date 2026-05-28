import { useEffect, useState } from "react";
import { CalendarDays, Users, Ticket } from "lucide-react";
import OrganizerLayout from "../../layouts/OrganizerLayout/OrganizerLayout";
import { getMyEvents } from "../../services/eventService";
import "./OrganizerDashboard.css";

type EventType = {
  _id: string;
  title: string;
  category: string;
  startDate: string;
  location: string;
  capacity: number;
  availableSeats: number;
};

const OrganizerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getMyEvents();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  const totalCapacity = events.reduce((sum, event) => sum + event.capacity, 0);
  const totalAvailableSeats = events.reduce(
    (sum, event) => sum + event.availableSeats,
    0
  );

  const bookedSeats = totalCapacity - totalAvailableSeats;

  return (
    <OrganizerLayout>
      <div className="organizer-dashboard-header">
        <h1>Welcome, {user?.companyName || "Organizer"} 👋</h1>
        <p>Manage your events and track bookings in one place.</p>
      </div>

      <div className="organizer-stats">
        <div className="organizer-stat-card">
          <div className="organizer-stat-icon purple">
            <CalendarDays size={28} />
          </div>
          <div>
            <h3>{events.length}</h3>
            <p>My Events</p>
          </div>
        </div>

        <div className="organizer-stat-card">
          <div className="organizer-stat-icon pink">
            <Users size={28} />
          </div>
          <div>
            <h3>{bookedSeats}</h3>
            <p>Total Bookings</p>
          </div>
        </div>

        <div className="organizer-stat-card">
          <div className="organizer-stat-icon blue">
            <Ticket size={28} />
          </div>
          <div>
            <h3>{totalAvailableSeats}</h3>
            <p>Available Seats</p>
          </div>
        </div>
      </div>

      <div className="organizer-section">
        <h2>Recent Events</h2>

        <div className="organizer-events-list">
          {events.slice(0, 4).map((event) => (
            <div className="organizer-event-row" key={event._id}>
              <div>
                <span>{event.category}</span>
                <h3>{event.title}</h3>
                <p>
                  {event.location} •{" "}
                  {new Date(event.startDate).toLocaleDateString()}
                </p>
              </div>

              <strong>
                {event.capacity - event.availableSeats}/{event.capacity} booked
              </strong>
            </div>
          ))}
        </div>
      </div>
    </OrganizerLayout>
  );
};

export default OrganizerDashboard;