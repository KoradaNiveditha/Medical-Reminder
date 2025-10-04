import { useState } from "react";
import axios from "axios";

function ReminderForm({ token, onAdd }) {
  const [medicineName, setMedicineName] = useState("");
  const [times, setTimes] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (!medicineName || !times) return alert("Fill all fields");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/reminders",
        { medicineName, times: times.split(",").map(t => t.trim()) },
        { headers: { "x-auth-token": token } }
      );
      onAdd(res.data);
      setMedicineName("");
      setTimes("");
    } catch (err) {
      console.log("Reminder POST error:", err.response ? err.response.data : err);
      alert("Error adding reminder");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input type="text" placeholder="Medicine Name" value={medicineName} onChange={e => setMedicineName(e.target.value)} required />
      <input type="text" placeholder="Times (comma separated, e.g., 08:00,14:00)" value={times} onChange={e => setTimes(e.target.value)} required />
      <button type="submit">Add Reminder</button>
    </form>
  );
}

export default ReminderForm;
