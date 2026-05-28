import { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout/UserLayout";
import { getMyBookings, cancelBooking } from "../../services/bookingService";
import "./MyBookings.css";

type BookingType = {
  _id: string;
  event: {
    title: string;
    image: string;
    category: string;
    startDate: string;
    location: string;
    price: number;
    isFree: boolean;
  };
};

const MyBookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);

  const fetchBookings = async () => {
    const data = await getMyBookings();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId: string) => {
    await cancelBooking(bookingId);
    fetchBookings();
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validBookings = bookings.filter((booking) => booking.event);

  const sortedBookings = [...validBookings].sort((a, b) => {
    const aDate = new Date(a.event.startDate);

    const bDate = new Date(b.event.startDate);

    const aPast = aDate < today;
    const bPast = bDate < today;

    if (aPast !== bPast) {
      return aPast ? 1 : -1;
    }

    return aDate.getTime() - bDate.getTime();
  });

  

  return (
    <UserLayout>
      <div className="bookings-header">
        <h1>My Bookings</h1>
        <p>View and manage events you have booked.</p>
      </div>

      <div className="bookings-list">
        {sortedBookings.map((booking) => {
          const isPast = new Date(booking.event.startDate) < today;

          const imageUrl = booking.event.image?.startsWith("http")
            ? booking.event.image
            : `http://localhost:5000${booking.event.image}`;

          return (
            <div
              className={`booking-card ${isPast ? "past-booking" : ""}`}
              key={booking._id}
            >
              <img src={imageUrl} alt={booking.event.title} />

              <div className="booking-info">
                <span>{booking.event.category}</span>

                <h3>{booking.event.title}</h3>

                <p>
                  {booking.event.location} •{" "}
                  {new Date(booking.event.startDate).toLocaleDateString()}
                </p>

                <strong>
                  {booking.event.isFree ? "Free" : `${booking.event.price} ₸`}
                </strong>
              </div>

              {!isPast && (
                <button onClick={() => handleCancel(booking._id)}>
                  Cancel Booking
                </button>
              )}
            </div>
          );
        })}
      </div>
    </UserLayout>
  );
};

export default MyBookings;
