import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error.response.data.message);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Post deleted successfully.");
      navigate("/posts");
    } catch (error) {
      console.error("Error deleting post:", error.response.data.message);
      alert("Error deleting post.");
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>By {post.author.username}</p>
      <p>{post.content}</p>
      {post.author._id === localStorage.getItem("userId") && (
        <>
          <Link to={`/edit/${post._id}`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default PostDetails;
