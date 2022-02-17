const hre = require("hardhat");

async function main() {
  const Anon = await hre.ethers.getContractFactory("Anon");
  const anon = await Anon.deploy();
  await anon.deployed();

  console.log("Greeter deployed to:", anon.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
