export const numPrice = (num) => {
  const n = num + "";
  const numArr = n.split("").reverse();
  const overArr = [];
  let i = 0;
  numArr.forEach((item) => {
    i++;
    if (i > 3) {
      i = 1;
      overArr.push(",");
    }
    overArr.push(item);
  });
  overArr.reverse();
  return overArr.join("");
};
export const formatNumber = (value) => {
  if (!value) return "";
  if (value < 1000) return value;
  const exp = Math.floor(Math.log(value) / Math.log(1000));
  const suffix = ["", "k", "M", "G", "T", "P"][exp];
  const rounded = Math.round((value / Math.pow(1000, exp)) * 10) / 10;
  return rounded + suffix;
};
