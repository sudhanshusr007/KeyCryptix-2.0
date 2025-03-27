import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GeneratePassword = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecial, setIncludeSpecial] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleGeneratePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characters = lowercase;
    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSpecial) characters += specialChars;

    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    setGeneratedPassword(password);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    toast.success('Password copied to clipboard!'); // Show success toast
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 font-sans">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8 text-center">
          Generate a Secure Password
        </h1>

        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mb-10">
          {/* Password Length Input */}
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold">Password Length</label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              min="8"
              max="20"
              className="w-full p-2 border rounded-md mt-2"
            />
          </div>

          {/* Character Types */}
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold">Include Uppercase Letters</label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="mr-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-semibold">Include Numbers</label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="mr-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-800 font-semibold">Include Special Characters</label>
            <input
              type="checkbox"
              checked={includeSpecial}
              onChange={() => setIncludeSpecial(!includeSpecial)}
              className="mr-2"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGeneratePassword}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition mb-4"
          >
            Generate Password
          </button>

          {/* Generated Password */}
          {generatedPassword && (
            <div className="text-center">
              <p className="text-2xl font-bold mb-4">{generatedPassword}</p>
              <button
                onClick={handleCopyPassword}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              >
                Copy to Clipboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default GeneratePassword;
