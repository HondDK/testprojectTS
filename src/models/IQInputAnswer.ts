export interface IQInputAnswer {
  original_questions: {
    uuid: string;
    description: string;
    files: { file: string; uuid: string }[];
    answers: { text: string; uuid: string }[];
  };
  header: string;
  uuid: string;
  description: string;
}