const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const ItemCategory = require('../models/ItemCategory');

describe('Item API integration', () => {
  let createdItemId;
  let testCategoryId;

  beforeAll(async () => {
    // Create a test category for items
    const testCategory = new ItemCategory({
      item_category: 'Test Category',
      description: 'Test category for integration tests'
    });
    const savedCategory = await testCategory.save();
    testCategoryId = savedCategory._id;
  });

  afterAll(async () => {
    // Clean up test data
    if (testCategoryId) {
      await ItemCategory.findByIdAndDelete(testCategoryId);
    }
    await mongoose.connection.close();
  });

  it('should create a new item', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({
        name: 'Test Item',
        item_category_id: testCategoryId,
        description: 'A test item for integration tests.'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    createdItemId = res.body._id;
  });

  it('should get all items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update the created item', async () => {
    const res = await request(app)
      .put(`/api/items/${createdItemId}`)
      .send({ name: 'Updated Test Item' });
    expect([200, 204]).toContain(res.statusCode);
  });

  it('should delete the created item', async () => {
    const res = await request(app).delete(`/api/items/${createdItemId}`);
    expect([200, 204]).toContain(res.statusCode);
  });
});
