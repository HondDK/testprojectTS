import React from "react";
import axios from "axios";
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";

import {
  setAnswer,
  setAnswerId,
  setButtonDisabled,
} from "../../redux/reducers/QInputAnswerBetweenSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const QInputBetweenAnswer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { uuid } = useParams<string>();
  const { answerId, answer, buttonDisabled } = useAppSelector(
    (state) => state.qInputBetweenAnswer
  );
  const { student_examId } = useAppSelector((state) => state.formPage);

  const { data } = useFetchData(
    `http://206.189.61.25:8000/edu_exams/exams/exams/${uuid}`
  );

  function submit(index: number, question: any) {
    const article = {
      student_exam: student_examId,
      item: question.uuid,
      text: answer[index] || "",
    };
    axios
      .post(
        "http://206.189.61.25:8000/edu_exams/exams/original_question_between_user_answers/",
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
  const url = "http://206.189.61.25:8000/edu_exams/"
  return (
    <>
      {data &&
        data.original_between_questions.map((item, index) => (
          <section className="q_input_answer">
            <p>{item.header}</p>
            <span className="description">{item.description}</span>
            <img src={item.files && item.files[0] && url + item.files[0].file} alt="картинка" />

            <div className="q_between_input_answer_block">
              {item.items.map((items) => (
                <>
                  <span className="text">{items.text}</span>
                  <input
                    onChange={(e) =>
                      dispatch(
                        setAnswer({ answerId: index, answer: e.target.value })
                      )
                    }
                    value={answer[index] || ""}
                  />
                  <span className="text">{items.text_end}</span>
                  <button
                    disabled={buttonDisabled[index]}
                    onClick={() => submit(index, items)}
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
