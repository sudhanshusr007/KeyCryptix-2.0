const Password = require("../models/password.model");
const CryptoJS = require("crypto-js");

const secretKey = process.env.PASSWORD_SECRET_KEY || "default_secret_key";

// Encryption function
const encryptData = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString(); // Encrypt and store as Base64
};

// Decryption function
const decryptData = (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText ? decryptedText : cipherText; // Return original if decryption fails
  } catch (error) {
    console.error("Decryption failed:", error);
    return cipherText; // Fallback to raw text to avoid crashes
  }
};

// **✅ Add Password**
const addPassword = async (req, res) => {
  try {
    const { website, username, password } = req.body;
    const userId = req.user.id;

    const newPassword = new Password({
      website: encryptData(website),
      username: encryptData(username),
      password: encryptData(password),
      user: userId,
    });

    await newPassword.save();
    return res.status(201).json({ message: "Password added successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

// **✅ Get All Passwords (Decrypted)**
const getAllPasswords = async (req, res) => {
  try {
    const userId = req.user.id;
    const passwords = await Password.find({ user: userId });

    // Decrypt passwords before sending to frontend
    const decryptedPasswords = passwords.map((item) => ({
      _id: item._id,
      website: decryptData(item.website),
      username: decryptData(item.username),
      password: decryptData(item.password),
    }));

    return res.status(200).json(decryptedPasswords);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

const deletePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Find and delete the password
    const deletedPassword = await Password.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deletedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }

    return res.status(200).json({ message: "Password deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};

module.exports = { addPassword, getAllPasswords, deletePassword };
