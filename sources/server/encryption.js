export const encrypt = (str) => {
  // Convert string to an array of character codes
  const charCodes = Array.from(str).map((char) => char.charCodeAt(0));

  // Apply a transformation to each character code
  const transformedCharCodes = charCodes.map((code) => {
    // Here, you can use a different transformation logic
    return (code + 1) % 65536; // Using modulo to ensure it stays within the range of a character
  });

  // Convert back to a string
  return String.fromCharCode(...transformedCharCodes);
};

export const decrypt = (encryptedStr) => {
  // Convert string to an array of character codes
  const charCodes = Array.from(encryptedStr).map((char) => char.charCodeAt(0));

  // Apply the inverse transformation
  const reversedCharCodes = charCodes.map((code) => {
    // Use the inverse transformation logic
    return (code - 1 + 65536) % 65536; // Using modulo to wrap around if necessary
  });

  // Convert back to a string
  return String.fromCharCode(...reversedCharCodes);
};

// example usage

// import { encrypt, decrypt } from "./encryption.js";

// const encrypted = encrypt("Hello World!");
// console.log(encrypted); // "Ifmmp!Xpsme\""
// const decrypted = decrypt(encrypted);
// console.log(decrypted); // "Hello World!"
