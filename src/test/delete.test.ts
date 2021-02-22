import request from 'supertest';
import { createDJTestTmp, deleteDJTestTmp } from './setupTest';
import app from '../app';

describe('Test to delete records', () => {
  beforeAll(() => createDJTestTmp());
  afterAll(() => deleteDJTestTmp());
  test('Must delete a record from an id', async () => {
    await request(app).del('/13').expect(200);
  });
});
