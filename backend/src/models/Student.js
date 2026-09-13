const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    admissionNumber: { type: String, required: true, unique: true, trim: true },
    parentName: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    studentType: { type: String, enum: ['Day Scholar', 'Hostler'], required: true },
  },
  { timestamps: true }
);

studentSchema.index({ name: 'text', admissionNumber: 'text' });

module.exports = mongoose.model('Student', studentSchema);
