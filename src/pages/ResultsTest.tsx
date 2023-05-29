import React from "react";
import useFetchData from "../hooks/useFetchData";
import { useAppSelector } from "../hooks/hooks";
import {  IResultsTest } from "../models/IResultsTest";

const ResultsTest = () => {
    const { student_examId, user } = useAppSelector((state) => state.formPage);
    const { ex_name } = useAppSelector((state) => state.testPage);

    const data: IResultsTest[] = useFetchData(
        `http://165.232.118.51:8000/edu_exams/exams/student_exams/${student_examId}/results`
    );

    console.log(data);

    return (
        <>
            <h1>Результаты теста по {ex_name}</h1>
            <main className="test_results">
                <h1>{user}</h1>
                {data.map((result, index) => (
                    <div key={index}>
                        <p>Набранные баллы: {result.points}</p>
                        <p>Максимально возможное количество баллов: {result.max_points}</p>
                        <p>
                            Остаток времени: {result.hours_pass}:{result.minutes_pass}:
                            {result.seconds_pass}
                        </p>
                    </div>
                ))}
            </main>
        </>
    );
};

export default ResultsTest;
