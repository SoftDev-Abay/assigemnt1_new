import express from "express";
import cryptojs from "crypto-js";
const { SHA256 } = cryptojs;
import crypto from "crypto";

const fsp = fs.promises;
import fs from "fs";

// how to import a function from another file
import { encrypt, decrypt } from "./encryption.js";
import { CryptoBlock } from "./classes/cryptoBlock.js";
import { CryptoBlockchain } from "./classes/cryptoBlockchain.js";

const server = express();

const port = 3000;

const host = "0.0.0.0";

server.use(express.static("sources/client"));

const blockchainFilePath = "sources/server/blochain.json";
const usersFilePath = "sources/server/users.json";

const readUsers = async () => {
  try {
    const usersData = await fsp.readFile(usersFilePath, "utf8");
    const result = await JSON.parse(usersData);
    return result;
  } catch (error) {
    return error;
  }
};

const writeUsers = async (users) => {
  try {
    const result = await fsp.writeFile(
      usersFilePath,
      JSON.stringify(users, null, 2),
      "utf8"
    );
    return result;
  } catch (error) {
    return error;
  }
};

const readBlockchain = async () => {
  try {
    const blockchainData = await fsp.readFile(blockchainFilePath, "utf8");
    const result = await JSON.parse(blockchainData);
    return result;
  } catch (error) {
    return error;
  }
};

const writeBlockchain = async (blockchain) => {
  try {
    const result = await fsp.writeFile(
      blockchainFilePath,
      JSON.stringify(blockchain, null, 2),
      "utf8"
    );
    return result;
  } catch (error) {
    return error;
  }
};

const constructBlockchainFromJson = async () => {
  let jsonBlockchain = await readBlockchain();

  const blockchain = new CryptoBlockchain();
  jsonBlockchain.blockchain.forEach((block) => {
    const newBlock = new CryptoBlock(
      block.index,
      block.timestamp,
      block.data,
      block.signature,
      block.precedingHash
    );
    blockchain.blockchain.push(newBlock);
  });
  return blockchain;
};

const createSignature = (privateKey, data) => {
  privateKey = crypto.createPrivateKey({
    key: Buffer.from(privateKey, "base64"),
    type: "pkcs8",
    format: "der",
  });
  data = JSON.stringify(data);

  const sign = crypto.createSign("SHA256");
  sign.update(data);
  const signature = sign.sign(privateKey).toString("base64");
  return signature;
};

// HTTP route to get a new public and private keys pair
server.get("/api/generate-key-pair", (req, res) => {
  try {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "der",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "der",
      },
    });
    res.send({
      publicKey: publicKey.toString("base64"),
      privateKey: privateKey.toString("base64"),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// HTTP route to create a new user
server.post("/api/sign-up", express.json(), async (req, res) => {
  try {
    const users = await readUsers();
    const { username, password } = req.body;
    const user = users.find((user) => user.username === username);
    if (user) {
      res.status(400).json({ error: "User already exists" });
    } else {
      const newUser = { username, password };
      users.push(newUser);
      await writeUsers(users);
      res.json({ status: "ok" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start listening for HTTP requests

const initializeServer = async () => {
  const glovalBlockchain = await constructBlockchainFromJson();

  // HTTP route to add a new block
  server.post("/api/block", express.json(), async (req, res) => {
    try {
      const users = await readUsers();
      const { privateKey, data } = req.body;
      const { sender } = data;
      const user = users.find((user) => user.username === sender);
      if (user) {
        const signature = createSignature(privateKey, data);
        const newBlock = new CryptoBlock(
          glovalBlockchain.blockchain.length,
          Date.now(),
          data,
          signature
        );

        console.log(glovalBlockchain.blockchain.length);

        newBlock.proofOfWork(glovalBlockchain.difficulty);

        glovalBlockchain.blockchain.push(newBlock);
        await writeBlockchain(glovalBlockchain);
        res.json({ status: "ok" });
      } else {
        res.status(400).json({ error: "User does not exist" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  // HTTP route to get the blockchain
  server.get("/api/blockchain", async (req, res) => {
    try {
      res.json(glovalBlockchain);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // HTTP route to get last block of the blockchain

  server.get("/api/blockchain/latest", async (req, res) => {
    try {
      const latestBlock = glovalBlockchain.obtainLatestBlock();

      res.json(latestBlock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  server.listen(port, host, () => {
    console.log(`Listening on http://${host}:${port}`);
  });
};

initializeServer();

// let smashingCoin = new CryptoBlockchain();

// console.log("smashingCoin mining in progress....");
// smashingCoin.addNewBlock(
//   new CryptoBlock(1, "01/06/2020", {
//     sender: "Iris Ljesnjanin",
//     recipient: "Cosima Mielke",
//     quantity: 50,
//   })
// );

// smashingCoin.addNewBlock(
//   new CryptoBlock(2, "01/07/2020", {
//     sender: "Vitaly Friedman",
//     recipient: "Ricardo Gimenes",
//     quantity: 100,
//   })
// );

// // pretty print JSON object null for no replacer meaning no transformation 4 for indentation
// console.log(JSON.stringify(smashingCoin, null, 4));
