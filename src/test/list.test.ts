import request from 'supertest';
import { createDJTestTmp, deleteDJTestTmp } from './setupTest';
import app from '../app';

describe('Test to list records', () => {
  beforeAll(() => createDJTestTmp());
  afterAll(() => deleteDJTestTmp());
  test('Must list all records', async () => {
    const res = await request(app)
      .get('/');

    expect(res.body.length).toEqual(16);
  });
  test('Must list records between specific dates!', async () => {
    const res = await request(app)
      .get('/').query({ startdate: '03-02-2021', enddate: '10-02-2021' });

    expect(res.body.length).toEqual(6);
    expect(res.body[2].date).toEqual('05-02-2021');
    expect(res.body[2].intervals.length).toEqual(3);
    expect(res.body[2].intervals[2].start).toEqual('15:30');
  });
});
