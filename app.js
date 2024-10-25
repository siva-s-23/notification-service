require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_API_KEY = process.env.BREVO_API_KEY;

// POST route to send a notification email
app.post('/send-notification', async (req, res) => {
    const { to, subject, text, html } = req.body;

    const emailData = {
        sender: { email: 'no.reply.shiva.dev@gmail.com' },
        to: [{ email: to }],
        subject,
        textContent: text,
        htmlContent: html,
    };

    try {
        const response = await axios.post(BREVO_API_URL, emailData, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': BREVO_API_KEY,
            },
        });
        res.status(200).send({ success: true, message: 'Email sent successfully', data: response.data });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ success: false, message: 'Failed to send email', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
