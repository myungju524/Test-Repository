import React from "react";
import styles from "./CartList.module.scss";
import { useSelector } from "react-redux";
import CartItem from "./cart-item/CartItem";

function CartList() {
  const { products } = useSelector((state) => state.cartSlice);
  return (
    <div className={styles.cart_list}>
      {products.map((item) => {
        return <CartItem item={item} key={item.id} />;
      })}
    </div>
  );
}

export default CartList;
