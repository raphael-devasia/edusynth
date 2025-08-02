const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Debug logging
    console.log('Login attempt:', { username, password: password ? '***' : 'undefined' });
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // For now, create a simple test user if it doesn't exist
    let user = await User.findOne({ username: username });
    
    if (!user) {
      // Check if test student already exists
      let testStudent = await Student.findOne({ admission_no: 'TEST001' });
      
      if (!testStudent) {
        // Create a test student first
        testStudent = new Student({
          admission_no: 'TEST001',
          roll_no: '1',
          admission_date: new Date(),
          firstname: 'Test',
          lastname: 'Admin',
          rte: 'No',
          image: '',
          mobileno: '1234567890',
          email: username,
          state: 'Test State',
          city: 'Test City',
          pincode: '123456',
          religion: 'Test Religion',
          cast: 'Test Cast',
          dob: new Date('1990-01-01'),
          current_address: 'Test Address',
          permanent_address: 'Test Address',
          category_id: null,
          adhar_no: '123456789012',
          samagra_id: '123456789',
          bank_account_no: '1234567890',
          bank_name: 'Test Bank',
          ifsc_code: 'TEST0001',
          guardian_name: 'Test Guardian',
          guardian_relation: 'Father',
          guardian_phone: '1234567890',
          guardian_address: 'Test Address',
          is_active: 'yes',
          created_at: new Date(),
          updated_at: new Date()
        });
        
        await testStudent.save();
      }

      // Create test user with proper username field
      const hashedPassword = await bcrypt.hash(password, 10);
      
      console.log('Creating user with:', { 
        user_id: testStudent._id, 
        username: username, 
        role: 'admin', 
        is_active: 'yes' 
      });
      
      user = new User({
        user_id: testStudent._id,
        username: username, // Ensure username is properly set
        password: hashedPassword,
        role: 'admin',
        is_active: 'yes'
      });
      
      await user.save();
      console.log('User created successfully:', user.username);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        isActive: user.is_active === 'yes'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
