import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Define routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects", (req, res) => {
  res.render("projects");
});

app.get("/skills", (req, res) => {
  res.render("skills");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// Handle form submission
app.post("/submit-form", (req, res) => {
  const { name, email, text } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nComment: ${text}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.send("Something went wrong. Please try again.");
    } else {
      console.log("Email sent:", info.response);
      res.send("Thank you for your message!");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
