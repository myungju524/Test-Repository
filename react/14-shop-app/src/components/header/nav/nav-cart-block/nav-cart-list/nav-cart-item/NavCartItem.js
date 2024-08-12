import React from "react";
import styles from "./NavCartItem.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import cartSlice from "./../../../../../../store/cart/cartSlice";

function NavCartItem({ item }) {
  console.log(item);
  return (
    <div className={styles.nav_cart_item}>
      <Link>
        <img src={item.image} />
      </Link>
      <div className={styles.nav_cart_description}>
        <h3>{item.category}</h3>
        <h2>{`${item.title.slice(0, 15)}...`}</h2>
        <span>
          {item.price} x {item.quantity} = $ {item.total.toFixed(2)}
          {/* toFixed : 소숫점 반올림. ()안에 넣은 숫자만큼만 나옴  */}
        </span>
      </div>
      <button className={styles.nav_cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default NavCartItem;
