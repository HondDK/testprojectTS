export interface IFormPageState {
  student_examId: string;
  id: string;
  user: string;
  isDisabled: boolean;
}

export interface ITestPageState {
  ex_name: string;
}

export interface ITimerState {
  hoursToPass: number;
  minutesToPass: number;
  secondsToPass: number;
  initialDataLoaded: boolean;
}

export interface IQOneAnswerState {
  answerId: string;
  answer: string;
  selectedAnswer: string[];
  buttonDisabled: boolean[];
}

export interface IQInputAnswerState {
  answerId: number;
  answer: string;
  buttonDisabled: boolean[];
}

export interface RootState {
  formPage: IFormPageState;
  testPage: ITestPageState;
  timer: ITimerState;
  qOneAnswer: IQOneAnswerState;
  qInputAnswer: IQInputAnswerState;
}

