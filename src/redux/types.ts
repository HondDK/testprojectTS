
export interface FormPageState {
    student_examId: string;
    id: string;
    user: string;
    isDisabled: boolean,
}

export interface RootState {
    formPage: FormPageState;
    // Добавьте типы для других редьюсеров, если есть
}


