import React from "react";
import styles from "./Button.module.css";
import cn from "classnames";

function Button({ variant, ...restProps }) {
  return (
    <button
      {...restProps}
      // 단일태그에만 ...restProps 를 쓸 수 있음
      className={cn(styles.button, variant && styles[variant])}
    />
  );
}

export default Button;
