import React from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../features/postsSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NavBar from "./NavBar";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().nullable(),
});

const CreatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    const { name, description, image } = values;

    if (image) {
      const file = image;
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        dispatch(
          addPost({
            id: Date.now(),
            name,
            description,
            image: fileReader.result,
            comments: [],
          })
        );
        setSubmitting(false);
        navigate("/posts");
      };
      fileReader.readAsDataURL(file);
    } else {
      dispatch(
        addPost({
          id: Date.now(),
          name,
          description,
          image: "",
          comments: [],
        })
      );
      setSubmitting(false);
      navigate("/");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Create Post</h1>
          <Formik
            initialValues={{
              name: "",
              date: new Date().toISOString().split("T")[0],
              description: "",
              image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm md:text-base"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="border p-2 w-full rounded-lg text-sm md:text-base"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm md:text-base"
                    htmlFor="description"
                  >
                    Description:
                  </label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    className="border p-2 w-full rounded-lg text-sm md:text-base"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm md:text-base"
                    htmlFor="image"
                  >
                    Image (optional):
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) => {
                      setFieldValue("image", e.currentTarget.files[0]);
                    }}
                    className="border p-2 w-full rounded-lg text-sm md:text-base"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm md:text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
