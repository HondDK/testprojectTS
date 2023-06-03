import { IExam } from "./IExam";

export interface IApiResponse {
  id: number;
  uuid: string;
  name: string;
  hours_to_pass: number;
  minutes_to_pass: number;
  seconds_to_pass: number;
  description: string;
  subject: string;
  school: string;
  points: number;
  max_points: number;
  hours_pass: number;
  minutes_pass: number;
  seconds_pass: number;

  items: IExam[];
  original_questions: IExam[];
  results: IExam[];
  original_between_questions: IExam[];
}
