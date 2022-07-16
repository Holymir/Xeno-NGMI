import * as dotenv from "dotenv";

import { task } from "hardhat/config";
import "@graphprotocol/hardhat-graph";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

task("deploy", "Deploys the passed contract").setAction(
  async (taskArgs, hre) => {
    await hre.run("compile");

    const Xeno = await hre.ethers.getContractFactory("FallOfXeno");
    const xeno = await Xeno.deploy();
    await xeno.deployed();
    console.log(xeno.address);
    console.log(await xeno.tokens());
    console.log(await xeno.items());

    await hre.run("graph", {
      contractName: "FallOfXeno",
      address: xeno.address,
    });

    // await hre.run("graph", {
    //   contractName: "FallOfXenoItems",
    //   address: await xeno.items(),
    // });

    // await hre.run("graph", {
    //   contractName: "LimeToken",
    //   address: await xeno.tokens(),
    // });
  }
);

const config = {
  solidity: {
    version: "0.8.7",
    setting: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "https://da2c-84-21-205-98.eu.ngrok.io",
    },
    hardhat: {},
  },
};

export default config;

// 0x5FbDB2315678afecb367f032d93F642f64180aa3 - main
// 0xa16E02E87b7454126E5E10d957A927A7F5B5d2be - token
// 0xB7A5bd0345EF1Cc5E66bf61BdeC17D2461fBd968 - items
