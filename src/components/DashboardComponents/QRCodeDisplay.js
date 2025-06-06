// QRCodeDisplay.js
import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";


const QRCodeDisplay = ({ ticketCode, data, updateCVLink, updateLinkedInLink }) => {
  const [editingCV, setEditingCV] = useState(false);
  const [cvInput, setCvInput] = useState("");

  const [editingLinkedIn, setEditingLinkedIn] = useState(false);
  const [linkedinInput, setLinkedinInput] = useState("");

  const handleSubmitCV = async () => {
    if (cvInput.trim() !== "") {
      await updateCVLink(cvInput);
      setEditingCV(false);
      setCvInput("");
    }
  };

  const handleSubmitLinkedIn = async () => {
    if (linkedinInput.trim() !== "") {
      await updateLinkedInLink(linkedinInput);
      setEditingLinkedIn(false);
      setLinkedinInput("");
    }
  };

  const boothCount = data?.boothCollected
    ? Object.values(data.boothCollected).filter(Boolean).length
    : 0;

  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-xl font-bold">{ticketCode}</p>
      <QRCodeCanvas value={ticketCode} size={300} />

      {/* 📦 Green Box Container */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-2xl mt-6 justify-center">
        {/* CV Link Box */}
        <div className="bg-[#0a4f3c] text-white rounded-2xl px-6 py-6 flex-1">
          <h3 className="text-xl font-bold mb-4 text-center">Setup CV Link</h3>
          <div className="flex flex-col gap-3 items-center">
            {editingCV ? (
              <>
                <input
                  type="url"
                  placeholder="Paste your CV link"
                  value={cvInput}
                  onChange={(e) => setCvInput(e.target.value)}
                  className="w-full max-w-xs px-3 py-2 rounded-md text-black"
                />
                <button
                  onClick={handleSubmitCV}
                  className="w-full max-w-xs bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md"
                >
                  Submit CV Link
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditingCV(true)}
                  className="w-full max-w-xs bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md"
                >
                  Upload Your CV Link
                </button>
                {data && data.CV_link ? (
                  <a
                    href={data.CV_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-xs bg-white hover:bg-gray-200 text-green-900 font-semibold py-2 rounded-md text-center"
                  >
                    View Your CV Link
                  </a>
                ) : (
                  <p className="text-sm text-gray-300 italic mt-2">
                    You have not uploaded the CV link
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* LinkedIn Link Box */}
        <div className="bg-[#0a4f3c] text-white rounded-2xl px-6 py-6 flex-1">
          <h3 className="text-xl font-bold mb-4 text-center">Setup LinkedIn Link</h3>
          <div className="flex flex-col gap-3 items-center">
            {editingLinkedIn ? (
              <>
                <input
                  type="url"
                  placeholder="Paste your LinkedIn link"
                  value={linkedinInput}
                  onChange={(e) => setLinkedinInput(e.target.value)}
                  className="w-full max-w-xs px-3 py-2 rounded-md text-black"
                />
                <button
                  onClick={handleSubmitLinkedIn}
                  className="w-full max-w-xs bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md"
                >
                  Submit LinkedIn Link
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setEditingLinkedIn(true)}
                  className="w-full max-w-xs bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md"
                >
                  Upload Your LinkedIn Link
                </button>
                {data && data.linkedin_link ? (
                  <a
                    href={data.linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-xs bg-white hover:bg-gray-200 text-green-900 font-semibold py-2 rounded-md text-center"
                  >
                    View Your LinkedIn Link
                  </a>
                ) : (
                  <p className="text-sm text-gray-300 italic mt-2">
                    You have not uploaded the LinkedIn link
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Reward Status Display */}
      <div className="bg-[#0a4f3c] text-white rounded-2xl px-6 py-6 w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-4 text-center">Rewards Received</h3>

        <p className="text-sm text-gray-200 text-center mb-3">
          Booths Collected: <span className="font-bold text-white">{boothCount}</span>
        </p>

        <div className="flex flex-col gap-2 items-center">
          {data?.receivedRewards ? (
            <ul className="text-left list-disc">
              {[5, 8, 13, 18].map((booth) => (
                <li
                  key={booth}
                  className={data.receivedRewards[booth] ? "text-green-300" : "text-gray-300"}
                >
                  {booth} booths: {data.receivedRewards[booth] ? "✅ Received" : "❌ Not yet"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 italic">You have not received any rewards yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
