import React from "react";

const NavButton = (props: { children: string }) => {
  return (
    <div className="question_number_btn">
      <span>{props.children}</span>
    </div>
  );
};

export default NavButton;
