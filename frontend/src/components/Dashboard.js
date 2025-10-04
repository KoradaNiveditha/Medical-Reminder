import { useEffect, useState } from "react";
import axios from "axios";
import ReminderForm from "./ReminderForm";
import "../App.css"; // Make sure this imports your CSS

function Dashboard() {
  const [reminders, setReminders] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch reminders from backend
  const fetchReminders = () => {
    axios
      .get("http://localhost:5000/api/reminders", { headers: { "x-auth-token": token } })
      .then((res) => setReminders(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
  const fetchReminders = () => {
    axios
      .get("http://localhost:5000/api/reminders", { headers: { "x-auth-token": token } })
      .then((res) => setReminders(res.data))
      .catch((err) => console.log(err));
  };

  fetchReminders();
}, [token]);


  // Delete a reminder
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reminders/${id}`, { headers: { "x-auth-token": token } });
      setReminders(reminders.filter((r) => r._id !== id));
    } catch (err) {
      console.log(err);
      alert("Error deleting reminder");
    }
  };

  // Add new reminder
  const handleAdd = (newReminder) => {
    setReminders([...reminders, newReminder]);
  };

  return (
    <div className="dashboard-container">
      <h1>My Medicines</h1>
      <ReminderForm token={token} onAdd={handleAdd} />

      {reminders.length === 0 ? (
        <p>No reminders added yet.</p>
      ) : (
        reminders.map((r) => (
          <div key={r._id} className="reminder-card">
            <strong>{r.medicineName}</strong> at {r.times.join(", ")}
            <button className="delete-btn" onClick={() => handleDelete(r._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
