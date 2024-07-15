import React from "react";
import styles from "./Container.module.css";
import cn from "classnames";

function Container({ children, className }) {
  return (
    <div className={cn(styles.container, className)}>
      {children}
      {/* childred = > 리액트에서 알아서 전달해주는 props */}
    </div>
  );
}

export default Container;
