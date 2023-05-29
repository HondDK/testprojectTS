import React from "react";
import axios from "axios";
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";

import {
  setAnswer,
  setAnswerId,
  setButtonDisabled,
} from "../../redux/reducers/QInputAnswerSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IQInputAnswerBetween } from "../../models/IQInputAnswerBetween";

const QInputBetweenAnswer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { uuid } = useParams<string>();
  const { answerId, answer, buttonDisabled } = useAppSelector(
    (state) => state.qInputAnswer
  );
  const { student_examId } = useAppSelector((state) => state.formPage);

  const { data, isLoading, error } = useFetchData(
    `http://165.232.118.51:8000/edu_exams/exams/exams/${uuid}`
  );

  function submit(index: number, question: any) {
    console.log(question.uuid);
    const article = {
      student_exam: student_examId,
      question: question.uuid,
      text: answer,
    };
    axios
      .post(
        "http://165.232.118.51:8000/edu_exams/exams/original_question_between_user_answers/",
        article
      )
      .then((response) => {
        dispatch(setAnswerId(response.data.id));
        const newButtonDisabled = [...buttonDisabled];
        newButtonDisabled[index] = true;
        dispatch(setButtonDisabled(newButtonDisabled));
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(article);
  }

  return (
    <>
      {data &&
        data.original_between_questions.map((item, index) => (
          <section className="q_input_answer">
            <p>{item.header}</p>
            <span className="description">{item.description}</span>
            <div className="q_between_input_answer_block">
              {item.items.map((items) => (
                <>
                  <span className="text">{items.text}</span>
                  <input
                    onChange={(e) => dispatch(setAnswer(e.target.value))}
                    value={answer[answerId]}
                  />
                  <span className="text">{items.text_end}</span>
                  <button
                    disabled={buttonDisabled[index]}
                    onClick={() => submit(index, item)}
                  >
                    Готово
                  </button>
                </>
              ))}
            </div>
          </section>
        ))}
    </>
  );
};

export default QInputBetweenAnswer;
