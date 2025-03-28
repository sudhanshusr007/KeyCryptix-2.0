import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Function to mask the password
function maskPassword(pass) {
  return '*'.repeat(pass.length);
}

// Clipboard copy function (Only for password)
function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => toast.success('Password copied to clipboard!'),
    () => toast.error('Clipboard copying failed')
  );
}

// **✅ Fetch passwords from backend**
const fetchPasswords = async (setPasswords) => {
  try {
    const response = await fetch('http://localhost:5000/api/passwords', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming JWT auth
      },
    });

    if (!response.ok) throw new Error('Failed to fetch passwords');

    const data = await response.json();
    setPasswords(data);
  } catch (error) {
    console.error("Error fetching passwords:", error);
    toast.error("Failed to fetch passwords");
  }
};

// **✅ Delete password (Backend)**
const deletePassword = async (id, passwords, setPasswords) => {
  try {
    const response = await fetch(`http://localhost:5000/api/passwords/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) throw new Error('Failed to delete password');

    setPasswords(passwords.filter((password) => password._id !== id));
    toast.success("Password deleted successfully");
  } catch (error) {
    console.error("Error deleting password:", error);
    toast.error("Failed to delete password");
  }
};

// **✅ PasswordTable Component**
const PasswordTable = () => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    fetchPasswords(setPasswords);
  }, []);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600">
            <th className="border-b px-6 py-3 text-left text-sm font-medium">Website</th>
            <th className="border-b px-6 py-3 text-left text-sm font-medium">Username</th>
            <th className="border-b px-6 py-3 text-left text-sm font-medium">Password</th>
            <th className="border-b px-6 py-3 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((password) => (
            <tr key={password._id} className="hover:bg-gray-50">
              <td className="border-b px-6 py-4 text-sm text-gray-800">{password.website}</td>
              <td className="border-b px-6 py-4 text-sm text-gray-800">{password.username}</td>
              <td
                className="border-b px-6 py-4 text-sm text-gray-800 cursor-pointer relative group"
                onClick={() => copyText(password.password)}
              >
                {maskPassword(password.password)}
                <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Copy Password
                </span>
              </td>
              <td className="border-b px-6 py-4 text-sm">
                <button
                  onClick={() => deletePassword(password._id, passwords, setPasswords)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PasswordTable;
