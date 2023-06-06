import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";
import Timer from "../components/testPage/Timer";
import QOneAnswer from "../components/testPage/QOneAnswer";
import QInputAnswer from "../components/testPage/QInputAnswer";
import QInputBetweenAnswer from "../components/testPage/QInputBetweenAnswer";
import useFetchData from "../hooks/useFetchData";
import {
  setHoursToPass,
  setInitialDataLoaded,
  setMinutesToPass,
  setSecondsToPass,
} from "../redux/reducers/TimerSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setEx_name } from "../redux/reducers/TestPageSlice";

const TestPage: React.FC = () => {
  const { uuid } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useFetchData(
    `http://206.189.61.25:8000/edu_exams/exams/exams/${uuid}`
  );
  const { initialDataLoaded } = useAppSelector((state) => state.timer);
  useEffect(() => {
    if (data && !initialDataLoaded) {
      dispatch(setHoursToPass(data.hours_to_pass));
      dispatch(setMinutesToPass(data.minutes_to_pass));
      dispatch(setSecondsToPass(data.seconds_to_pass));
      dispatch(setInitialDataLoaded(true));
      dispatch(setEx_name(data.name));
    }
  }, [data, dispatch]);

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

  if (isLoading) {
    return <div className="custom-loader"></div>;
  }

  if (error) {
    return <div>Произошла ошибка: {error}</div>;
  }

  return (
    <div>
      <animated.div style={fadeIn}>
        <header>
          {data && <h1>{data.name}</h1>}
          <div className="timer">
            <Timer />
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
