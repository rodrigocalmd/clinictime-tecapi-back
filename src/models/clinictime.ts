interface ClinicTime {
  id?: number;
  date?: string;
  start: string;
  end: string;
  everyday?: boolean;
  weekday?: number;
}

export default ClinicTime;
