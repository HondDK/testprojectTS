
export interface FormPageState {
    student_examId: string;
    id: string;
    user: string;
    isDisabled: boolean,
}
export interface TestPageState{
    ex_name: string,
}

export interface RootState {
    formPage: FormPageState;
    testPage: TestPageState;
    // Добавьте типы для других редьюсеров, если есть
}

