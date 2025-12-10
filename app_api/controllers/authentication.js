const mongoose = require('mongoose');
const User = mongoose.model('User');

const register = async (req, res) => {
  try {
    const user = new User();
    user.email = req.body.email;
    user.name = req.body.name;
    user.setPassword(req.body.password);

    await user.save();
    const token = user.generateJwt();
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !user.validPassword(req.body.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = user.generateJwt();
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  register,
  login
};
