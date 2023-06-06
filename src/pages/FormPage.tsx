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
    const { name, value } = e.target;
    dispatch(setUser({ ...user, [name]: value }));

    if (value.trim() === "") {
      dispatch(setIsDisabled(true));
    } else {
      dispatch(setIsDisabled(false));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      user.lastName.trim() === "" ||
      user.firstName.trim() === "" ||
      user.middleName.trim() === ""
    ) {
      alert("Введите фамилию, имя и отчество");
      return;
    }
    console.log(user);
  }

  function startTest() {
    const article = {
      user_name: `${user.lastName} ${user.firstName} ${user.middleName}`,
      exam: uuid,
    };

    axios
      .post("http://test_web:8000/edu_exams/exams/student_exams/", article)
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
        <h1>Заполните поля перед началом тестирования</h1>
      </header>
      <main className="form_page">
        <article>
          <form onSubmit={handleSubmit}>
            <label htmlFor="POST-lastName">Введите фамилию</label>
            <input
              id="POST-lastName"
              type="text"
              name="lastName"
              placeholder="Фамилия"
              value={user.lastName}
              onChange={handleChange}
            ></input>
            <label htmlFor="POST-firstName">Введите имя</label>
            <input
              id="POST-firstName"
              type="text"
              name="firstName"
              placeholder="Имя"
              value={user.firstName}
              onChange={handleChange}
            ></input>
            <label htmlFor="POST-middleName">Введите отчество</label>
            <input
              id="POST-middleName"
              type="text"
              placeholder="Отчество"
              name="middleName"
              value={user.middleName}
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
