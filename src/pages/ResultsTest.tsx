import React from "react";
import useFetchData from "../hooks/useFetchData";
import { useAppSelector } from "../hooks/hooks";
import { IResultsTest } from "../models/IResultsTest";
import { IExam } from "../models/IExam";

const ResultsTest = () => {
  const { student_examId, user } = useAppSelector((state) => state.formPage);
  const { ex_name } = useAppSelector((state) => state.testPage);

  const { data, isLoading, error } = useFetchData(
    `http://165.232.118.51:8000/edu_exams/exams/student_exams/${student_examId}/results`
  );
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error}</div>;
  }

  if (!data || data.results.length === 0) {
    return <div>Нет доступных тестов</div>;
  }

  return (
    <>
      <h1>Результаты теста по {ex_name}</h1>
      <main className="test_results">
        <h1>{user}</h1>
        {data.results.map((item: IExam) => (
          <div key={item.id}>
            <p>Набранные баллы: {item.points}</p>
            <p>Максимально возможное количество баллов: {item.max_points}</p>
            <p>
              Остаток времени: {item.hours_pass}:{item.minutes_pass}:
              {item.seconds_pass}
            </p>
          </div>
        ))}
      </main>
    </>
  );
};

export default ResultsTest;
