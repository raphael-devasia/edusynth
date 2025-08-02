const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Class = require('../models/Class');
const Section = require('../models/Section');

describe('Class and Section API integration', () => {
  let createdClassId;
  let createdSectionId;

  afterAll(async () => {
    // Clean up test data
    if (createdSectionId) await Section.findByIdAndDelete(createdSectionId);
    if (createdClassId) await Class.findByIdAndDelete(createdClassId);
    await mongoose.connection.close();
  });

  describe('Class API', () => {
    it('should create a new class', async () => {
      const res = await request(app)
        .post('/api/classes')
        .send({
          name: 'Grade 12'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Grade 12');
      createdClassId = res.body._id;
    });

    it('should get all classes', async () => {
      const res = await request(app).get('/api/classes');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should update the created class', async () => {
      const res = await request(app)
        .put(`/api/classes/${createdClassId}`)
        .send({ name: 'Updated Grade 12' });
      expect([200, 204]).toContain(res.statusCode);
    });
  });

  describe('Section API', () => {
    it('should create a new section', async () => {
      const res = await request(app)
        .post('/api/sections')
        .send({
          name: 'B',
          class_id: createdClassId
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('B');
      createdSectionId = res.body._id;
    });

    it('should get all sections', async () => {
      const res = await request(app).get('/api/sections');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should update the created section', async () => {
      const res = await request(app)
        .put(`/api/sections/${createdSectionId}`)
        .send({ name: 'Updated B' });
      expect([200, 204]).toContain(res.statusCode);
    });

    it('should delete the created section', async () => {
      const res = await request(app).delete(`/api/sections/${createdSectionId}`);
      expect([200, 204]).toContain(res.statusCode);
      createdSectionId = null;
    });
  });
});
