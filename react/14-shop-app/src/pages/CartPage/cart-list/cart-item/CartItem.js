import React from "react";
import styles from "./CartItem.module.scss";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { incrementProduct } from "../../../../store/cart/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const incrementCount = () => {
    dispatch(incrementProduct(item.id));
  };
  return (
    <div className={styles.cart_item}>
      <Link>
        <img src={item.image} />
      </Link>
      <div className={styles.cart_description}>
        <h3>{item.category}</h3>
        <h2>${item.title}</h2>
        <span>
          {item.price} x {item.quantity} = $ {item.total.toFixed(2)}
          {/* toFixed : 소숫점 반올림. ()안에 넣은 숫자만큼만 나옴  */}
        </span>
      </div>
      <div className={styles.cart_count}>
        <div>
          <button>-</button>
          <span>{item.quantity}</span>
          <button onClick={incrementCount}>+</button>
        </div>
      </div>
      <button className={styles.cart_delete}>
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default CartItem;
