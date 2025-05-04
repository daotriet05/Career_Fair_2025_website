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
// import ReCAPTCHA from "react-google-recaptcha";

export const majors = ["CSE", "ECE", "MEN", "BCE", "ARC", "SME", "SPE", "BBA", "BFA", "Other"];
export const intakes = ["Before 2018", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];
export const booths = [
                "Adnovum", "Bosch", "Endress Hauser", "Fischer",
                "FPT Software", "Indefol", "iTechwx", "Kyungbang", "LEGO", "MAC ZT", "Mitek",
                "Nam A Bank", "Netcompany", "Nextern", "NTPM", "Renesas", "SAP", "Shopee",
                "Techcombank", "TTI", "Wanek", "Ziehl Albegg",
            ];
export const roles = ["Student", "Volunteer", "Organizer"];

// const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

function RegisterSection() {
    const [formData, setFormData] = useState({
        studentName: "",
        studentEmail: "",
        studentPassword: "",
        studentMajor: "",
        otherMajor: "",    // for Master students
        CV: "",
        studentIntake: "",
        studentRole: "",
        identificationNumCode: "",
        CV_link: "",
        linkedin_link: "",
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        // VERIFY CAPTCHA
        // if (!captchaToken) return setStatus("Please complete the CAPTCHA.");

        // try {
        //     const captchaRes = await fetch("https://us-central1-careerfair2025-user-data.cloudfunctions.net/verifyCaptcha", {
        //         method: "POST",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ token: captchaToken })
        //     });

        //     const captchaData = await captchaRes.json();

        //     if (!captchaData.success) {
        //         setStatus("CAPTCHA verification failed. Please try again.");
        //         return;
        //     }

        // } catch (captchaError) {
        //     setStatus("CAPTCHA verification request failed.");
        //     console.error("Captcha error:", captchaError);
        //     return;
        // }

        try {
            const userCred = await createUserWithEmailAndPassword(auth, formData.studentEmail, formData.studentPassword);
            await sendEmailVerification(userCred.user);

            // await signOut(auth); // Force user to verify before using app
            setStep("verify");

            // 4. Poll every 3 seconds to check if user has verified
            const intervalId = setInterval(async () => {
                await auth.currentUser.reload(); // Refresh user state
                const updatedUser = auth.currentUser;

                if (updatedUser && updatedUser.emailVerified) {
                    clearInterval(intervalId);

                    //  NOW save to Firestore after verification
                    const boothCollected = {};
                    booths.forEach((booth) => (boothCollected[booth] = false));

                    const userData = {
                        displayName: formData.studentName,
                        email: formData.studentEmail,   
                        password: formData.studentPassword,
                        major: formData.studentMajor === "Other" ? formData.otherMajor : formData.studentMajor,
                        intake: formData.studentIntake,
                        role: formData.studentRole,
                        identificationNumCode: formData.studentRole === "Volunteer" ? formData.identificationNumCode : null,
                        boothCollected: boothCollected,
                        checkinStatus: false,
                        checkoutStatus: false,
                        receivedReward: false,
                        CV_link: formData.CV?.trim() ? formData.CV.trim() : null,
                        linkedin_link: formData.linkedin_link?.trim()
                            ? formData.linkedin_link.trim()
                            : null,
                        studentQuestion: formData.studentQuestion,
                        createdAt: Timestamp.now(),
                    };

                    await setDoc(doc(db, "studentRegistrations", userCred.user.uid), userData);
                    await signOut(auth);
                    navigate("/login");
                }
            }, 3000);
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
                                Password: <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                name="studentPassword"
                                value={formData.studentPassword}
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

                        {/* Show this input only if the selected major is "Other" */}
                        {formData.studentMajor === "Other" && (
                            <div className="mb-4">
                                <label className="block text-white font-semibold text-left mb-1">
                                Please specify your major:
                                </label>
                                <input
                                type="text"
                                name="otherMajor"
                                value={formData.otherMajor}
                                onChange={handleChange}
                                placeholder="Type your major here"
                                required
                                className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none"
                                />
                            </div>
                        )}

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

                        <div className="mb-4">
                            <label className="block text-white font-semibold text-left mb-1">
                                Select Role: <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="studentRole"
                                value={formData.studentRole}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none"
                            >
                                <option value="">-- Select Role --</option>
                                <option value="Student">Student</option>
                                <option value="Volunteer">Volunteer</option>
                                <option value="Organizer">Organizer</option>
                            </select>
                        </div>

                        {/* Volunteer Identification Code - only shown if role is Volunteer or Organizer */}
                        {(formData.studentRole === "Volunteer" || formData.studentRole === "Organizer") && (
                            <div className="mb-4">
                                <label className="block text-white font-semibold text-left mb-1">
                                    Identification Code:
                                </label>
                                <input
                                    type="text"
                                    name="identificationNumCode"
                                    value={formData.identificationNumCode}
                                    onChange={handleChange}
                                    placeholder="Enter your code"
                                    className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none"
                                />
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-white font-semibold text-left mb-1">
                                Link to your CV (optional):
                            </label>
                            <input
                                type="url"
                                name="CV"
                                value={formData.CV}
                                onChange={handleChange}
                                placeholder="https://drive.google.com/..."
                                className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-white font-semibold text-left mb-1">
                                LinkedIn Profile (optional):
                            </label>
                            <input
                                type="url"
                                name="linkedin_link"
                                value={formData.linkedin_link}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/..."
                                className="w-full px-4 py-2 mt-1 rounded-md border border-gray-300 focus:outline-none"
                            />
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
                        
                        {/* {RECAPTCHA_SITE_KEY && (
                            <ReCAPTCHA 
                            sitekey={RECAPTCHA_SITE_KEY} 
                            onChange={handleCaptcha} 
                            className="mb-4"
                            />
                        )} */}

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