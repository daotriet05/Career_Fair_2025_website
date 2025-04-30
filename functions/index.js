/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const axios = require("axios");
const cors = require("cors")({ origin: true });

// Hardcode secret for now
const RECAPTCHA_SECRET_KEY = "";

exports.verifyCaptcha = onRequest((req, res) => {
    cors(req, res, async () => {
        const token = req.body.token;

        if (!token) {
            return res.status(400).json({ success: false, message: "No token provided" });
        }

        try {
            const params = new URLSearchParams();
            params.append('secret', RECAPTCHA_SECRET_KEY);
            params.append('response', token);

            const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', params);

            const data = response.data;

            if (data.success) {
                return res.status(200).json({ success: true });
            } else {
                console.error("reCAPTCHA failed:", data);
                return res.status(400).json({ success: false, message: "reCAPTCHA verification failed" });
            }
        } catch (error) {
            console.error("Captcha verification error:", error.message);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    });
});