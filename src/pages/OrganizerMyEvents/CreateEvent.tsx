import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrganizerLayout from "../../layouts/OrganizerLayout/OrganizerLayout";
import { createEvent } from "../../services/eventService";
import "./CreateEvent.css";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    category: "business",
    title: "",
    subtitle: "",
    shortDescription: "",
    fullDescription: "",
    startDate: "",
    startTime: "",
    endTime: "",
    location: "",
    price: "",
    isFree: false,
    capacity: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.title ||
      !formData.subtitle ||
      !formData.shortDescription ||
      !formData.fullDescription ||
      !formData.startDate ||
      !formData.location ||
      !formData.capacity
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const eventData = new FormData();

      eventData.append("category", formData.category);

      eventData.append("title", formData.title);

      eventData.append("subtitle", formData.subtitle);

      eventData.append("shortDescription", formData.shortDescription);

      eventData.append("fullDescription", formData.fullDescription);

      eventData.append("startDate", formData.startDate);

      eventData.append("startTime", formData.startTime);

      eventData.append("endTime", formData.endTime);

      eventData.append("location", formData.location);

      eventData.append("isFree", String(formData.isFree));

      eventData.append("price", formData.isFree ? "0" : formData.price);

      eventData.append("capacity", formData.capacity);

      if (imageFile) {
        eventData.append("image", imageFile);
      }

      await createEvent(eventData);

      navigate("/organizer/my-events");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <OrganizerLayout>
      <div className="create-event-header">
        <h1>Create Event</h1>
        <p>Add a new event for participants to discover and book.</p>
      </div>

      <form className="create-event-form" onSubmit={handleSubmit}>
        {error && <div className="create-error">{error}</div>}

        <div className="form-grid">
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="music">Music</option>
              <option value="business">Business</option>
              <option value="tech">Tech</option>
              <option value="education">Education</option>
              <option value="sports">Sports</option>
              <option value="wellness">Wellness</option>
            </select>
          </div>

          <div className="form-group">
            <label>Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Startup Meetup"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Subtitle</label>
          <input
            name="subtitle"
            type="text"
            placeholder="Networking event for founders and investors"
            value={formData.subtitle}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Short Description</label>
          <input
            name="shortDescription"
            type="text"
            placeholder="Short text for event card"
            value={formData.shortDescription}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Full Description</label>
          <textarea
            name="fullDescription"
            rows={5}
            placeholder="Full event description..."
            value={formData.fullDescription}
            onChange={handleChange}
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Start Date</label>
            <input
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <input
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>End Time</label>
            <input
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            name="location"
            type="text"
            placeholder="Astana Hub"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Capacity</label>
            <input
              name="capacity"
              type="number"
              placeholder="50"
              value={formData.capacity}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              name="price"
              type="number"
              placeholder="5000"
              value={formData.price}
              onChange={handleChange}
              disabled={formData.isFree}
            />
          </div>
        </div>

        <label className="free-checkbox">
          <input
            name="isFree"
            type="checkbox"
            checked={formData.isFree}
            onChange={handleChange}
          />
          This event is free
        </label>

        <button type="submit" className="create-submit">
          Publish Event
        </button>
      </form>
    </OrganizerLayout>
  );
};

export default CreateEvent;
