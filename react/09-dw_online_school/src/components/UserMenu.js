import React, { useEffect, useState } from "react";
import personImg from "../assets/person.png";
import { Link } from "react-router-dom";
import styles from "./UserMenu.module.css";

function UserMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const isLogined = JSON.parse(localStorage.getItem("member"));

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutSide = () => {
      setIsOpen(false);
    };

    window.addEventListener("click", handleClickOutSide);
    return () => {
      window.removeEventListener("click", handleClickOutSide);
      //   윈도우 객체 사용할 때 클린업 함수 꼭 생각해야 함
    };
  }, [isOpen]);

  const logOut = () => {
    localStorage.removeItem("member");
  };

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleClick}>
        <img src={personImg} />
      </button>
      {isOpen && (
        <ul className={styles.popup}>
          <Link to="/wishlist">
            <li>위시리스트</li>
          </Link>
          <li className={styles.disabled}>회원가입</li>
          {/* {!isLogined ? () : ()} */}
          {!isLogined ? (
            <Link to="/login">
              <li>로그인</li>
            </Link>
          ) : (
            <Link to="/login" onClick={logOut}>
              <li>로그아웃</li>
            </Link>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
