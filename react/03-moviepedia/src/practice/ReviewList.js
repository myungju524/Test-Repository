import React from "react";
import Rating from "./Rating";
import bgImg from "../assets/bg.jpg";
import "./ReviewList.css";

function formatData(value) {
  const date = new Date(value);
  return `${date.getFullYear()} . ${date.getMonth() + 1} . ${date.getDate()}`;
}

function ReviewListItem({ item }) {
  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} />
      <div className="ReviewListItem-rows">
        <h1 className="ReviewListItem-title">{item.title}</h1>
        <Rating className="ReviewListItem-rating" />
        <p className="ReviewListItem-date">{formatData(item.createdAt)}</p>
        <p className="ReviewListItem-content">{item.content}</p>
        <div className="ReviewListItem-buttons">
          <button className="ReviewListItem-edit-button">수정</button>
          <button className="ReviewListItem-delete-button">삭제</button>
        </div>
      </div>
    </div>
  );
}

function ReviewList({ items }) {
  return (
    <ul className="ReviewList">
      {items.map((item) => (
        <li key={item.id}>
          <ReviewListItem item={item} />
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;
