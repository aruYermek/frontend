import { useState } from "react";
import OrganizerLayout from "../../layouts/OrganizerLayout/OrganizerLayout";
import { updateProfile } from "../../services/profileService";
import "./OrganizerProfile.css";

const OrganizerProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    companyName: storedUser?.companyName || "",
    bin: storedUser?.bin || "",
    contactPerson: storedUser?.contactPerson || "",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await updateProfile({
        companyName: formData.companyName,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
      });

      localStorage.setItem("user", JSON.stringify(response.user));
      setMessage("Profile updated successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <OrganizerLayout>
      <div className="organizer-profile-header">
        <h1>Organization Profile</h1>
        <p>Update your organization account information.</p>
      </div>

      <form className="organizer-profile-card" onSubmit={handleSubmit}>
        <div className="organizer-profile-avatar">
          {formData.companyName?.[0] || "O"}
        </div>

        <div className="organizer-profile-info">
          <div>
            <span>Company Name</span>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div>
            <span>BIN</span>
            <input
              type="text"
              name="bin"
              value={formData.bin}
              disabled
              className="readonly-input"
            />
          </div>

          <div>
            <span>Contact Person</span>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
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

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <button className="save-profile-btn" type="submit">
          Save Changes
        </button>
      </form>
    </OrganizerLayout>
  );
};

export default OrganizerProfile;