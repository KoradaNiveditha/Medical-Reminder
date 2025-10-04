const cron = require("node-cron");
const Reminder = require("./models/Reminder");
const { sendReminderEmail } = require("./mailer");

// Run every minute
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();

  console.log(`Checking reminders at ${hour}:${minute}`);

  try {
    const reminders = await Reminder.find({});
    for (const reminder of reminders) {
      for (const timeStr of reminder.times) {
        const [rHour, rMin] = timeStr.split(":").map(Number);
        if (rHour === hour && rMin === minute) {
          console.log(`Sending email to ${reminder.userEmail} for ${reminder.medicineName} at ${timeStr}`);
          await sendReminderEmail(reminder.userEmail, reminder.medicineName, timeStr);
        }
      }
    }
  } catch (err) {
    console.error("Error fetching reminders:", err);
  }
});

console.log("Reminder cron job started...");
