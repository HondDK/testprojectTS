import React, { CSSProperties } from "react";

interface QOneAnswerButtonProps {
  style: CSSProperties;
  text: string;
  onClick: () => void;
}

const QOneAnswerButton: React.FC<QOneAnswerButtonProps> = ({
  style,
  text,
  onClick,
}) => {
  return (
    <div style={style} onClick={onClick}>
      <span>{text}</span>
    </div>
  );
};

export default QOneAnswerButton;
