import { useEffect, useState } from "react";
import axios from "axios";
import TipModal from "./TipModal";

function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const openModal = (userId) => {
    setSelectedUser(userId);
    setShowModal(true);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold text-white">📰 Creator Feed</h2>
      {posts.length === 0 ? (
        <p className="text-gray-400">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="bg-gray-800 p-4 rounded-lg text-white">
            <p className="font-semibold">@{post.user_id}</p>
            <p className="mt-2">{post.content}</p>
            {post.image_url && (
              <img src={post.image_url} alt="Post" className="mt-4 rounded" />
            )}
            {post.audio_url && (
              <audio controls className="mt-4 w-full">
                <source src={post.audio_url} type="audio/mpeg" />
              </audio>
            )}
            <p className="text-sm text-gray-400 mt-2">
              {new Date(post.created_at).toLocaleString()}
            </p>
            <button
              onClick={() => openModal(post.user_id)}
              className="mt-4 bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
            >
              💸 Tip Creator
            </button>
          </div>
        ))
      )}

      {showModal && (
        <TipModal
          receiverId={selectedUser}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default PostFeed;
