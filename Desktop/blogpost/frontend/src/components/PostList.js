import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts");
        if (response && response.data) { // Check if response and response.data exist
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Failed to fetch posts. Please try again later.");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      {error && <p>{error}</p>}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>By {post.author.username}</p>
            <Link to={`/posts/${post._id}`}>Read More</Link>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default PostList;
