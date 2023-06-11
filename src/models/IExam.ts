export interface IExam {
  id: number;
  uuid: string;
  name: string;
  files: { file: string }[];
  subject: string;
  school: string;
  points: number;
  max_points: number;
  hours_pass: number;
  minutes_pass: number;
  seconds_pass: number;
  header: string;
  description: string;
  items: any[];
  original_questions: any[];
  original_between_questions: any[];
}
