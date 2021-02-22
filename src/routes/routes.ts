import express, { Request, Response, Router } from 'express';
import { Insert, Find, Delete } from '../lib/dataJson';
import ClinicTime from '../models/clinictime';
import conflictTime, { validateArguments } from '../utils/utils';

const router: Router = express.Router();

router.post('/', (request: Request, response: Response) => {
  const { body } = request;
  const { date, weekday, everyday } = body;
  const validateArg = validateArguments(date, weekday, everyday);
  if (validateArg.validate) {
    response.send({
      message: validateArg.message,
    });
    return;
  }
  const conflict = conflictTime(body);
  if (conflict) {
    response.send({ message: 'time already registered' });
    return;
  }
  const res: ClinicTime = Insert(body);
  response.send(res);
});

router.get('/:startdate?/:enddate?', (request: Request, response: Response) => {
  const { startdate, enddate } = request.query;
  if (startdate !== undefined && enddate !== undefined) {
    const data = Find(startdate.toString(), enddate.toString());
    response.send(data);
    return;
  }
  const data = Find();
  response.send(data);
});

router.delete('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  const res: boolean = Delete(parseInt(id));
  if (res) {
    response.sendStatus(400);
    return;
  }
  response.sendStatus(200);
});

export default router;
