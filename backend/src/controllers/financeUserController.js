const User = require('../models/User');

// GET /api/finance-users
const getFinanceUsers = async (req, res) => {
  const users = await User.find({ role: 'finance' }).sort({ createdAt: -1 });
  res.json({ users });
};

// POST /api/finance-users
const createFinanceUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) return res.status(409).json({ message: 'A user with this email already exists' });

  const user = await User.create({ name, email, password, phone, role: 'finance' });

  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email, phone: user.phone, status: user.status, role: user.role },
  });
};

// PUT /api/finance-users/:id
const updateFinanceUser = async (req, res) => {
  const { name, email, phone, status, password } = req.body;

  const user = await User.findOne({ _id: req.params.id, role: 'finance' });
  if (!user) return res.status(404).json({ message: 'Finance user not found' });

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (phone !== undefined) user.phone = phone;
  if (status !== undefined) user.status = status;
  if (password) user.password = password;

  await user.save();

  res.json({
    user: { id: user._id, name: user.name, email: user.email, phone: user.phone, status: user.status, role: user.role },
  });
};

// DELETE /api/finance-users/:id
const deleteFinanceUser = async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id, role: 'finance' });
  if (!user) return res.status(404).json({ message: 'Finance user not found' });
  res.json({ message: 'Finance user removed successfully' });
};

module.exports = { getFinanceUsers, createFinanceUser, updateFinanceUser, deleteFinanceUser };
