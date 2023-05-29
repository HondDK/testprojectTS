export interface IQOneAnswer {
  ordinary_questions: {
    uuid: string;
    description: string;
    files: { file: string; uuid: string }[];
    answers: { text: string; uuid: string }[];
  }[];
}