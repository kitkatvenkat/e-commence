import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { changeUserPassword } from "../services/userService";

const ChangePassword = () => {
  const { user } = useContext(AuthContext);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      await changeUserPassword(user._id, passwords);
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Password Change Error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="password" name="oldPassword" placeholder="Current Password" className="w-full p-2 border" onChange={handleChange} required />
        <input type="password" name="newPassword" placeholder="New Password" className="w-full p-2 border" onChange={handleChange} required />
        <input type="password" name="confirmNewPassword" placeholder="Confirm New Password" className="w-full p-2 border" onChange={handleChange} required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
