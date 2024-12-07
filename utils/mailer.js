require("dotenv").config({ path: "./config.env" });

const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");

// Load environment variables from .env file
// dotenv.config();
// Create a reusable transporter using Gmail (or any other service you prefer)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // SMTP server
  port: 587, // TLS port (587)
  secure: false, // Use TLS
  // service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use the email stored in the .env file
    pass: process.env.EMAIL_PASS, // Use the generated app password
  },
  logger: true, // Enable logger to get detailed info about email sending process
});

// Function to send registration email
const todoRegistrationEmail = async (email, todo) => {
  const dueDate = new Date(todo.dueDate);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dueDate);

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to: email, // Recipient email (dynamic)
    subject: "Tickit Reminder",
    // HTML email content with inline CSS
    html: `
      <html>
        <head>
          <style>
          *{
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          }
            body {
              font-family: Arial, sans-serif;
              color: #333;
            }
            .container {
              width: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .content {
              background-color: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #006f40;
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              font-size: 16px;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #888;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <h1>${todo.title} is due!</h1>
              <p>Your todo ${todo.title} is due for ${formattedDate}!</p>
        </body>
      </html>
    `,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info);
  } catch (error) {
    console.error("Error details:", error); // Log full error object for more info
    throw new Error("Email could not be sent");
  }
};

module.exports = { todoRegistrationEmail };
