import { ethers } from "hardhat";

async function fund() {
  const Xeno = await ethers.getContractFactory("FallOfXeno");
  const xeno = await Xeno.attach("0x5fbdb2315678afecb367f032d93f642f64180aa3");
  const signer = await ethers.getSigner("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");
  await xeno.connect(signer).buyLimes(ethers.utils.parseEther("5000"));
}

fund().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
