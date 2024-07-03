import React from "react";

const RATINGS = [1, 2, 3, 4, 5];

function Star() {
  return <span>★</span>;
}

function Rating(props) {
  return (
    <div>
      {RATINGS.map((arrNum) => (
        <Star key={arrNum} />
        // 반복문을 쓸 땐 유니크한 key값이 꼭 필요하다.
      ))}
    </div>
  );
}

export default Rating;
