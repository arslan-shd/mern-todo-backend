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
    subject: `Reminder: ${todo.title} is Due!`,
    // HTML email content with inline CSS
    html: `
      <html>
        <head>
          <style>
              * {
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
      font-size: 24px;
      margin-bottom: 20px;
    }

    p {
      font-size: 16px;
      margin-bottom: 15px;
    }

    p>span {
      font-weight: bold;
      color: #006f40;
    }

    /* Button Styling */
    .complete-task-button {
      display: inline-block;
      padding: 12px 16px;
      /* Adjust for size */
      font-family: Arial, sans-serif;
      font-size: 12px;
      font-weight: bold;
      color: #fff;
      /* White text */
      background-color: #006f40;
      ;
      /* Replace with your app's primary color */
      border: none;
      border-radius: 5px;
      /* Rounded corners */
      text-decoration: none;
      /* Remove underline for links */
      text-align: center;
      cursor: pointer;
      transition: background-color 0.3s ease, transform 0.2s ease;
      /* Hover effects */
    }

    /* Hover and Focus States */
    .complete-task-button:hover,
    .complete-task-button:focus {
      background-color: #05472A;
      /* Slightly darker shade */
      transform: scale(1.05);
      /* Subtle zoom effect */
    }

    /* Active State */
    .complete-task-button:active {
      background-color: #3e8e41;
      /* Even darker shade */
      transform: scale(1);
      /* Reset zoom effect */
    }

    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #888;
    }

    .app-name {
      font-weight: bold;
      /*color: #006f40;*/
      color: #05472A;
    }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <h1>${todo.title} is due!</h1>
              <p class="description">Hi, Your task <span>${todo.title}</span> is due for ${formattedDate}! </p>
              <a href="https://tickit-todo.netlify.app/" class="complete-task-button">Complete Task Now</a>
              <div class="footer"> Best regards, <br>
                <span class="app-name">The Tickit Team.</span>
              </div>
            </div>
          </div>
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
