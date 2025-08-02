const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Exam = require('../models/Exam');
const ExamGroup = require('../models/ExamGroup');
const Session = require('../models/Session');

describe('Exam API integration', () => {
  let createdExamId;
  let createdExamGroupId;
  let testSessionId;

  beforeAll(async () => {
    // Create test session
    const testSession = new Session({
      name: '2024-2025',
      is_active: true
    });
    const savedSession = await testSession.save();
    testSessionId = savedSession._id;
  });

  afterAll(async () => {
    // Clean up test data
    if (createdExamId) await Exam.findByIdAndDelete(createdExamId);
    if (createdExamGroupId) await ExamGroup.findByIdAndDelete(createdExamGroupId);
    if (testSessionId) await Session.findByIdAndDelete(testSessionId);
    await mongoose.connection.close();
  });

  describe('ExamGroup API', () => {
    it('should create a new exam group', async () => {
      const res = await request(app)
        .post('/api/examgroups')
        .send({
          name: 'Mid Term Exams',
          exam_type: 'Mid Term',
          description: 'Mid term examination for all classes'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Mid Term Exams');
      createdExamGroupId = res.body._id;
    });

    it('should get all exam groups', async () => {
      const res = await request(app).get('/api/examgroups');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('Exam API', () => {
    it('should create a new exam', async () => {
      const res = await request(app)
        .post('/api/exams')
        .send({
          name: 'Mathematics Mid Term',
          exam_group_id: createdExamGroupId,
          session_id: testSessionId,
          note: 'Mathematics examination for mid term'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Mathematics Mid Term');
      createdExamId = res.body._id;
    });

    it('should get all exams', async () => {
      const res = await request(app).get('/api/exams');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should update the created exam', async () => {
      const res = await request(app)
        .put(`/api/exams/${createdExamId}`)
        .send({ name: 'Updated Mathematics Mid Term' });
      expect([200, 204]).toContain(res.statusCode);
    });

    it('should delete the created exam', async () => {
      const res = await request(app).delete(`/api/exams/${createdExamId}`);
      expect([200, 204]).toContain(res.statusCode);
      createdExamId = null;
    });
  });
});
