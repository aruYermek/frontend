import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMyBookings = async () => {
  const response = await axios.get(
    `${API_URL}/bookings/my-bookings`,
    getAuthHeader()
  );

  return response.data;
};

export const cancelBooking = async (bookingId: string) => {
  const response = await axios.delete(
    `${API_URL}/bookings/${bookingId}`,
    getAuthHeader()
  );

  return response.data;
};

export const bookEvent = async (eventId: string) => {
  const response = await axios.post(
    `${API_URL}/bookings`,
    { eventId },
    getAuthHeader()
  );

  return response.data;
};

export const getEventParticipants = async (eventId: string) => {
  const response = await axios.get(
    `${API_URL}/bookings/event/${eventId}/participants`,
    getAuthHeader()
  );

  return response.data;
};