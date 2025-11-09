import { useState } from "react";
import axios from "axios";

function PostForm() {
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Uploading...");

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("content", content);
    if (image) formData.append("image", image);
    if (audio) formData.append("audio", audio);

    try {
      const res = await axios.post("http://localhost:8000/posts", formData);
      setStatus("✅ Post created!");
      console.log(res.data);
    } catch (err) {
      setStatus("❌ Error creating post");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
          required
        />
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 rounded bg-gray-700"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full"
        />
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudio(e.target.files[0])}
          className="w-full"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
        >
          Post
        </button>
        <p>{status}</p>
      </form>
    </div>
  );
}

export default PostForm;
