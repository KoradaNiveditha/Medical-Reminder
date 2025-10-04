require("dotenv").config();
const { sendReminderEmail } = require("./mailer");

const testRecipient = "medicalreminder04@gmail.com"; // must be verified in Brevo free plan

sendReminderEmail(testRecipient, "Test Medicine", "18:00")
  .then(() => console.log("Test email sent successfully!"))
  .catch(err => console.error("Error sending test email:", err));
