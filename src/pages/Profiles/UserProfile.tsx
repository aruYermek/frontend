import { useState } from "react";
import UserLayout from "../../layouts/UserLayout/UserLayout";
import { updateProfile } from "../../services/profileService";
import "./UserProfile.css";

const UserProfile = () => {
  const storedUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: storedUser?.firstName || "",
    lastName: storedUser?.lastName || "",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError("");
    setMessage("");

    try {
      const response =
        await updateProfile(formData);

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      setMessage(
        "Profile updated successfully"
      );
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to update profile"
      );
    }
  };

  return (
    <UserLayout>
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>
          Update your personal information.
        </p>
      </div>

      <form
        className="profile-card"
        onSubmit={handleSubmit}
      >
        <div className="profile-avatar">
          {formData.firstName?.[0] || "U"}
        </div>

        <div className="profile-info">
          <div>
            <span>First Name</span>

            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div>
            <span>Last Name</span>

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div>
            <span>Email</span>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <span>Phone</span>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button
          className="save-profile-btn"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </UserLayout>
  );
};

export default UserProfile;