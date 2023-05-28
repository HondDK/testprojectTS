import React, { useEffect, useState } from "react";

import Timer from "../components/testPage/Timer";
import QOneAnswer from "../components/testPage/QOneAnswer";
import useFetchData from "../hooks/useFetchData";
import QInputAnswer from "../components/testPage/QInputAnswer";
import QComparisonQuestions from "../components/testPage/QComparisonQuestions";
import { Link, useParams } from "react-router-dom";
import HeaderLoader from "../components/UI/loaders/HeaderLoader";
import MainLoader from "../components/UI/loaders/MainLoader";
import { useSpring, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import QInputBetweenAnswer from "../components/testPage/QInputBetweenAnswer";
import { setStudent_examId } from "../components/redux/reducers/testPageReduсer";

const TestPage = () => {
    const { uuid } = useParams();
    const dispatch = useDispatch();

    const data  = useFetchData(
        `http://165.232.118.51:8000/edu_exams/exams/exams/${uuid}`
    );

    const [loading, setLoading] = useState(true);

    const { id, student_examId } = useSelector((state) => state.formPage);

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
            setLoading(false);
        }
    }, [data]);
    dispatch(setStudent_examId(data.name));
    return (
        <div>
            {loading ? (
                <div className="custom-loader"></div>
            ) : (
                <animated.div style={fadeIn}>
                    <header>
                        <h1>{data.name}</h1>
                        <div className="timer">
                            <div className="timer">
                                {data && /\d/.test(data.hours_to_pass) && <Timer data={data} />}
                            </div>
                        </div>
                    </header>
                </animated.div>
            )}
            {loading ? (
                <MainLoader />
            ) : (
                <>
                    <animated.div style={fadeIn}>
                        <main>
                            <QComparisonQuestions
                                exam={student_examId.uuid}
                            ></QComparisonQuestions>
                            <QOneAnswer exam={student_examId.uuid}></QOneAnswer>
                            <QInputAnswer exam={student_examId.uuid}></QInputAnswer>
                            <QInputBetweenAnswer
                                exam={student_examId.uuid}
                            ></QInputBetweenAnswer>
                            <animated.div style={fadeBTN}>
                                <Link to={`/results_test/${data.uuid}`} replace={true}>
                                    <button className="CloseTest">
                                        <span>Завершить тест</span>
                                    </button>
                                </Link>
                            </animated.div>
                        </main>
                    </animated.div>
                </>
            )}
        </div>
    );
};

export default TestPage;