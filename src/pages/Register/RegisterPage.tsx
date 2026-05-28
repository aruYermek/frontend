import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "../Login/LoginPage.css";
import "./RegisterPage.css";

type Role = "participant" | "organizer";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("participant");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    bin: "",
    contactPerson: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const phoneRegex = /^\+7\d{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    const binRegex = /^\d{12}$/;

    if (!formData.email || !formData.phone || !formData.password) {
      return "Email, phone and password are required";
    }

    if (!phoneRegex.test(formData.phone)) {
      return "Phone must start with +7 and contain 10 digits after it";
    }

    if (!passwordRegex.test(formData.password)) {
      return "Password must be at least 6 characters and contain at least one letter and one number";
    }

    if (role === "participant") {
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        return "First name and last name are required";
      }
    }

    if (role === "organizer") {
      if (
        !formData.companyName.trim() ||
        !formData.bin.trim() ||
        !formData.contactPerson.trim()
      ) {
        return "Company name, BIN and contact person are required";
      }

      if (!binRegex.test(formData.bin)) {
        return "BIN must contain exactly 12 digits";
      }
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const payload =
      role === "participant"
        ? {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: "participant",
          }
        : {
            companyName: formData.companyName,
            bin: formData.bin,
            contactPerson: formData.contactPerson,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: "organizer",
          };

    try {
      const data = await registerUser(payload);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "participant") {
        navigate("/user/dashboard");
      } else {
        navigate("/organizer/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">E</div>
          <span>Evently</span>
        </Link>

        <h1>Create account</h1>
        <p>Join Evently as a participant or organizer.</p>

        <div className="role-tabs">
          <button
            type="button"
            className={role === "participant" ? "active" : ""}
            onClick={() => setRole("participant")}
          >
            Participant
          </button>

          <button
            type="button"
            className={role === "organizer" ? "active" : ""}
            onClick={() => setRole("organizer")}
          >
            Organizer
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {role === "participant" ? (
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  name="firstName"
                  type="text"
                  placeholder="Aruzhan"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  placeholder="Ermek"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  name="companyName"
                  type="text"
                  placeholder="Event Pro LLP"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>BIN</label>
                <input
                  name="bin"
                  type="text"
                  placeholder="123456789012"
                  value={formData.bin}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Contact Person</label>
                <input
                  name="contactPerson"
                  type="text"
                  placeholder="Aruzhan Ermek"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              type="text"
              placeholder="+77001234567"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-submit">
            Register as {role === "participant" ? "Participant" : "Organizer"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
