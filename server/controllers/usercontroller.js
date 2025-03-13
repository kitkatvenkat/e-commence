const userschema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const useremail = await userschema.findOne({ email });
    if (useremail) return res.status(400).json({ message: "Email already exists" });

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new userschema({ name, email, password: hashpassword, role });

    const savedata = await newUser.save();
    res.json({ message: "User registered successfully", savedata });
};

const userRegisterDataGet = async (req, res, next) => {
    try {
        const Getdata = await userschema.find();
        if (Getdata && Getdata.length > 0) {
            res.status(200).json({
                success: true,
                message: "User data fetched successfully",
                data: Getdata
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No user data found"
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const userlogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;  // ✅ Destructure correctly

        if (!email || !password) {
            return res.status(400).json({ message: "❌ Email and password are required!" });
        }

        const user = await userschema.findOne({ email });  // ✅ Fix: Use email string only

        if (!user) {
            return res.status(400).json({ message: "❌ User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "❌ Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: "✅ Login successful!", user, token });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "❌ Server error" });
    }
};
// 🔹 User Update Method
const userUpdate = async (req, res, next) => {
    const { id } = req.params;  // Get user ID from request params
    const { name, email, password, role } = req.body;

    try {
        let user = await userschema.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (role) user.role = role;

        const updatedUser = await user.save();
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
const changePassword = async (req, res, next) => {
    const { id } = req.params; // Get user ID from request params
    const { oldPassword, newPassword } = req.body;

    try {
        let user = await userschema.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if old password matches
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });

        // Hash and update new password
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


module.exports = { userRegister, userRegisterDataGet, userlogin, userUpdate ,changePassword };
