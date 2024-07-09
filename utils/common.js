const crypto = require("crypto");

const generateRandomWalletAddress = () => {
  // Generate 20 bytes (160 bits) of random data
  const randomBytes = crypto.randomBytes(20);

  // Convert the random bytes to a hexadecimal string
  const walletAddress = "0x" + randomBytes.toString("hex");

  return walletAddress;
};

const randomWalletAddress = generateRandomWalletAddress();
console.log(randomWalletAddress); 
