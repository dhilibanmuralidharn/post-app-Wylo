import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../features/postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const EditPost = () => {
  const { id } = useParams();
  const post = useSelector((state) =>
    state.posts.posts.find((p) => p.id === Number(id))
  );
  const [name, setName] = useState(post.name);
  const [date, setDate] = useState(post.date);
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState(post.image);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    dispatch(editPost({ id: Number(id), name, date, image, description }));
    navigate("/posts");
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
          <div className="mb-4">
            <label className="block mb-2 text-sm md:text-base">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded-lg text-sm md:text-base"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm md:text-base">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 w-full rounded-lg text-sm md:text-base"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm md:text-base">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full rounded-lg text-sm md:text-base"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm md:text-base">Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="border p-2 w-full rounded-lg text-sm md:text-base"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm md:text-base w-full"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
