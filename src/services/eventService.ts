import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAllEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const getEventById = async (id: string) => {
  const response = await axios.get(`${API_URL}/events/${id}`);
  return response.data;
};

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMyEvents = async () => {
  const response = await axios.get(
    `${API_URL}/events/my-events`,
    getAuthHeader()
  );

  return response.data;
};

export const deleteEvent = async (id: string) => {
  const response = await axios.delete(
    `${API_URL}/events/${id}`,
    getAuthHeader()
  );

  return response.data;
};

export const createEvent = async (data: FormData) => {
  const response = await axios.post(
    `${API_URL}/events`,
    data,
    {
      ...getAuthHeader(),
      headers: {
        ...getAuthHeader().headers,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateEvent = async (id: string, data: FormData) => {
  const response = await axios.put(
    `${API_URL}/events/${id}`,
    data,
    {
      ...getAuthHeader(),
      headers: {
        ...getAuthHeader().headers,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};