import React from "react";

const QOneAnswerButton = (props) => {
    return (
        <div style={props.style} onClick={props.onClick}>
            <span>{props.text}</span>
        </div>
    );
};

export default QOneAnswerButton;