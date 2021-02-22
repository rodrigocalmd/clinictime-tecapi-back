import fs from 'fs';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ClinicTime from '../models/clinictime';
import {
  getDatesBetweenDates, setID, getLast, resultFind,
} from './utils';

dayjs.extend(customParseFormat);

export function Insert(data: ClinicTime): ClinicTime {
  const datas = fs.readFileSync(`${process.env.DATAJSON}`, 'utf8');
  const parseJson = JSON.parse(datas);
  const newID: number = setID(parseJson);
  const newData: ClinicTime = {
    id: newID,
    date: data.date,
    start: data.start,
    end: data.end,
    everyday: data.everyday,
    weekday: data.weekday,
  };
  parseJson.push(newData);
  fs.writeFileSync(`${process.env.DATAJSON}`, JSON.stringify(parseJson, null, 2));
  return getLast(parseJson);
}

export function Find(startDate?: string, endDate?: string): Array<Object> {
  const data = fs.readFileSync(`${process.env.DATAJSON}`, 'utf8');
  const parseJson = JSON.parse(data);
  if (startDate !== undefined && endDate !== undefined) {
    const dates = getDatesBetweenDates(startDate, endDate);
    const filterByDate = dates.map((date: string) => resultFind(date, parseJson));
    return filterByDate;
  }
  return parseJson;
}

export function FindByID(id: number): Array<ClinicTime> {
  const data = fs.readFileSync(`${process.env.DATAJSON}`, 'utf8');
  const parseJson = JSON.parse(data);
  const response: Array<ClinicTime> = parseJson.filter((e: ClinicTime) => e.id === id);
  return response;
}

export function Delete(id: number): boolean {
  const data = fs.readFileSync(`${process.env.DATAJSON}`, 'utf8');
  const parseJson = JSON.parse(data);
  const newBase = parseJson.filter((elem: any) => elem.id !== id);
  fs.writeFileSync(`${process.env.DATAJSON}`, JSON.stringify(newBase, null, 2));
  const check = FindByID(id);
  return check.length > 0;
}
