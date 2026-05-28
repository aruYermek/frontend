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

export const updateProfile = async (data: any) => {
  const response = await axios.put(
    `${API_URL}/profile`,
    data,
    getAuthHeader()
  );

  return response.data;
};