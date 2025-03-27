import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Assuming Navbar is in components
import { toast } from 'react-toastify'; // For displaying toast messages

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error('Please fill in all fields.');
      return;
    }

    // In a real-world scenario, this would be sent to the server
    toast.success('Your message has been sent! We will get back to you shortly.');

    // Clear form after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 font-sans">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8 text-center">
          Contact Us
        </h1>

        <div className="max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">We’d love to hear from you</h2>
          <p className="text-lg text-gray-600 mb-6">
            Please fill out the form below and we will get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold">Your Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-semibold">Your Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Enter your message"
                rows="4"
              ></textarea>
            </div>

            <button
  type="submit"
  className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black-400"
>
  Send Message
</button>

          </form>
        </div>

      
      </div>
    </>
  );
};

export default ContactUs;
