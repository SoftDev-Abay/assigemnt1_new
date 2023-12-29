import cryptojs from "crypto-js";
const { SHA256 } = cryptojs;
import crypto from "crypto";
import { encrypt, decrypt } from "../encryption.js";

export class CryptoBlock {
  constructor(index, timestamp, data, signature, precedingHash = " ") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = this.encryptData(data);
    this.precedingHash = precedingHash;
    this.signature = signature;
    this.hash = this.computeHash();
    this.nonce = 0;
  }

  encryptData(data) {
    // check if data is an object
    if (typeof data !== "object") {
      return data;
    }

    let ecryptedData = {};
    let { sender, recipient, quantity } = data;

    sender = encrypt(sender + "");
    recipient = encrypt(recipient + "");

    data.sender = sender;
    data.recipient = recipient;
    data.quantity = quantity;
    return data;
  }

  decryptData() {
    let decryptedData = {};
    decryptedData.sender = decrypt(this.data.sender);
    decryptedData.recipient = decrypt(this.data.recipient);
    decryptedData.quantity = decrypt(this.data.quantity.toString());
    return decryptedData;
  }

  verifySignature(publicKey, data, signature) {
    publicKey = crypto.createPublicKey({
      key: Buffer.from(publicKey, "base64"),
      type: "spki",
      format: "der",
    });

    data = JSON.stringify(data);

    const verify = crypto.createVerify("SHA256");
    verify.update(data); // data to be verified
    verify.end(); // no more data to be added

    let isVerified = verify.verify(publicKey, Buffer.from(signature, "base64"));
    return isVerified;
  }

  computeHash() {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce // nonce is a number used once in cryptography
    ).toString();
  }

  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}
