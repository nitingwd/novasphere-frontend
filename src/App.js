import PostForm from "./components/PostForm";
import PostFeed from "./components/PostFeed";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <PostForm />
      <PostFeed />
    </div>
  );
}

export default App;
