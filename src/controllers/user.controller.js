const User = require('../model/user');

const addUser = async (req, res) => {
    const { email, name, type, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = await User.create({ email, name, type, password });
        res.status(201).json({ message: 'User created', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: `User with ID ${userId} deleted` });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, type, password } = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.type = type || user.type;
        user.password = password || user.password;

        await user.save();
        res.status(200).json({ message: 'User updated', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  console.log('userId:', userId);
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


module.exports = { addUser, deleteUser, updateUser, listUsers, getUserById };
