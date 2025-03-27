import React, { useState } from 'react';
import PasswordTable from '../components/PasswordTable';
import AddPasswordForm from '../components/AddPasswordForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

const Home = () => {
  const [passwords, setPasswords] = useState([
    { website: 'Google', username: 'sudhanshusr007', password: 'wydvc73' },
    { website: 'Facebook', username: 'john_doe', password: 'abcd1234' },
    { website: 'Twitter', username: 'jane_doe', password: 'xyz9876' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addPassword = (newPassword) => {
    setPasswords([...passwords, newPassword]);
    setIsModalOpen(false);  // Close the modal after adding the password
  };

  const deletePassword = (website) => {
    setPasswords(passwords.filter((password) => password.website !== website));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 font-sans">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8 text-center">
          KeyCryptix
        </h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          Secure your passwords with ease. Manage them all in one place.
        </p>

        {/* Password Table */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 mb-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex justify-between items-center">
            Your Passwords
            {/* Add New Password Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition text-sm"
            >
              Add New Password
            </button>
          </h2>
          <PasswordTable passwords={passwords} deletePassword={deletePassword} />
        </div>

        {/* Modal for Adding Password */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Password</h2>
              <AddPasswordForm addPassword={addPassword} />
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
