import jwt from "jsonwebtoken"
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
;

export const registerUser = async (req, res) => {
  const { fullname, email, password, isAdmin } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ fullname, email, password: hashedPassword, isAdmin: false });

  console.log("first")
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.fullName,
      email: user.email,
      isAdmin: user.isAdmin,
      message: "user registered successfully!!",
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};


// Example login controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password matches
    const matchpassword = await bcrypt.compare(password, user.password);
    if (matchpassword) {
      res.json({
        _id: user._id,
        name: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
        message: "User login successfully",
        token: generateToken(user._id), // Generates and returns JWT
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
//upgrade to admin

export const upgradeToAdmin = async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isAdmin = true;
    await user.save();

    res.status(200).json({ message: 'User upgraded to admin', user });
  } catch (error) {
    res.status(500).json({ message: 'Error upgrading user to admin', error });
  }
};

//update euser 
export const updateUser = async (req, res) => {
  // const { userId } = req.params;
  const { fullname, email, password, isAdmin, id } = req.body;
  console.log(isAdmin, id)

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateUser = await User.findByIdAndUpdate(id, { fullname, email, password, isAdmin }, { new: true })
    console.log(updateUser)

    // // Update the user's details
    // if (name) user.name = name;
    // if (email) user.email = email;
    // if (password) user.password = password;
    // if (isAdmin) user.isAdmin = isAdmin;

    // await user.save();
    console.log(user)

    res.status(200).json({ message: 'User updated successfully', updateUser });
  }
  catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

//delete user

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

// getalluser

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting users', error });
  }
};

export const authenticatedUser = async (req, res) => {
  res.json({
    success: true,
    message: "user is verified",
    output: req.user
  })
}