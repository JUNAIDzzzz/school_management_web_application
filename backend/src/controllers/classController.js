const Class = require('../models/Class');

// GET /api/classes
const getClasses = async (req, res) => {
  const classes = await Class.find().sort({ number: 1 });
  res.json({ classes });
};

module.exports = { getClasses };
