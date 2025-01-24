import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddContent = () => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    user_id: null, // Initially null until dynamically set
  });

  const [error, setError] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Simulate dynamic userId (Replace with your authentication logic)
  useEffect(() => {
    const fetchUserId = async () => {
      const id = localStorage.getItem("user_id");
      const user_id = id; // Example: Replace with dynamic user ID
      setForm((prevForm) => ({ ...prevForm, user_id }));
    };

    fetchUserId();
  }, []);

  // Validate form inputs
  const validateForm = () => {
    const newError = {};
    let valid = true;

    if (!form.title) {
      newError.title = 'Title is required';
      valid = false;
    }

    if (!form.content) {
      newError.content = 'Content is required';
      valid = false;
    }

    if (!form.user_id) {
      newError.user_id = 'User ID is not set'; // Validation for userId
      valid = false;
    }

    setError(newError);
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const token = localStorage.getItem("token");

    try {
      // Send data as JSON
      // await axios.post('http://localhost:3001/todos/', form, {
      await axios.post('https://b02c-182-253-48-10.ngrok-free.app/api/article', form, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setIsModalOpen(true); // Show success modal
      setTimeout(() => {
        setIsModalOpen(false); // Close modal before navigation
        navigate('/'); // Redirect to home
      }, 2000);
    } catch (error) {
      alert(`Failed to add content: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8 sm:p-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
            Add New Content
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-base"
                placeholder="Enter the title here"
              />
              {error.title && <p className="mt-2 text-sm text-red-600">{error.title}</p>}
            </div>

            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block text-lg font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={form.content}
                onChange={handleChange}
                rows="8"
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 text-base"
                placeholder="Enter content here"
              ></textarea>
              {error.content && <p className="mt-2 text-sm text-red-600">{error.content}</p>}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white text-lg font-medium py-4 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Add Article'}
              </button>
            </div>
          </form>
        </div>

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <p className="text-lg font-semibold text-center text-gray-800">
                Article Added Successfully!
              </p>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AddContent;
