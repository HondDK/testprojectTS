export interface IQInputAnswerBetween {
  uuid: string;
  header: string;
  description: string;
  items: {
    text: string;
    text_end: string;
  }[];
}
