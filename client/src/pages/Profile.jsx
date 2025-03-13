import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { updateUserProfile } from "../services/userService";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(user._id, updatedUser); // Send User ID
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={updatedUser.name} placeholder="Full Name" className="w-full p-2 border" onChange={handleChange} required />
        <input type="email" name="email" value={updatedUser.email} placeholder="Email" className="w-full p-2 border" readOnly />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
