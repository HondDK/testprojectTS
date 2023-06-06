import React, { useEffect, useState } from "react";
import shuffleAnswers from "../../func/shuffleAnswers";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  setAnswerId,
  setButtonDisabled,
  setSelectedAnswer,
} from "../../redux/reducers/QOneAnswerSlice";
import { RootState } from "../../redux/types";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IQOneAnswer } from "../../models/IQOneAnswer";

const QOneAnswer: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IQOneAnswer | null>(null);
  const { student_examId } = useAppSelector((state) => state.formPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://206.189.61.25:8000/edu_exams/exams/exams/${uuid}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [uuid]);

  const { selectedAnswer, buttonDisabled } = useAppSelector(
    (state: RootState) => state.qOneAnswer
  );

  function submit(index: number, question: any, text: string) {
    const article = {
      student_exam: student_examId,
      question: question.uuid,
      text: text,
    };
    try {
      axios
        .post(
          "http://206.189.61.25:8000/edu_exams/exams/ordinary_question_user_answers/",
          article
        )
        .then((response) => dispatch(setAnswerId(response.data.id)));

      const newButtonDisabled = [...buttonDisabled];
      newButtonDisabled[index] = true;
      dispatch(setButtonDisabled(newButtonDisabled));

      const newSelectedAnswer = [...selectedAnswer];
      newSelectedAnswer[index] = text;
      dispatch(setSelectedAnswer(newSelectedAnswer));
    } catch (err) {
      console.log(article);
    }
    console.log(article);
  }

  const [shuffledAnswers, setShuffledAnswers] = useState<any[]>([]);

  useEffect(() => {
    if (data && data.ordinary_questions && data.ordinary_questions.length > 0) {
      const shuffled = data.ordinary_questions.map((question: any) =>
        shuffleAnswers([...question.answers])
      );
      setShuffledAnswers(shuffled);
    }
  }, [data]);

  return (
    <>
      {data &&
        data.ordinary_questions &&
        data.ordinary_questions.length > 0 &&
        data.ordinary_questions.map((question: any, index: number) => {
          return (
            <section className="q_one_answer" key={question.uuid}>
              <p>{question.header}</p>
              <p className="QOneAnswerDescription">{question.description}</p>
              {question.files.map((file: any) => (
                <img
                  src={"http://165.232.118.51:8000/edu_exams/" + file.file}
                  alt=""
                  key={file.uuid}
                />
              ))}
              <div className="q_one_answer_btn">
                {shuffledAnswers[index] &&
                  shuffledAnswers[index].map((answer: any) => (
                    <button
                      className={
                        selectedAnswer[index] === answer.text ? "selected" : ""
                      }
                      disabled={buttonDisabled[index]}
                      key={answer.uuid}
                      onClick={() => submit(index, question, answer.text)}
                    >
                      <span>{answer.text}</span>
                    </button>
                  ))}
              </div>
            </section>
          );
        })}
    </>
  );
};

export default QOneAnswer;
