import React, { useState }  from 'react';
import '../../App.css';
import { auth, db } from '../../firebase-config';
import { doc, serverTimestamp, setDoc, Timestamp } from 'firebase/firestore';
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

export const majors = ["CSE", "ECE", "MEN", "BCE", "ARC", "SME", "SPE", "BBA", "BFA", "Other"];
export const intakes = ["Before 2018", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];

const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

function RegisterSection() {
    const [formData, setFormData] = useState({
        studentName: "",
        studentEmail: "",
        studentMajor: "",
        studentIntake: "",
        studentQuestion: "",
    });

    const [captchaToken, setCaptchaToken] = useState(null);
    const [status, setStatus] = useState("");
    const [step, setStep] = useState("form"); // form, verify, success
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleCaptcha = (value) => setCaptchaToken(value);

    const generateRandomPassword = (length = 8) => {
        const characters = "0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!captchaToken) return setStatus("Please complete the CAPTCHA.");
        const generatedPassword = generateRandomPassword();

        try {
            const userCred = await createUserWithEmailAndPassword(auth, formData.studentEmail, generatedPassword);
            await sendEmailVerification(userCred.user);

            await setDoc(doc(db, "studentRegistrations", userCred.user.uid), {
                studentName: formData.studentName,
                studentEmail: formData.studentEmail,
                studentPassword: generatedPassword,
                studentMajor: formData.studentMajor,
                studentIntake: formData.studentIntake,
                studentQuestion: formData.studentQuestion,
                createdAt: Timestamp.now(),
            });
            await signOut(auth); // Force user to verify before using app
            setStatus("Registration successful! A verification email has been sent to ${studentEmail}.");
            // navigate("/login"); // Redirect to login page after registration

        } catch (error) {
            setStatus("Error: " + error.message);
        }
    };


    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-4 py-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#145f48] mb-6 text-center">
                STUDENT REGISTRATION
            </h2>

            <div className="w-full max-w-xl bg-[#145f48] p-8 rounded-lg shadow-md">
                {step === "form" && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-white font-semibold text-left mb-1">
                                Student’s full name: <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="studentName"
                                value={formData.studentName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white font-semibold text-left mb-1">
                                VGU email address: <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="studentEmail"
                                value={formData.studentEmail}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-white font-semibold text-left mb-1">
                                Select Major: <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="studentMajor"
                                value={formData.studentMajor}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none"
                            >
                                <option value="">-- Select Major --</option>
                                {majors.map((major) => (
                                    <option key={major} value={major}>{major}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-white font-semibold text-left mb-1">
                                Select Intake: <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="studentIntake"
                                value={formData.studentIntake}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none"
                            >
                                <option value="">-- Select Intake --</option>
                                {intakes.map((intake) => (
                                    <option key={intake} value={intake}>{intake}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-white font-semibold text-left mb-1">
                                Any questions or wishes for VGU Career Fair & Industry Exploration Day 2025:
                            </label>
                            <input
                                type="text"
                                name="studentQuestion"
                                value={formData.studentQuestion}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none"
                            />
                        </div>
                        
                        {RECAPTCHA_SITE_KEY && (
                            <ReCAPTCHA 
                            sitekey={RECAPTCHA_SITE_KEY} 
                            onChange={handleCaptcha} 
                            className="mb-4"
                            />
                        )}

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded-md"
                            >
                                SUBMIT
                            </button>
                        </div>
                    </form>
                )}

                {step === "verify" && (
                    <div className="text-white text-center">
                        <h2 className="text-2xl font-bold">📩 Please check your email</h2>
                        <p className="mt-2">Click the link in your inbox to verify your email and complete registration.</p>
                    </div>
                )}

                {step === "success" && (
                    <div className="text-center text-white">
                        <h2 className="text-2xl font-bold text-yellow-300">🎉 Your submission has been recorded!</h2>
                        <p className="mt-2 text-white">Thank you for registering for the VGU Career Fair & Industry Exploration Day 2025.</p>
                    </div>
                )}
            </div>
            {status && <p className="mt-4 text-center">{status}</p>}
        </div>
    );
}

export default RegisterSection;