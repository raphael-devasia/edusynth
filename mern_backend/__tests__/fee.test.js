const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const FeeCategory = require('../models/FeeCategory');
const FeeType = require('../models/FeeType');
const FeeGroup = require('../models/FeeGroup');

describe('Fee Management API integration', () => {
  let createdFeeCategoryId;
  let createdFeeTypeId;
  let createdFeeGroupId;

  afterAll(async () => {
    // Clean up test data
    if (createdFeeCategoryId) await FeeCategory.findByIdAndDelete(createdFeeCategoryId);
    if (createdFeeTypeId) await FeeType.findByIdAndDelete(createdFeeTypeId);
    if (createdFeeGroupId) await FeeGroup.findByIdAndDelete(createdFeeGroupId);
    await mongoose.connection.close();
  });

  describe('FeeCategory API', () => {
    it('should create a new fee category', async () => {
      const res = await request(app)
        .post('/api/feecategories')
        .send({
          name: 'Tuition Fee',
          description: 'Tuition fee category'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Tuition Fee');
      createdFeeCategoryId = res.body._id;
    });

    it('should get all fee categories', async () => {
      const res = await request(app).get('/api/feecategories');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should update the created fee category', async () => {
      const res = await request(app)
        .put(`/api/feecategories/${createdFeeCategoryId}`)
        .send({ name: 'Updated Tuition Fee' });
      expect([200, 204]).toContain(res.statusCode);
    });
  });

  describe('FeeType API', () => {
    it('should create a new fee type', async () => {
      const res = await request(app)
        .post('/api/feetypes')
        .send({
          type: 'Monthly Fee',
          feecategory_id: createdFeeCategoryId,
          code: 'MF001',
          description: 'Monthly fee type'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.type).toBe('Monthly Fee');
      createdFeeTypeId = res.body._id;
    });

    it('should get all fee types', async () => {
      const res = await request(app).get('/api/feetypes');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('FeeGroup API', () => {
    it('should create a new fee group', async () => {
      const res = await request(app)
        .post('/api/feegroups')
        .send({
          name: 'Class 10 Fees',
          is_active: 'yes'
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.name).toBe('Class 10 Fees');
      createdFeeGroupId = res.body._id;
    });

    it('should get all fee groups', async () => {
      const res = await request(app).get('/api/feegroups');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
