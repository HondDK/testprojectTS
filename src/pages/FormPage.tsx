import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  setIsDisabled,
  setStudent_examId,
  setUser,
} from "../redux/reducers/FormPageSlice";

const FormPage: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>(); // retrieve the UUID from the URL
  const dispatch = useAppDispatch();

  const { user, isDisabled } = useAppSelector((state) => state.formPage);

  useEffect(() => {
    localStorage.clear();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    dispatch(setUser(name));
    if (name.trim() === "") {
      dispatch(setIsDisabled(true));
    } else {
      dispatch(setIsDisabled(false));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user.trim() === "") {
      alert("Введите фамилию, имя и отчество");
      return;
    }
    console.log(user);
  }

  function startTest() {
    const article = {
      user_name: user,
      exam: uuid,
    };

    axios
      .post(
        "http://165.232.118.51:8000/edu_exams/exams/student_exams/",
        article
      )
      .then((response) => {
        dispatch(setStudent_examId(response.data.uuid));
        console.log(response.data.exam);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <header className="header_form">
        <h1>Заполните поле перед началом тестирования</h1>
      </header>
      <main className="form_page">
        <article>
          <form onSubmit={handleSubmit}>
            <label htmlFor="POST-name">Введите фамилию, имя и отчество</label>
            <input
              id="POST-name"
              type="text"
              name="name"
              value={user}
              onChange={handleChange}
            ></input>

            <NavLink to={isDisabled ? "#" : `/test_page/${uuid}`}>
              <button
                className="submit"
                onClick={startTest}
                disabled={isDisabled}
              >
                {isDisabled ? "Введите данные" : "Начать тестирование"}
              </button>
            </NavLink>
          </form>
        </article>
      </main>
    </>
  );
};

export default FormPage;
