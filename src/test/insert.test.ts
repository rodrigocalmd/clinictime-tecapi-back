import request from 'supertest';
import ClinicTime from '../models/clinictime';
import { createDJTestTmp, deleteDJTestTmp } from './setupTest';
import app from '../app';

describe('New records insertion test', () => {
  beforeAll(() => createDJTestTmp());
  afterAll(() => deleteDJTestTmp());
  test('Must insert a new record!', async () => {
    const dataTest: ClinicTime = {
      date: '21-02-2021',
      start: '08:30',
      end: '09:00',
    };
    const res = await request(app)
      .post('/')
      .send(dataTest);

    expect(res.body.id).toEqual(17);
    expect(res.body.date).toEqual('21-02-2021');
  });
  test('Do not insert date, weekday or everyday!', async () => {
    const dataTest: ClinicTime = {
      start: '08:30',
      end: '09:00',
    };
    const res = await request(app)
      .post('/')
      .send(dataTest);

    expect(res.body.message).toEqual('missing argument');
  });
  test('Inserting more than one argument between date, weekday and everyday', async () => {
    const dataTest: ClinicTime = {
      weekday: 3,
      everyday: true,
      start: '08:30',
      end: '09:00',
    };
    const res = await request(app)
      .post('/')
      .send(dataTest);

    expect(res.body.message).toEqual('only one argument must be passed between date, weekday, everyday');
  });
  test('Insert time and date already registered', async () => {
    const dataTest: ClinicTime = {
      date: '01-02-2021',
      start: '09:30',
      end: '10:00',
    };
    const res = await request(app)
      .post('/')
      .send(dataTest);

    expect(res.body.message).toEqual('time already registered');
  });
});
