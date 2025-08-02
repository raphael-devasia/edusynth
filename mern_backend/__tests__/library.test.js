const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Book = require('../models/Book');
const BookIssue = require('../models/BookIssue');
const Student = require('../models/Student');
const Class = require('../models/Class');
const Section = require('../models/Section');
const Session = require('../models/Session');

describe('Library API integration', () => {
  let createdBookId;
  let createdBookIssueId;
  let testStudentId;
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
      name: 'Test Class 9'
    });
    const savedClass = await testClass.save();
    testClassId = savedClass._id;

    const testSection = new Section({
      name: 'A',
      class_id: testClassId
    });
    const savedSection = await testSection.save();
    testSectionId = savedSection._id;

    // Create minimal test student
    const testStudent = new Student({
      admission_no: 'LIB001',
      roll_no: '1',
      admission_date: '2024-01-15',
      firstname: 'Library',
      lastname: 'Student',
      rte: 'No',
      mobileno: '1234567890',
      email: 'library.student@test.com',
      dob: '2010-05-15',
      current_address: '123 Library Street',
      permanent_address: '123 Library Street',
      guardian_is: 'father',
      father_name: 'Father Name',
      father_phone: '9876543210',
      is_active: 'yes',
      class_id: testClassId,
      section_id: testSectionId,
      session_id: testSessionId
    });
    const savedStudent = await testStudent.save();
    testStudentId = savedStudent._id;
  });

  afterAll(async () => {
    // Clean up test data
    if (createdBookIssueId) await BookIssue.findByIdAndDelete(createdBookIssueId);
    if (createdBookId) await Book.findByIdAndDelete(createdBookId);
    if (testStudentId) await Student.findByIdAndDelete(testStudentId);
    if (testSectionId) await Section.findByIdAndDelete(testSectionId);
    if (testClassId) await Class.findByIdAndDelete(testClassId);
    if (testSessionId) await Session.findByIdAndDelete(testSessionId);
    await mongoose.connection.close();
  });

  describe('Book API', () => {
    it('should create a new book', async () => {
      const res = await request(app)
        .post('/api/books')
        .send({
          book_title: 'Test Mathematics Book',
          book_no: 'MATH001',
          isbn_no: '978-0123456789',
          subject: 'Mathematics',
          rack_no: 'A1',
          publish: 'Test Publisher',
          author: 'Test Author',
          qty: 10,
          perunitcost: 500,
          postdate: '2024-01-15',
          description: 'Test mathematics book for library',
          available: 'yes',
          is_active: 'yes'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.book_title).toBe('Test Mathematics Book');
      createdBookId = res.body._id;
    });

    it('should get all books', async () => {
      const res = await request(app).get('/api/books');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should update the created book', async () => {
      const res = await request(app)
        .put(`/api/books/${createdBookId}`)
        .send({ book_title: 'Updated Mathematics Book' });
      expect([200, 204]).toContain(res.statusCode);
    });
  });

  describe('BookIssue API', () => {
    it('should create a new book issue', async () => {
      const res = await request(app)
        .post('/api/bookissues')
        .send({
          book_id: createdBookId,
          member_id: testStudentId,
          issue_date: '2024-01-20',
          due_date: '2024-02-20',
          is_returned: false,
          remarks: 'Test book issue'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.is_returned).toBe(false);
      createdBookIssueId = res.body._id;
    });

    it('should get all book issues', async () => {
      const res = await request(app).get('/api/bookissues');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should update the created book issue', async () => {
      const res = await request(app)
        .put(`/api/bookissues/${createdBookIssueId}`)
        .send({ return_date: '2024-01-25', is_returned: true });
      expect([200, 204]).toContain(res.statusCode);
    });
  });
});
