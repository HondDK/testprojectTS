import React from "react";
import useFetchData from "../hooks/useFetchData";
import { useAppSelector } from "../hooks/hooks";
import { IResultsTest } from "../models/IResultsTest";
import { IExam } from "../models/IExam";

const ResultsTest = () => {
  const { student_examId, user } = useAppSelector((state) => state.formPage);
  const { ex_name } = useAppSelector((state) => state.testPage);

  const { data, isLoading, error } = useFetchData(
    `http://test_web:8000/edu_exams/exams/student_exams/${student_examId}/results`
  );

  return (
    <>
      <h1>Результаты теста по {ex_name}</h1>
      <main className="test_results">
        <h1>{(user.middleName, user.lastName, user.firstName)}</h1>

        {data && (
          <div key={data.id}>
            <p>Набранные баллы: {data.points}</p>
            <p>Максимально возможное количество баллов: {data.max_points}</p>
            <p>
              Остаток времени: {data.hours_pass}:{data.minutes_pass}:
              {data.seconds_pass}
            </p>
          </div>
        )}
      </main>
    </>
  );
};

export default ResultsTest;
