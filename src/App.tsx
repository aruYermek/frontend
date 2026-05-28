import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard/OrganizerDashboard";
import UserEvents from "./pages/UserEvents/UserEvents";
import MyBookings from "./pages/MyBookings/MyBookings";
import UserEventDetails from "./pages/UserEvents/UserEventDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import OrganizerMyEvents from "./pages/OrganizerMyEvents/OrganizerMyEvents";
import CreateEvent from "./pages/OrganizerMyEvents/CreateEvent";
import EditEvent from "./pages/OrganizerMyEvents/EditEvent";
import EventParticipants from "./pages/EventParticipants/EventParticipants";
import UserProfile from "./pages/Profiles/UserProfile";
import OrganizerProfile from "./pages/Profiles/OrganizerProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        <Route path="/user/events" element={<UserEvents />} />
        <Route path="/user/bookings" element={<MyBookings />} />
        <Route path="/user/events/:id" element={<UserEventDetails />} />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRole="participant">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/events"
          element={
            <ProtectedRoute allowedRole="participant">
              <UserEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/events/:id"
          element={
            <ProtectedRoute allowedRole="participant">
              <UserEventDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/bookings"
          element={
            <ProtectedRoute allowedRole="participant">
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/dashboard"
          element={
            <ProtectedRoute allowedRole="organizer">
              <OrganizerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/my-events"
          element={
            <ProtectedRoute allowedRole="organizer">
              <OrganizerMyEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/create-event"
          element={
            <ProtectedRoute allowedRole="organizer">
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/events/:id/edit"
          element={
            <ProtectedRoute allowedRole="organizer">
              <EditEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/events/:id/participants"
          element={
            <ProtectedRoute allowedRole="organizer">
              <EventParticipants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute allowedRole="participant">
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizer/profile"
          element={
            <ProtectedRoute allowedRole="organizer">
              <OrganizerProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
