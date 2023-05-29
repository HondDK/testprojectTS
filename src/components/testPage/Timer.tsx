import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  setHoursToPass,
  setMinutesToPass,
  setSecondsToPass,
} from "../../redux/reducers/TimerSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

const Timer: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { student_examId } = useAppSelector((state) => state.formPage);

  const { hoursToPass, minutesToPass, secondsToPass, initialDataLoaded } =
    useAppSelector((state) => state.timer);

  useEffect(() => {
    const timer =
      hoursToPass > 0 || minutesToPass > 0 || secondsToPass > 0
        ? setTimeout(() => {
            if (secondsToPass === 0) {
              if (minutesToPass === 0) {
                if (hoursToPass === 0) {
                  clearTimeout(timer);
                } else {
                  dispatch(setHoursToPass(hoursToPass - 1));
                  dispatch(setMinutesToPass(59));
                  dispatch(setSecondsToPass(59));
                }
              } else {
                dispatch(setMinutesToPass(minutesToPass - 1));
                dispatch(setSecondsToPass(59));
              }
            } else {
              dispatch(setSecondsToPass(secondsToPass - 1));
            }
          }, 1000)
        : undefined;

    if (hoursToPass === 0 && minutesToPass === 0 && secondsToPass === 1) {
      navigate(`/results_test/${student_examId}`, { replace: true });
    }

    return () => clearTimeout(timer);
  }, [hoursToPass, minutesToPass, secondsToPass, dispatch, navigate]);

  const formattedTime = `${(hoursToPass || 0).toString().padStart(2, "0")}:${(
    minutesToPass || 0
  )
    .toString()
    .padStart(2, "0")}:${(secondsToPass || 0).toString().padStart(2, "0")}`;

  return (
    <div>
      <span className="timer-span">{formattedTime}</span>
    </div>
  );
};

export default Timer;
