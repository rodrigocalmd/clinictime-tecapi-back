import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ClinicTime from '../models/clinictime';

dayjs.extend(customParseFormat);

interface ResultFind {
  date: string;
  intervals: Array<Object>;
}

function isWeekend(date: string | undefined): boolean {
  return dayjs(date, 'DD-MM-YYYY').day() === 0 || dayjs(date, 'DD-MM-YYYY').day() === 6;
}

export function getDatesBetweenDates(startDate: string, endDate: string) {
  const dates = [];
  let theDate = dayjs(startDate, 'DD-MM-YYYY');
  const theFinalDate = dayjs(endDate, 'DD-MM-YYYY');
  dates.push(theDate.format('DD-MM-YYYY'));
  while (theDate < theFinalDate) {
    const incrementDay = theDate.add(1, 'day');
    dates.push(incrementDay.format('DD-MM-YYYY'));
    theDate = incrementDay;
  }
  return dates.filter((t) => !isWeekend(t));
}

export function setID(obj: any): number {
  if (obj.length === 0) {
    return 1;
  }
  const last = obj[obj.length - 1];
  return last.id + 1;
}

export function getIntervals(date: string, arrayElements: Array<ClinicTime>): Array<Object> {
  const intervals = arrayElements.filter((elem: any) => (elem.date === date || elem.everyday !== undefined || elem.weekday === dayjs(date, 'DD-MM-YYYY').day())).map((elemn: any) => ({
    start: elemn.start,
    end: elemn.end,
  }));
  return intervals;
}

export function getLast(arr: Array<ClinicTime>): ClinicTime {
  return arr[arr.length - 1];
}

export function resultFind(date: string, dataJson: Array<ClinicTime>): ResultFind {
  const intervals = getIntervals(date, dataJson);
  const resInteration: ResultFind = {
    date,
    intervals,
  };
  return resInteration;
}
