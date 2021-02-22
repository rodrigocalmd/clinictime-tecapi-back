import dayjs from 'dayjs';
import { Find } from '../lib/dataJson';
import ClinicTime from '../models/clinictime';

export default function conflictTime(data: ClinicTime): boolean {
  const alldata = Find();
  const conflict = alldata.filter((e: any) => (e.date === data.date
    && e.start === data.start)
  || (e.everyday && e.start === data.start)
  || (e.weekday === dayjs(data.date, 'DD-MM-YYYY').day() && e.start === data.start));

  if (conflict.length > 0) {
    return true;
  }
  return false;
}

export function validateArguments(date: string, weekday: number, everyday: boolean): any {
  const args = [date, weekday, everyday];
  const res = args.filter((v: any) => v !== undefined);
  if (res.length === 0) {
    return {
      validate: true,
      message: 'missing argument',
    };
  }
  if (res.length > 1) {
    return {
      validate: true,
      message: 'only one argument must be passed between date, weekday, everyday',
    };
  }
  return { validate: false };
}
