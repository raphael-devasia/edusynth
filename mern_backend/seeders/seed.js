require('dotenv').config();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Import models
const User = require('../models/User');
const Role = require('../models/Role');
const Class = require('../models/Class');
const Section = require('../models/Section');
const Student = require('../models/Student');
const Staff = require('../models/Staff');
const Subject = require('../models/Subject');

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/smart_school_test?directConnection=true';

const seedDatabase = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });
    
    // Get the default connection
    const db = mongoose.connection;
    
    // When successfully connected
    db.on('connected', () => {
      console.log('Mongoose default connection open to ' + mongoUri);
    });
    
    // If the connection throws an error
    db.on('error', (err) => {
      console.error('Mongoose default connection error: ' + err);
    });
    
    // When the connection is disconnected
    db.on('disconnected', () => {
      console.log('Mongoose default connection disconnected');
    });
    
    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
      db.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
    
    // Wait for connection to be established
    await new Promise(resolve => db.once('open', resolve));
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Role.deleteMany({});
    await Class.deleteMany({});
    await Section.deleteMany({});
    await Student.deleteMany({});
    await Staff.deleteMany({});
    await Subject.deleteMany({});

    console.log('Cleared existing data');

    // 1. Create Roles
    console.log('Creating roles...');
    const adminRole = await Role.create({
      name: 'Admin',
      description: 'Administrator with full access',
      permissions: ['all'],
    });

    const teacherRole = await Role.create({
      name: 'Teacher',
      description: 'Teaching staff',
      permissions: ['manage_classes', 'manage_students', 'manage_attendance'],
    });

    const studentRole = await Role.create({
      name: 'Student',
      description: 'Student user',
      permissions: ['view_attendance', 'view_grades'],
    });

    // 2. Create Admin User
    console.log('Creating admin user...');
    const adminUser = await User.create({
      email: 'admin@smartschool.com',
      password: 'admin123',
      role: adminRole._id,
      name: 'Admin User',
      phone: '1234567890',
      status: 'active',
    });

    // 3. Create Classes
    console.log('Creating classes...');
    const classes = [];
    const classNames = ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    
    for (const className of classNames) {
      const newClass = await Class.create({
        name: className,
        numeric_name: parseInt(className) || 0,
        description: `Class ${className}`,
      });
      classes.push(newClass);
    }

    // 4. Create Sections for each class
    console.log('Creating sections...');
    const sections = [];
    const sectionNames = ['A', 'B', 'C'];
    
    for (const classObj of classes) {
      for (const sectionName of sectionNames) {
        const section = await Section.create({
          name: sectionName,
          class: classObj._id,
          capacity: 40,
        });
        sections.push(section);
      }
    }

    // 5. Create Teachers
    console.log('Creating teachers...');
    const teachers = [];
    const teacherNames = [
      'John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'Robert Wilson'
    ];
    
    for (let i = 0; i < teacherNames.length; i++) {
      const [firstName, lastName] = teacherNames[i].split(' ');
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@smartschool.com`;
      
      const teacherUser = await User.create({
        email,
        password: 'teacher123',
        role: teacherRole._id,
        name: teacherNames[i],
        phone: `98765432${i}0`,
        status: 'active',
      });

      const teacher = await Staff.create({
        user: teacherUser._id,
        employee_id: `T${1000 + i}`,
        joining_date: new Date(2023, 0, 1),
        qualification: 'M.Ed, B.Ed',
        experience: '5 years',
        designation: 'Senior Teacher',
        department: 'Academics',
        subjects: [],
      });
      
      teachers.push(teacher);
    }

    // 6. Create Subjects
    console.log('Creating subjects...');
    const subjects = [];
    const subjectNames = [
      'Mathematics', 'English', 'Science', 'Social Studies', 'Hindi', 
      'Computer Science', 'Physics', 'Chemistry', 'Biology', 'History', 
      'Geography', 'Economics', 'Business Studies', 'Accountancy', 'Physical Education'
    ];
    
    for (const subjectName of subjectNames) {
      const subject = await Subject.create({
        name: subjectName,
        code: subjectName.substring(0, 3).toUpperCase(),
        type: 'Theory',
        description: `${subjectName} subject`,
      });
      subjects.push(subject);
    }

    // 7. Create Students
    console.log('Creating students...');
    const firstNames = ['Aarav', 'Diya', 'Reyansh', 'Ananya', 'Vihaan', 'Anaya', 'Aditya', 'Ishaan', 'Aanya', 'Kavya'];
    const lastNames = ['Sharma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Verma', 'Yadav', 'Jain', 'Malhotra', 'Reddy'];
    
    for (let i = 0; i < 50; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@smartschool.com`;
      const classIndex = Math.floor(Math.random() * classes.length);
      const classSections = sections.filter(s => s.class.toString() === classes[classIndex]._id.toString());
      const section = classSections[Math.floor(Math.random() * classSections.length)];
      
      const studentUser = await User.create({
        email,
        password: 'student123',
        role: studentRole._id,
        name: `${firstName} ${lastName}`,
        phone: `98765${Math.floor(10000 + Math.random() * 90000)}`,
        status: 'active',
      });

      await Student.create({
        user: studentUser._id,
        admission_no: `STU${1000 + i}`,
        admission_date: new Date(2023, 0, 1),
        class: classes[classIndex]._id,
        section: section._id,
        first_name: firstName,
        last_name: lastName,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        dob: new Date(2010 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        father_name: `Mr. ${lastName}`,
        mother_name: `Mrs. ${lastName}`,
        address: `${Math.floor(100) + i} Street, City`,
        phone: `98765${Math.floor(10000 + Math.random() * 90000)}`,
        blood_group: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'][Math.floor(Math.random() * 8)],
        roll_number: i + 1,
      });
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
