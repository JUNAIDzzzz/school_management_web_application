require('dotenv').config();

const connectDB = require('../config/db');
const Class = require('../models/Class');
const Student = require('../models/Student');
const User = require('../models/User');
const FeeStructure = require('../models/FeeStructure');
const FeeRecord = require('../models/FeeRecord');

const FIRST_NAMES = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
  'Ananya', 'Diya', 'Saanvi', 'Aadhya', 'Kavya', 'Myra', 'Pari', 'Anika', 'Navya', 'Riya',
  'Kabir', 'Aryan', 'Dhruv', 'Rohan', 'Yash', 'Advait', 'Shaurya', 'Veer', 'Atharv', 'Kian',
  'Ira', 'Zara', 'Meera', 'Tara', 'Anaya', 'Avni', 'Ishita', 'Siya', 'Prisha', 'Aarohi',
  'Rudra', 'Vivan', 'Arnav', 'Dev', 'Karan', 'Neel', 'Om', 'Parth', 'Samar', 'Vedant',
];

const LAST_NAMES = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Kumar', 'Patel', 'Reddy', 'Nair', 'Iyer', 'Mehta'];

const CURRENT_YEAR = new Date().getFullYear();
const RECENT_MONTHS = FeeRecord.MONTHS.slice(0, new Date().getMonth() + 1);

const seed = async () => {
  await connectDB();
  console.log('Connected. Seeding database...');

  await Promise.all([
    Class.deleteMany({}),
    Student.deleteMany({}),
    User.deleteMany({}),
    FeeStructure.deleteMany({}),
    FeeRecord.deleteMany({}),
  ]);

  // 1. Classes 1-10
  const classes = await Class.insertMany(
    Array.from({ length: 10 }, (_, i) => ({ name: `Class ${i + 1}`, number: i + 1 }))
  );

  // 2. Fee structure: same default fees across all classes
  const feeStructureDocs = classes.flatMap((cls) => [
    { class: cls._id, studentType: 'Day Scholar', monthlyFee: 500 },
    { class: cls._id, studentType: 'Hostler', monthlyFee: 300 },
  ]);
  await FeeStructure.insertMany(feeStructureDocs);

  // 3. Admin + Finance users
  await User.create({
    name: process.env.ADMIN_NAME || 'School Administrator',
    email: process.env.ADMIN_EMAIL || 'admin@school.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'admin',
  });

  await User.create({
    name: process.env.FINANCE_NAME || 'Finance Officer',
    email: process.env.FINANCE_EMAIL || 'finance@school.com',
    password: process.env.FINANCE_PASSWORD || 'finance123',
    phone: '9876543210',
    role: 'finance',
  });

  // 4. 50 students spread across classes, mixed Day Scholar / Hostler
  const studentDocs = Array.from({ length: 50 }, (_, i) => {
    const cls = classes[i % classes.length];
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[i % LAST_NAMES.length];
    const studentType = i % 3 === 0 ? 'Hostler' : 'Day Scholar';

    return {
      name: `${first} ${last}`,
      admissionNumber: `ADM${String(1000 + i)}`,
      parentName: `${LAST_NAMES[(i + 3) % LAST_NAMES.length]} Family`,
      contactNumber: `98${String(10000000 + i * 137).slice(0, 8)}`,
      class: cls._id,
      studentType,
    };
  });
  const students = await Student.insertMany(studentDocs);

  // 5. Fee records for the months elapsed so far this year, ~70% marked Paid
  const structureMap = new Map(
    feeStructureDocs.map((fs) => [`${fs.class}_${fs.studentType}`, fs.monthlyFee])
  );

  const feeRecordDocs = [];
  students.forEach((student, studentIndex) => {
    RECENT_MONTHS.forEach((month, monthIndex) => {
      const amount = structureMap.get(`${student.class}_${student.studentType}`) || 0;
      const isPaid = (studentIndex + monthIndex) % 10 < 7; // ~70% paid

      feeRecordDocs.push({
        student: student._id,
        class: student.class,
        studentType: student.studentType,
        month,
        year: CURRENT_YEAR,
        amount,
        paymentStatus: isPaid ? 'Paid' : 'Unpaid',
        paymentDate: isPaid ? new Date(CURRENT_YEAR, monthIndex, 10 + (studentIndex % 15)) : null,
      });
    });
  });
  await FeeRecord.insertMany(feeRecordDocs);

  console.log('Seed complete:');
  console.log(`  Classes: ${classes.length}`);
  console.log(`  Students: ${students.length}`);
  console.log(`  Fee records: ${feeRecordDocs.length}`);
  console.log('  Admin login: admin@school.com / admin123');
  console.log('  Finance login: finance@school.com / finance123');

  process.exit(0);
};

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
