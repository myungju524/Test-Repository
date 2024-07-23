import React from "react";

function ReviewListItem() {
  return (
    <div className="FoodListItem">
      <img className="FoodListItem-img" />
      <div className="FoodListItem-rows">
        <h1 className="FoodListItem-title"></h1>
        <p className="FoodListItem-date"></p>
        <p className="FoodListItem-content"></p>
        <div className="FoodListItem-buttons">
          <button className="FoodListItem-edit-button"></button>
          <button className="FoodListItem-delete-button"></button>
        </div>
      </div>
    </div>
  );
}

function FoodList(props) {
  return <ul className="FoodList"></ul>;
}

export default FoodList;
