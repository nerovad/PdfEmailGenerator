const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const fs = require("fs");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.post("/submit", async (req, res) => {
  const formData = req.body;

  // Step 1: Generate PDF
  const pdfPath = `./form_output_${Date.now()}.pdf`;
  const doc = new PDFDocument();
  const writeStream = fs.createWriteStream(pdfPath);
  doc.pipe(writeStream);

  doc.fontSize(16).text("Form Submission", { underline: true });
  doc.moveDown();
  Object.entries(formData).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`);
  });
  doc.end();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Use 465 for SSL, or 587 for TLS
    secure: true, // ✅ `true` for port 465, `false` for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  writeStream.on("finish", async () => {
    try {
      // ✅ Create email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "matthew.davoren@ventura.org",
        subject: "Form Submission PDF",
        text: "Please find the attached form submission.",
        attachments: [{ filename: path.basename(pdfPath), path: pdfPath }],
      };

      // ✅ Send email
      await transporter.sendMail(mailOptions);
      res.status(200).send("Form submitted and email sent!");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email.");
    } finally {
      // ✅ Delete PDF after sending email
      fs.unlink(pdfPath, (err) => {
        if (err) console.error("Error deleting PDF:", err);
      });
    }
  });
  writeStream.on("error", (error) => {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF.");
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(4000, () => console.log("🚀 Server running on port 4000"));

