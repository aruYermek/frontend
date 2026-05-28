import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrganizerLayout from "../../layouts/OrganizerLayout/OrganizerLayout";
import { getEventParticipants } from "../../services/bookingService";
import "./EventParticipants.css";

type ParticipantType = {
  _id: string;
  participant: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  event: {
    title: string;
    startDate: string;
    location: string;
  };
  status: string;
  createdAt: string;
};

const EventParticipants = () => {
  const { id } = useParams();
  const [participants, setParticipants] = useState<ParticipantType[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      if (!id) return;

      const data = await getEventParticipants(id);
      setParticipants(data);
    };

    fetchParticipants();
  }, [id]);

  return (
    <OrganizerLayout>
      <div className="participants-header">
        <h1>Event Participants</h1>
        <p>View participants who booked this event.</p>
      </div>

      <div className="participants-table-card">
        {participants.length === 0 ? (
          <p>No participants yet.</p>
        ) : (
          <table className="participants-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Booked At</th>
              </tr>
            </thead>

            <tbody>
              {participants.map((item) => (
                <tr key={item._id}>
                  <td>
                    {item.participant.firstName} {item.participant.lastName}
                  </td>
                  <td>{item.participant.email}</td>
                  <td>{item.participant.phone}</td>
                  <td>
                    <span className="status-badge">{item.status}</span>
                  </td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </OrganizerLayout>
  );
};

export default EventParticipants;