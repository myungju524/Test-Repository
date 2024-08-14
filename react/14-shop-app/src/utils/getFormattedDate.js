export function getISODate(date) {
  const offset = new Date().getTimezoneOffset() * 60 * 1000;
  const dateSplitArr = new Date(date - offset).toISOString().split("T");
  const yyyyMMdd = dateSplitArr[0];
  const hhmmss = dateSplitArr[1].split(".")[0];
  return { yyyyMMdd, hhmmss };
}
