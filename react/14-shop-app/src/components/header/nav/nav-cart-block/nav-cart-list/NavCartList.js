import React from "react";
import styles from "./NavCartList.module.scss";
import NavCartItem from "./nav-cart-item/NavCartItem";
import { useSelector } from "react-redux";
import cartSlice from "./../../../../../store/cart/cartSlice";

function NavCartList() {
  const { products } = useSelector((state) => state.cartSlice);
  return (
    <div className={styles.nav_cart_list}>
      {products.map((item) => {
        return <NavCartItem item={item} key={item.id} />;
      })}
    </div>
  );
}

export default NavCartList;
