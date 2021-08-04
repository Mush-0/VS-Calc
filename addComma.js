function addComma(num) {
  function replacer(match) {
    return match + ",";
  }
  return num
    .toString()
    .split("")
    .reverse()
    .join("")
    .replace(/\d{3}(?=\d{1})/g, replacer)
    .split("")
    .reverse()
    .join("");
}
function addComma2(num) {
  return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
}
export { addComma, addComma2 };
