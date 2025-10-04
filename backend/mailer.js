const axios = require("axios");
require("dotenv").config();

async function sendReminderEmail(to, medicineName, time) {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Medical Reminder", email: process.env.FROM_EMAIL },
        to: [{ email: to }],
        subject: `Reminder: Take your medicine at ${time}`,
        textContent: `Hi! Don't forget to take your medicine: ${medicineName} at ${time}.`,
      },
      {
        headers: {
          "api-key": process.env.EMAIL_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`Email sent to ${to} for ${medicineName} at ${time}`);
  } catch (err) {
    console.error("Error sending email:", err.response ? err.response.data : err);
  }
}

module.exports = { sendReminderEmail };
