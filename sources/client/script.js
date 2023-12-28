const signUp = async (username, password) => {
  const response = await fetch("/api/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  return data.status === "ok";
};

const getKeys = async () => {
  const response = await fetch("/api/generate-key-pair");
  const data = await response.json();
  return data;
};

const infoContainer = document.getElementById("info-container");
const keysContainer = document.getElementById("keys-container");

console.log(infoContainer);

document.getElementById("sing-up-button").addEventListener("click", () => {
  const username = document.getElementById("username-input").value;
  const password = document.getElementById("password-input").value;
  if (username && password) {
    signUp(username, password).then((result) => {
      if (result) {
        alert("User created successfully");
        getKeys().then((keys) => {
          const publicKey = keys.publicKey;
          const privateKey = keys.privateKey;
          document.getElementById("public-key-input").value = publicKey;
          document.getElementById("private-key-input").value = privateKey;

          infoContainer.style.display = "none";

          keysContainer.style.display = "block";
        });
      } else {
        alert("Something went wrong");
      }
    });
  }
});

const publicKeyCopy = document.getElementById("public-key-copy-button");

publicKeyCopy.addEventListener("click", () => {
  const publicKey = document.getElementById("public-key-input");

  publicKey.select();
  publicKey.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(publicKey.value);
});

const privateKeyCopy = document.getElementById("private-key-copy-button");

privateKeyCopy.addEventListener("click", () => {
  const privateKey = document.getElementById("private-key-input");
  privateKey.select();

  privateKey.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(privateKey.value);
});
