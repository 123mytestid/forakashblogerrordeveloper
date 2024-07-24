import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/posts",
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Post created successfully.");
      navigate("/posts");
    } catch (error) {
      console.error("Error creating post:", error.response.data.message);
      alert("Error creating post.");
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>Create Post</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreatePost;
