import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setHoursToPass,
    setMinutesToPass,
    setSecondsToPass,
    setInitialDataLoaded,
} from "../redux/reducers/timeReduсer";

const Timer = ({ data }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { hoursToPass, minutesToPass, secondsToPass, initialDataLoaded } =
        useSelector((state) => state.time);

    useEffect(() => {
        if (data && !initialDataLoaded) {
            dispatch(setHoursToPass(data.hours_to_pass));
            dispatch(setMinutesToPass(data.minutes_to_pass));
            dispatch(setSecondsToPass(data.seconds_to_pass));
            dispatch(setInitialDataLoaded(!initialDataLoaded));
        }
    }, [data, dispatch, initialDataLoaded]);

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

        if (
            hoursToPass === 0 &&
            minutesToPass === 0 &&
            secondsToPass === 1 &&
            data
        ) {
            navigate(`/results_test/${data.uuid}`, { replace: true });
        }

        return () => clearTimeout(timer);
    }, [hoursToPass, minutesToPass, secondsToPass, data, dispatch, navigate]);

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