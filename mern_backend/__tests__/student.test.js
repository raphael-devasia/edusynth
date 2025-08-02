const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Student = require('../models/Student');
const Class = require('../models/Class');
const Section = require('../models/Section');
const Session = require('../models/Session');

describe('Student API integration', () => {
  let createdStudentId;
  let testClassId;
  let testSectionId;
  let testSessionId;

  beforeAll(async () => {
    // Create test dependencies
    const testSession = new Session({
      name: '2024-2025',
      is_active: true
    });
    const savedSession = await testSession.save();
    testSessionId = savedSession._id;

    const testClass = new Class({
      name: 'Test Class 10'
    });
    const savedClass = await testClass.save();
    testClassId = savedClass._id;

    const testSection = new Section({
      name: 'A',
      class_id: testClassId
    });
    const savedSection = await testSection.save();
    testSectionId = savedSection._id;
  });

  afterAll(async () => {
    // Clean up test data
    if (createdStudentId) {
      await Student.findByIdAndDelete(createdStudentId);
    }
    if (testSectionId) await Section.findByIdAndDelete(testSectionId);
    if (testClassId) await Class.findByIdAndDelete(testClassId);
    if (testSessionId) await Session.findByIdAndDelete(testSessionId);
    await mongoose.connection.close();
  });

  it('should create a new student', async () => {
    const res = await request(app)
      .post('/api/students')
      .send({
        admission_no: 'TEST001',
        roll_no: '1',
        admission_date: '2024-01-15',
        firstname: 'John',
        lastname: 'Doe',
        rte: 'No',
        image: '',
        mobileno: '1234567890',
        email: 'john.doe@test.com',
        state: 'Test State',
        city: 'Test City',
        pincode: '123456',
        religion: 'Test Religion',
        cast: 'Test Cast',
        dob: '2010-05-15',
        current_address: '123 Test Street',
        permanent_address: '123 Test Street',
        category_id: null,
        route_id: null,
        school_house_id: null,
        blood_group: 'O+',
        vehroute_id: null,
        hostel_room_id: null,
        adhar_no: '123456789012',
        samagra_id: '123456789',
        bank_account_no: '1234567890',
        bank_name: 'Test Bank',
        ifsc_code: 'TEST0001',
        guardian_is: 'father',
        father_name: 'John Sr.',
        father_phone: '9876543210',
        father_occupation: 'Engineer',
        mother_name: 'Jane Doe',
        mother_phone: '9876543211',
        mother_occupation: 'Teacher',
        guardian_name: 'John Sr.',
        guardian_relation: 'Father',
        guardian_phone: '9876543210',
        guardian_occupation: 'Engineer',
        guardian_address: '123 Test Street',
        guardian_email: 'guardian@test.com',
        father_pic: '',
        mother_pic: '',
        guardian_pic: '',
        is_active: 'yes',
        previous_school: 'Test Previous School',
        height: '150',
        weight: '45',
        measurement_date: '2024-01-15',
        dis_reason: '',
        note: 'Test student for integration testing',
        dis_note: '',
        app_key: '',
        parent_app_key: '',
        disable_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        class_id: testClassId,
        section_id: testSectionId,
        session_id: testSessionId
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.firstname).toBe('John');
    expect(res.body.lastname).toBe('Doe');
    createdStudentId = res.body._id;
  });

  it('should get all students', async () => {
    const res = await request(app).get('/api/students');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update the created student', async () => {
    const res = await request(app)
      .put(`/api/students/${createdStudentId}`)
      .send({ 
        firstname: 'Updated John',
        note: 'Updated test student'
      });
    expect([200, 204]).toContain(res.statusCode);
  });

  it('should delete the created student', async () => {
    const res = await request(app).delete(`/api/students/${createdStudentId}`);
    expect([200, 204]).toContain(res.statusCode);
    createdStudentId = null; // Prevent cleanup attempt
  });
});
