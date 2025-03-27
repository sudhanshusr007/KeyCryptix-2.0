import React from "react";
import Navbar from "../components/Navbar"; // Assuming Navbar is in components

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 font-sans">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-8 text-center">
          About Us
        </h1>

        <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            At KeyCryptix, we aim to provide users with a secure and easy-to-use
            password management tool that simplifies your digital life. Our
            platform prioritizes user privacy and offers advanced encryption,
            ensuring your passwords are always safe.
          </p>

          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            Who We Are
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            We are a team of passionate developers, security experts, and
            designers working together to create a platform that offers more
            than just basic password storage. We are dedicated to building a
            secure and user-friendly experience that helps you manage your
            passwords with ease.
          </p>

          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-600">
            <li>
              Strong Encryption: Your passwords are encrypted with the latest
              security protocols.
            </li>
            <li>
              User-Focused Design: We’ve built an intuitive, simple interface
              for everyone.
            </li>
            <li>
              Seamless Sync: Access your passwords anywhere, anytime, across
              devices.
            </li>
            <li>
              Free to Use: Our platform offers free basic functionality with
              premium features for advanced users.
            </li>
          </ul>

          <h2 className="text-3xl font-semibold text-gray-700 mt-6 mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600">
            If you have any questions or suggestions, feel free to reach out to
            us. We are always here to help you.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Email:{" "}
            <a href="mailto:sudhanshusr007@gmail.com" className="text-blue-500">
              sudhanshusr007@gmail.com
            </a>
          </p>
           {/* Footer Section */}
        <footer className="w-full bg-black text-white py-6 mt-12 text-center">
          <p className="text-lg font-semibold">Made with ❤️ by Sudhanshu</p>
        </footer>
        </div>
       
      </div>
    </>
  );
};

export default AboutUs;
