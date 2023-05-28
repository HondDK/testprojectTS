import React, { useEffect } from "react";
import useFetchData from "../hooks/useFetchData";
import { Link } from "react-router-dom";
import type { IExam, IExamData } from "../models/IMainPage";

const MainPage: React.FC = () => {
    const data: IExamData[] = useFetchData(
        "http://165.232.118.51:8000/edu_exams/exams/exams/"
    );

    useEffect(() => {
        localStorage.clear();
    }, []);

    if (!data) {
        return <div>Загрузка...</div>;
    }

    const examData = data[0];

    return (
        <div>
            <h1>Все созданные тесты {examData.count}</h1>
            <main>
                <div className="main_card_test">
                    {examData &&
                        examData.results &&
                        examData.results.map((item: IExam) => (
                            <div key={item.uuid}>
                                <Link to={`/form/${item.uuid}`}>
                                    <span>{item.name}</span>
                                    <p>
                                        Предмет: <span>{item.subject}</span>
                                    </p>
                                    <p>
                                        Учебное заведение: <span>{item.school}</span>
                                    </p>
                                </Link>
                            </div>
                        ))}
                </div>
            </main>
        </div>
    );
};

export default MainPage;