import React from "react";
import * as C from "./Button.module"

const Button = ({ Text, onClick, type }) => {
  return (
    <C.Button type={type} onClick={onClick}>
      {Text}
    </C.Button>
  );
};

export default Button;