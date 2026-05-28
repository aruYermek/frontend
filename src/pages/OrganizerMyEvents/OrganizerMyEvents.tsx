import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2, Users } from "lucide-react";
import OrganizerLayout from "../../layouts/OrganizerLayout/OrganizerLayout";
import { deleteEvent, getMyEvents } from "../../services/eventService";
import "./OrganizerMyEvents.css";

type EventType = {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  startDate: string;
  location: string;
  capacity: number;
  availableSeats: number;
};

const OrganizerMyEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    const data = await getMyEvents();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Delete this event?");

    if (!confirmDelete) return;

    await deleteEvent(id);
    fetchEvents();
  };

  return (
    <OrganizerLayout>
      <div className="my-events-header">
        <h1>My Events</h1>
        <p>Manage events created by your organization.</p>
      </div>

      <div className="my-events-list">
        {events.map((event) => (
          <div className="organizer-event-card" key={event._id}>
            <img
              src={
                event.image?.startsWith("http")
                  ? event.image
                  : `http://localhost:5000${event.image}`
              }
              alt={event.title}
            />

            <div className="organizer-event-info">
              <span>{event.category}</span>
              <h3>{event.title}</h3>
              <p>{event.subtitle}</p>
              <small>
                {event.location} •{" "}
                {new Date(event.startDate).toLocaleDateString()}
              </small>
            </div>

            <div className="organizer-event-stats">
              <strong>
                {event.capacity - event.availableSeats}/{event.capacity}
              </strong>
              <p>booked</p>
            </div>

            <div className="organizer-event-actions">
              <button
                className="edit-btn"
                onClick={() => navigate(`/organizer/events/${event._id}/edit`)}
              >
                <Edit size={17} />
              </button>

              <button
                className="participants-btn"
                onClick={() =>
                  navigate(`/organizer/events/${event._id}/participants`)
                }
              >
                <Users size={17} />
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(event._id)}
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </OrganizerLayout>
  );
};

export default OrganizerMyEvents;
