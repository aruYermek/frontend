import { Calendar, MapPin, Users } from "lucide-react";
import "./EventCard.css";

type EventCardProps = {
  image: string;
  category: string;
  title: string;
  subtitle: string;
  startDate: string;
  location: string;
  price: number;
  isFree: boolean;
  availableSeats: number;
  onBook?: () => void;
  onView?: () => void;
};

const EventCard = ({
  image,
  category,
  title,
  subtitle,
  startDate,
  location,
  price,
  isFree,
  availableSeats,
  onBook,
  onView,
}: EventCardProps) => {
  const formattedDate = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const imageUrl = image?.startsWith("http")
  ? image
  : `http://localhost:5000${image}`;

  return (
    <div className="event-card">
      <div className="event-image-wrapper">
        <img src={imageUrl} alt={title} className="event-image" />
        <span className="event-category">{category}</span>
      </div>

      <div className="event-content">
        <h3>{title}</h3>
        <p className="event-subtitle">{subtitle}</p>

        <div className="event-info">
          <span>
            <Calendar size={17} />
            {formattedDate}
          </span>

          <span>
            <MapPin size={17} />
            {location}
          </span>

          <span>
            <Users size={17} />
            {availableSeats} seats
          </span>
        </div>

        <div className="event-footer">
          <strong>{isFree ? "Free" : `${price} ₸`}</strong>

          <div className="event-actions">
            <button className="details-btn" onClick={onView}>
              View Details
            </button>

            <button className="book-btn" onClick={onBook}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;