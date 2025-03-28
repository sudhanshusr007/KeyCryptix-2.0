import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaPlusCircle } from 'react-icons/fa'; // Import react-icons

const AddPasswordForm = () => {
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are provided
    if (website && username && password) {
      try {
        // Send the data to the backend API to save the password
        const response = await fetch('http://localhost:5000/api/passwords/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
          },
          body: JSON.stringify({ website, username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setWebsite('');
          setUsername('');
          setPassword('');
          toast.success(data.message || 'Password added successfully!'); // Show success toast
        } else {
          toast.error(data.message || 'Failed to add password'); // Show error toast
        }
      } catch (error) {
        toast.error('Something went wrong. Please try again later.');
      }
    } else {
      toast.error('Please fill in all fields'); // Show error toast if fields are empty
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <label htmlFor="website" className="block text-sm font-semibold">Website</label>
        <input
          type="text"
          id="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Enter website"
        />
      </div>

      <div className="form-group">
        <label htmlFor="username" className="block text-sm font-semibold">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Enter username"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="block text-sm font-semibold">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Enter password"
        />
      </div>

      <button type="submit" className="bg-black text-white px-6 py-2 rounded-md font-bold hover:bg-gray-800">
        <FaPlusCircle className="inline mr-2" /> Add Password
      </button>
    </form>
  );
};

export default AddPasswordForm;
