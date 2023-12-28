// server.post("/api/sign", express.json(), (req, res) => {
//   try {
//     console.log(req.body);
//     let { privateKey, message } = req.body;
//     privateKey = crypto.createPrivateKey({
//       key: Buffer.from(privateKey, "base64"),
//       type: "pkcs8",
//       format: "der",
//     });

//     const sign = crypto.createSign("SHA256");
//     sign.update(message);
//     const signature = sign.sign(privateKey).toString("base64");
//     res.send({ message, signature });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// server.post("/api/verify", express.json(), (req, res) => {
//     try {
//       let { publicKey, message, signature } = req.body;
//       publicKey = crypto.createPublicKey({
//         key: Buffer.from(publicKey, "base64"),
//         type: "spki",
//         format: "der",
//       });

//       const verify = crypto.createVerify("SHA256");
//       verify.update(message); // data to be verified
//       verify.end(); // no more data to be added

//       let isVerified = verify.verify(publicKey, Buffer.from(signature, "base64"));
//       res.send({ isVerified });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

// {
//   "message": "abay",
//   "signature": "f5DRF/Dpc1oYB7D8mQSvYAc7LMPyDqKdGTViNjFJlsFnqqKy5d5jGFOSTty0O+jZwLVRIi+wX+6wS+6GcH1hxVmB4dQoGMRb2zB7YnZ7dBTjBWaTCLCZ2Dp7Y2Z6vjMIFq6FaKUScfhIwmplehXN3e0a2A0wIJdDZIqA4+hv5HV6DTMNx6tNKCkBb9cwklN8P4PJnyBs69Fho7RZ7zahR/3cynpml6VFZEwc7gV5y3y1xbdmUW5HZa10sikEpd4TBZdrinrpLPexR0ElDXXmbkRjQX9NGee/bValShJVTJ0kDYez5Wh1M6ik7yP9zBSPOLt30YNasLVzkLJOI+T0Cw==",
//   "publicKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt6dTzzHN/EgE29+cuv+kzv54kY8jk8j6BYHCmf1FwmcBs9OYRp0RJAB68SnxbQfCe7pnpFiMMV2xf+KkORuy7n/oZNpgVhXoJG6e2FrH4EiR+U61uI7ht4HQ2IoBA32miRG1TCor27U93dqCTVCVa2kOo/IdsPI56/kOi0VtncoB4D+q1DBE9mO3/uirU5/8OvahmzxEmrBqhYiVb5rJpKmSm7rLzGFkAWU+T0HlK4km4k8AiNRnHHbCI6I9VCJMOBeu7XQZbtA/crxF0ji+En7BNYBjBuGZFPWDmaUg3drS/tJHA1gu7cYh6X+psEkIM+wDzJxx9VNHYE22V7CYlwIDAQAB"
//   "privateKey": "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3p1PPMc38SATb35y6/6TO/niRjyOTyPoFgcKZ/UXCZwGz05hGnREkAHrxKfFtB8J7umekWIwxXbF/4qQ5G7Luf+hk2mBWFegkbp7YWsfgSJH5TrW4juG3gdDYigEDfaaJEbVMKivbtT3d2oJNUJVraQ6j8h2w8jnr+Q6LRW2dygHgP6rUMET2Y7f+6KtTn/w69qGbPESasGqFiJVvmsmkqZKbusvMYWQBZT5PQeUriSbiTwCI1GccdsIjoj1UIkw4F67tdBlu0D9yvEXSOL4SfsE1gGMG4ZkU9YOZpSDd2tL+0kcDWC7txiHpf6mwSQgz7APMnHH1U0dgTbZXsJiXAgMBAAECggEAAYG/q25jd2pv2zKMM8yUBiovMeuv4MFk0FWcOEhej0yhD4SnyFWuJcBUZnmUezyH62ZAIk0Q1NSS0xymFEsELD+j1+tr6TafFh+5Few2eMJWhyEhDbV1Q4FTc6EXYi48Bv4qM8iiglgeWB1ckOb47k3SXO3/DPCdjsKpg1C7qF4KpIKigiub1fJFUrD6VjjyubaNAlrESNWTEQEpHNhyjXZYRxSBgC/zk0PQVS6kU9cuoc8FV+wwENKkTVv508tCPVTauA4L6n9l5ARnoqC3/F0tS21ZI97e6iF8dypv07/S5Ji+KrheKHJfhmDmhARVbRLfC/RNx24SLcwiYkFLgQKBgQDBcn7qQzJT0nKQyOcffs9alUOzDdcAw/e3GVQmqIUPhbPxnTx+obodel82xhCjhqTgFz+1jJlWmrAX2pnqau9U8PzbmMhTKRe7nHbHLtHuRzK332+nr774+WwlE9vzUQL0e6nSgMXXeVkN+pxb/aYG7SGbYVpAZN0G1/WLtt7qhwKBgQDzCh5CxH1lHCNJTarRCno2R8cguQfIhH5B1nf7SgPJQ0JVxhPszXb2pT1yhZmMovLg2LEF19zwvW0rPKhnskWV3+J8qF7MRTsvx5N3ez3ZEpCerTlE9keom8D95/mJ0qeL4XYIwu3gc+ayuaKsepkReUAmDbXOZHYHvJCqtwIVcQKBgQCQcVSwySIAEsh2sXxaOQ7NHV0iinf621jQ//mkr/pC39u/0l9EUrAsqJ4FwRjVcYkUxmdMwUIRt4k7FoAM2HICY7r6oXcbGTjeXnMWQTCBkeod/5lYhVK8h0kn2k9GvDvPn7LrOjn/rV1Aods0mQ3qaA/K/IMuR+H95S00eIS0awKBgDONCOAmp2Zj8oQg6kOO0l9jGDSzqpf4qoMyh56Qk38EOjTRX/aRmlM0t3TsK6auBZB1xg60O9QAigBqzFm6cZIZvAOu/vSbFrPKxFfKl1LM4koV+hjLmGWGLAhvRPnb6df8ybmQBz7dtqhgQcYN9xvCuT2ZGOAfZP29HH5pdRKxAoGBAMA1wl+FUEQ9W5JZTs5ZUrRS7jjO4KnK8rGd45dBS7x0TBvoY7yh2bHTDEPRGJg/wzmu4pxNNU+DxpmRv082I/OkXm5yLz2pH3sP8pXsCxV8Y1GmuDtdOsruFaPb/zGQr47H4Gj6N08ebsgv6qLXc3dG/EsFWtpa+ZnbUA82J+1U"
// }

// // Function to read the to-do list from file
// const readMessages = async () => {
//     try {
//       const messagesData = await fsp.readFile(messagesFilePath, "utf8");
//       const result = await JSON.parse(messagesData);
//       return result;
//     } catch (error) {
//       return error;
//     }
//   };

//   // Function to write the to-do list to file
//   const writeMessages = async (messages) => {
//     try {
//       const result = await fsp.writeFile(
//         messagesFilePath,
//         JSON.stringify(messages, null, 2),
//         "utf8"
//       );
//       return result;
//     } catch (error) {
//       return error;
//     }
//   };

//   // HTTP route to add a new message

//   server.post(
//     "/api/users/messages",
//     express.json(),
//     async (request, response) => {
//       try {
//         const messages = await readMessages();
//         let newMessage = request.body;
//         newMessage.id = messages.length + 1;

//         messages.push(newMessage);
//         await writeMessages(messages);
//         response.json(messages);
//       } catch (error) {
//         response.status(500).json({ error: error.message });
//       }
//     }
//   );
