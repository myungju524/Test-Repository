function generateRandomHex() {
  const num = Math.floor(Math.random() * 256);
  const hex = num.toString(16).padStart(2, "0").toUpperCase();
  return hex;
  // num.toString(16) 까지는 16진수로 바뀐 문자열의 length가 2보다 작으면
  // 'padStart(2, "0")' 문자의 앞에 0으로 채워 length를 2로 만듦
}

// generateRandomHex() = 랜덤으로 두 자릿수를 뽑음
export default function generateColorCode() {
  // default 를 안 쓸 땐 여러개의 함수를 밖으로 빼고 싶을 때
  // default를 붙이면 바로 뒤에오는 함수가 무조건 옴 default는 한 번만 쓸 수 있음
  const colorCode = `#${generateRandomHex()}${generateRandomHex()}${generateRandomHex()}`;
  return colorCode;
}
