const jwt = require('jsonwebtoken');
const User = require('../model/user');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email, type: user.type }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = { login };
