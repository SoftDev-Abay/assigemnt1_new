const createBlockButton = document.getElementById("create-block-button");
// show-blockchain-button
const showBlockchainButton = document.getElementById("show-blockchain-button");
// show-latest-button
const showLatestButton = document.getElementById("show-latest-button");
// data-container
const dataContainer = document.getElementById("data-container");

showBlockchainButton.addEventListener("click", () => {
  fetch("/api/blockchain")
    .then((response) => response.json())
    .then((data) => {
      dataContainer.innerHTML = JSON.stringify(data, null, 8);
    });
});

showLatestButton.addEventListener("click", () => {
  fetch("/api/blockchain/latest")
    .then((response) => response.json())
    .then((data) => {
      dataContainer.innerHTML = JSON.stringify(data, null, 8);
    });
});

createBlockButton.addEventListener("click", () => {
  const privateKey = document.getElementById("private-key-input").value;
  const sender = document.getElementById("sender-input").value;
  const recipient = document.getElementById("recipient-input").value;
  let quantity = document.getElementById("quantity-input").value;
  quantity = parseInt(quantity);

  if (privateKey && sender && recipient && quantity) {
    const data = {
      sender,
      recipient,
      quantity,
    };

    const blockData = {
      privateKey,
      data,
    };

    addBlock(blockData, privateKey).then((result) => {
      if (result) {
        alert("Block created successfully");
      } else {
        alert("Something went wrong");
      }
    });
  }
});

const addBlock = async (data, privateKey) => {
  const response = await fetch("/api/block", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data, privateKey),
  });

  const result = await response.json();
  console.log(result);
  return result.status === "ok";
};
