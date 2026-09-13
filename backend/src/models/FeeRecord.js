const mongoose = require('mongoose');

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const feeRecordSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    studentType: { type: String, enum: ['Day Scholar', 'Hostler'], required: true },
    month: { type: String, enum: MONTHS, required: true },
    year: { type: Number, required: true },
    amount: { type: Number, required: true, min: 0 },
    paymentStatus: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
    paymentDate: { type: Date, default: null },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

// A student can only have one fee record per month/year (business rule #6).
feeRecordSchema.index({ student: 1, month: 1, year: 1 }, { unique: true });

feeRecordSchema.statics.MONTHS = MONTHS;

module.exports = mongoose.model('FeeRecord', feeRecordSchema);
