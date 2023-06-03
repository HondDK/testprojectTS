export interface IFormPageState {
  student_examId: string;
  id: string;
  user: { lastName: string; firstName: string; middleName: string };
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
  answerId: string;
  answer: string[];
  buttonDisabled: boolean[];
}
export interface IQInputBetweenAnswerState extends IQInputAnswerState {}

export interface RootState {
  formPage: IFormPageState;
  testPage: ITestPageState;
  timer: ITimerState;
  qOneAnswer: IQOneAnswerState;
  qInputAnswer: IQInputAnswerState;
  qInputBetweenAnswer: IQInputBetweenAnswerState;
}
