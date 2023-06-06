import React, { useEffect } from "react";
import useFetchData from "../hooks/useFetchData";
import { Link } from "react-router-dom";
import { IExam } from "../models/IExam";

const MainPage: React.FC = () => {
  const { data, isLoading, error } = useFetchData(
    "http://206.189.61.25:8000/edu_exams/exams/exams/"
  );

  useEffect(() => {
    localStorage.clear();
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <div className="custom-loader"></div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error}</div>;
  }

  if (!data || data.results.length === 0) {
    return <div>Нет доступных тестов</div>;
  }

  return (
    <div>
      <h1>Доступные к прохождению тесты: {data.results.length}</h1>
      <main>
        <div className="main_card_test">
          {data.results.map((item: IExam) => (
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
