import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, MapPin, Users, Tag } from "lucide-react";

import UserLayout from "../../layouts/UserLayout/UserLayout";
import { getEventById } from "../../services/eventService";
import { bookEvent } from "../../services/bookingService";

import "./UserEventDetails.css";

type EventType = {
  _id: string;
  image: string;
  category: string;
  title: string;
  subtitle: string;
  fullDescription: string;
  startDate: string;
  startTime?: string;
  endTime?: string;
  location: string;
  price: number;
  isFree: boolean;
  capacity: number;
  availableSeats: number;
};

const UserEventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventType | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      const data = await getEventById(id);
      setEvent(data);
    };

    fetchEvent();
  }, [id]);

  const handleBook = async () => {
    if (!id) return;

    try {
      await bookEvent(id);
      alert("Event booked successfully!");
      navigate("/user/bookings");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to book event");
    }
  };

  if (!event) {
    return (
      <UserLayout>
        <p>Loading event...</p>
      </UserLayout>
    );
  }

  const imageUrl = event.image?.startsWith("http")
  ? event.image
  : `http://localhost:5000${event.image}`;

  return (
    <UserLayout>
      <div className="event-details-page">
        <div className="details-hero">
          <img src={imageUrl} alt={event.title} />

          <div className="details-overlay">
            <span>{event.category}</span>
            <h1>{event.title}</h1>
            <p>{event.subtitle}</p>
          </div>
        </div>

        <div className="details-content">
          <div className="details-main">
            <h2>About this event</h2>
            <p>{event.fullDescription}</p>
          </div>

          <aside className="details-sidebar">
            <h3>Event Details</h3>

            <div className="detail-item">
              <Calendar size={20} />
              <span>
                {new Date(event.startDate).toLocaleDateString()}
                {event.startTime && ` • ${event.startTime}`}
                {event.endTime && ` - ${event.endTime}`}
              </span>
            </div>

            <div className="detail-item">
              <MapPin size={20} />
              <span>{event.location}</span>
            </div>

            <div className="detail-item">
              <Users size={20} />
              <span>
                {event.availableSeats} seats available / {event.capacity}
              </span>
            </div>

            <div className="detail-item">
              <Tag size={20} />
              <span>{event.isFree ? "Free" : `${event.price.toLocaleString()} ₸`}</span>
            </div>

            <button className="details-book-btn" onClick={handleBook}>
              Book Now
            </button>
          </aside>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserEventDetails;