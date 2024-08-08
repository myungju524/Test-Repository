import React, { useEffect } from "react";
import styles from "./CardList.module.scss";
import CardItem from "./card-item/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../store/products/productsSlice";

function CardList() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productsSlice);
  const category = "";
  useEffect(() => {
    const queryOptions = {
      conditions: [{ field: "category", operator: ">=", value: category }],
    };
    dispatch(fetchProducts({ collectionName: "products", queryOptions }));
  }, []);

  return (
    <ul className={styles.card_list}>
      {products.map((product) => {
        return <CardItem item={product} />;
      })}
    </ul>
  );
}

export default CardList;
