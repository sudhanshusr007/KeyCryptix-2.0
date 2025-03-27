import React, { useState, useEffect } from 'react';
import { FaTrash, FaClipboard } from 'react-icons/fa'; // Import react-icons
import { toast } from 'react-toastify';

// Function to mask the password
function maskPassword(pass) {
  return '*'.repeat(pass.length);
}

// Clipboard copy function
function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
    () => {
      toast.success('Copied to clipboard!');
    },
    () => {
      toast.error('Clipboard copying failed');
    }
  );
}

// Delete password
const deletePassword = (website, passwords, setPasswords) => {
  const updatedPasswords = passwords.filter((e) => e.website !== website);
  localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
  toast.success(`Successfully deleted ${website}'s password`);
  setPasswords(updatedPasswords);
};

// PasswordTable Component
const PasswordTable = () => {
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const storedPasswords = localStorage.getItem('passwords');
    if (storedPasswords) {
      setPasswords(JSON.parse(storedPasswords));
    } else {
      const mockData = [
        { website: 'example.com', username: 'user1', password: 'pass123' },
        { website: 'test.com', username: 'user2', password: '12345' },
        { website: 'demo.com', username: 'user3', password: 'password' },
      ];
      localStorage.setItem('passwords', JSON.stringify(mockData));
      setPasswords(mockData);
    }
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
          {passwords.map((password, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border-b px-6 py-4 text-sm text-gray-800">
                {password.website}
                <FaClipboard 
                  onClick={() => copyText(password.website)} 
                  className="inline cursor-pointer ml-2 text-gray-500 hover:text-gray-700"
                  size={14}
                />
              </td>
              <td className="border-b px-6 py-4 text-sm text-gray-800">
                {password.username}
                <FaClipboard 
                  onClick={() => copyText(password.username)} 
                  className="inline cursor-pointer ml-2 text-gray-500 hover:text-gray-700"
                  size={14}
                />
              </td>
              <td className="border-b px-6 py-4 text-sm text-gray-800">
                {maskPassword(password.password)}
                <FaClipboard 
                  onClick={() => copyText(password.password)} 
                  className="inline cursor-pointer ml-2 text-gray-500 hover:text-gray-700"
                  size={14}
                />
              </td>
              <td className="border-b px-6 py-4 text-sm">
                <button
                  onClick={() => deletePassword(password.website, passwords, setPasswords)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                >
                  <FaTrash className="inline mr-2" />
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
