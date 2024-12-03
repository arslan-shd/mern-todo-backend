require("dotenv").config({ path: "./config.env" });
const { todoRegistrationEmail } = require("../utils/mailer");

// Middleware function to send registration email
const registrationEmailMiddleware = async (todo, email) => {
  // const { email, todo.title } = req.body;
  console.log("Data:", email, todo);
  try {
    // Send registration email
    await todoRegistrationEmail(email, todo);
    console.log(`Registration email sent to ${email}`);
    // console.log("right", email, todo.title);
    // Proceed to the next middleware or controller (in your case, registration response)
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error.message || error);
    // Send error response if email sending fails
    // return res.status(500).json({
    //   message: "Failed to send registration email",
    //   error: error.message || error``,
    // });
  }
};

module.exports = registrationEmailMiddleware;
