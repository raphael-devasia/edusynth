const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Staff = require('../models/Staff');
const Department = require('../models/Department');
const Designation = require('../models/Designation');

describe('Staff API integration', () => {
  let createdStaffId;
  let testDepartmentId;
  let testDesignationId;

  beforeAll(async () => {
    // Create test dependencies
    const testDepartment = new Department({
      department_name: 'Test Department',
      is_active: 'yes'
    });
    const savedDepartment = await testDepartment.save();
    testDepartmentId = savedDepartment._id;

    const testDesignation = new Designation({
      designation: 'Test Teacher',
      is_active: 'yes'
    });
    const savedDesignation = await testDesignation.save();
    testDesignationId = savedDesignation._id;
  });

  afterAll(async () => {
    // Clean up test data
    if (createdStaffId) {
      await Staff.findByIdAndDelete(createdStaffId);
    }
    if (testDepartmentId) await Department.findByIdAndDelete(testDepartmentId);
    if (testDesignationId) await Designation.findByIdAndDelete(testDesignationId);
    await mongoose.connection.close();
  });

  it('should create a new staff member', async () => {
    const res = await request(app)
      .post('/api/staff')
      .send({
        employee_id: 'EMP001',
        department: testDepartmentId,
        designation: testDesignationId,
        qualification: 'M.Ed',
        work_exp: '5 years',
        name: 'Jane Smith',
        surname: 'Smith',
        father_name: 'Robert Smith',
        mother_name: 'Mary Smith',
        contact_no: '9876543210',
        emergency_contact_no: '9876543211',
        email: 'jane.smith@school.com',
        dob: '1985-03-15',
        marital_status: 'married',
        date_of_joining: '2020-06-01',
        date_of_leaving: null,
        local_address: '456 Staff Colony',
        permanent_address: '456 Staff Colony',
        note: 'Test staff member',
        image: '',
        password: 'password123',
        gender: 'female',
        account_title: 'Jane Smith',
        bank_account_no: '9876543210',
        bank_name: 'Test Bank',
        ifsc_code: 'TEST0002',
        bank_branch: 'Main Branch',
        payscale: '15000-25000',
        basic_salary: 20000,
        epf_no: 'EPF001',
        contract_type: 'permanent',
        shift: 'morning',
        location: 'main_campus',
        facebook: '',
        twitter: '',
        linkedin: '',
        instagram: '',
        resume: '',
        joining_letter: '',
        resignation_letter: '',
        other_document_name: '',
        other_document_file: '',
        user_id: null,
        is_active: true,
        verification_code: '',
        disable_at: null
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Jane Smith');
    createdStaffId = res.body._id;
  });

  it('should get all staff members', async () => {
    const res = await request(app).get('/api/staff');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update the created staff member', async () => {
    const res = await request(app)
      .put(`/api/staff/${createdStaffId}`)
      .send({ 
        name: 'Updated Jane Smith',
        note: 'Updated test staff member'
      });
    expect([200, 204]).toContain(res.statusCode);
  });

  it('should delete the created staff member', async () => {
    const res = await request(app).delete(`/api/staff/${createdStaffId}`);
    expect([200, 204]).toContain(res.statusCode);
    createdStaffId = null;
  });
});
