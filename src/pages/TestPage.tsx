import React, { useEffect, useState } from "react";
import Timer from "../components/testPage/Timer";
import QOneAnswer from "../components/testPage/QOneAnswer";
import useFetchData from "../hooks/useFetchData";
import QInputAnswer from "../components/testPage/QInputAnswer";
import { Link, useParams } from "react-router-dom";
import MainLoader from "../components/UI/loaders/MainLoader";
import { useSpring, animated } from "@react-spring/web";
import QInputBetweenAnswer from "../components/testPage/QInputBetweenAnswer";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {setStudent_examId} from "../redux/reducers/FormPageSlice";
import {ITestPage} from "../models/ITestPage";

const TestPage: React.FC = () => {
    const { uuid  } = useParams();
    const dispatch = useAppDispatch();

    const data: ITestPage[]  = useFetchData(
        `http://165.232.118.51:8000/edu_exams/exams/exams/${uuid}`
    );

    const [loading, setLoading] = useState(true);

    const { id, student_examId } = useAppSelector((state) => state.formPage);

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
            dispatch(setStudent_examId(data[0].name));
        }
    }, [data]);


    return (
        <div>
            {loading ? (
                <div className="custom-loader"></div>
            ) : (
                <animated.div style={fadeIn}>
                    <header>
                        <h1>{data && data.map((item: ITestPage)=> (
                            item.name
                        )) }</h1>
                        <div className="timer">
                            <div className="timer">
                                {data &&
                                    data.map((item) => (
                                              <Timer data={item}/>
                                    ))}
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
                            <QOneAnswer exam={student_examId}></QOneAnswer>
                            <QInputAnswer exam={student_examId}></QInputAnswer>
                            <QInputBetweenAnswer
                                exam={student_examId}
                            ></QInputBetweenAnswer>
                            <animated.div style={fadeBTN}>
                                <Link to={`/results_test/${data[0].uuid}`} replace={true}>
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