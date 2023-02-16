import React from "react";

const Button = (props) => {
  const { className, onClick, text, type, style } = props;
  return (
    <button style={style} className={className} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
