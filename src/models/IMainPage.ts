export interface IExam {
    uuid: string;
    name: string;
    subject: string;
    school: string;
}

export interface IExamData {
    count: number;
    results: IExam[];
}