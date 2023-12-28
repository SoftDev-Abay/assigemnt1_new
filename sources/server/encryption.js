export const encrypt = (str) => {
  const hexstr = Buffer.from(str).toString("hex");
  const arr = hexstr.split("");
  const newarr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    let char = arr[i];
    const transformedChar = String.fromCharCode(char.charCodeAt(0) + 1); // You can use a different transformation logic
    newarr.push(transformedChar);
  }
  const newstr = newarr.reverse().join(""); // Reverse the array before joining
  return newstr;
};

export const decrypt = (str) => {
  const arr = str.split("").reverse(); // Reverse the array before processing
  const newarr = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    const transformedChar = String.fromCharCode(arr[i].charCodeAt(0) - 1); // Use the inverse transformation logic
    newarr.push(transformedChar);
  }
  const newstr = newarr.join("");
  return Buffer.from(newstr, "hex").toString(); // Convert back from hex to string
};
