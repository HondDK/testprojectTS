import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";
import Timer from "../components/testPage/Timer";
import QOneAnswer from "../components/testPage/QOneAnswer";
import QInputAnswer from "../components/testPage/QInputAnswer";
import QInputBetweenAnswer from "../components/testPage/QInputBetweenAnswer";
import { useAppDispatch } from "../hooks/hooks";
import { setStudent_examId } from "../redux/reducers/FormPageSlice";
import useFetchData from "../hooks/useFetchData";

const TestPage: React.FC = () => {
  const { uuid } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useFetchData(
    `http://165.232.118.51:8000/edu_exams/exams/exams/${uuid}`
  );
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 3500 },
  });

  const fadeBTN = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 5000 },
  });

  useEffect(() => {
    if (data) {
      //dispatch(setStudent_examId(data.name));
    }
  }, [data]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error}</div>;
  }
  const timerData = data || {
    hours_to_pass: 0,
    minutes_to_pass: 0,
    seconds_to_pass: 0,
    uuid: "",
  };
  return (
    <div>
      <animated.div style={fadeIn}>
        <header>
          {data && <h1>{data.name}</h1>}
          <div className="timer">
            <Timer data={timerData} />
          </div>
        </header>
      </animated.div>
      <animated.div style={fadeIn}>
        <main>
          <QOneAnswer />
          <QInputAnswer />
          <QInputBetweenAnswer />
          <animated.div style={fadeBTN}>
            <Link to={`/results_test/${uuid}`} replace={true}>
              <button className="CloseTest">
                <span>Завершить тест</span>
              </button>
            </Link>
          </animated.div>
        </main>
      </animated.div>
    </div>
  );
};

export default TestPage;
