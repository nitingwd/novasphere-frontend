import { useState } from "react";
import axios from "axios";

function TipModal({ receiverId, onClose }) {
  const [senderId, setSenderId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleTip = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sender_id", senderId);
    formData.append("receiver_id", receiverId);
    formData.append("amount", amount);

    try {
      await axios.post("http://localhost:8000/tips", formData); // removed unused 'res'
      setStatus("✅ Tip sent!");
    } catch (err) {
      setStatus("❌ Error sending tip");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-96 text-white">
        <h2 className="text-xl font-bold mb-4">💸 Tip @{receiverId}</h2>
        <form onSubmit={handleTip} className="space-y-4">
          <input
            type="text"
            placeholder="Your User ID"
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
            required
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded bg-gray-700"
            required
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
          >
            Send Tip
          </button>
          <p>{status}</p>
        </form>
        <button onClick={onClose} className="mt-4 text-sm text-gray-400">
          Close
        </button>
      </div>
    </div>
  );
}

export default TipModal;
