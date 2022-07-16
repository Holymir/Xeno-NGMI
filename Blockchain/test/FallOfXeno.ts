import { expect } from "chai";
import { ethers } from "hardhat";
import {
  FallOfXeno,
  FallOfXeno__factory,
  LimeToken,
  LimeToken__factory,
} from "../typechain";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
let Xeno: FallOfXeno__factory;
let xeno: FallOfXeno;
let Lime: LimeToken__factory;
let lime: LimeToken;
let signer: any;
let tx: any;
const player1HS = 1300;
const player2HS = 800;
const player3HS = 1500;
let player1: any;
let player2: any;
let player3: any;

describe("Deploying the contract", () => {
  before(async () => {
    Xeno = await ethers.getContractFactory("FallOfXeno");
    xeno = await Xeno.deploy();
    await xeno.deployed();

    Lime = await ethers.getContractFactory("LimeToken");
    lime = Lime.attach(await xeno.tokens());
  });

  it("Should deploy tokens and items contract", async () => {
    expect(await xeno.tokens()).to.not.equal(ZERO_ADDRESS);
    expect(await xeno.items()).to.not.equal(ZERO_ADDRESS);
  });

  it("Should mint limes on deploy", async () => {
    expect(await lime.balanceOf(xeno.address)).to.equal(
      ethers.utils.parseEther("100000").toBigInt()
    );
  });

  it("Starts a new season", async () => {
    expect(await xeno.season()).to.equal(1);
  });
});

describe("Managing seasons", () => {
  before(async () => {
    Xeno = await ethers.getContractFactory("FallOfXeno");
    xeno = await Xeno.deploy();
    await xeno.deployed();
  });

  describe("endSeason()", () => {
    it("Should end the season", async () => {
      expect(await xeno.season()).to.equal(1);
      expect(await xeno.seasonActive()).to.equal(true);

      tx = await xeno.endSeason();
      expect(await xeno.seasonActive()).to.equal(false);
    });

    it("Should emit a SeasonEnded event", async () => {
      const receipt = await tx.wait();
      expect(receipt.events![0].event).to.equal("SeasonEnded");
    });
  });

  describe("startSeason()", () => {
    it("Should start a new the season", async () => {
      expect(await xeno.season()).to.equal(1);
      expect(await xeno.seasonActive()).to.equal(false);

      tx = await xeno.startSeason();
      expect(await xeno.seasonActive()).to.equal(true);
      expect(await xeno.season()).to.equal(2);
    });

    it("Should emit a seasonStarted event", async () => {
      const receipt = await tx.wait();
      expect(receipt.events![0].event).to.equal("SeasonStarted");
    });
  });
});

describe("Game management", () => {
  before(async () => {
    Xeno = await ethers.getContractFactory("FallOfXeno");
    xeno = await Xeno.deploy();
    await xeno.deployed();

    Lime = await ethers.getContractFactory("LimeToken");
    lime = Lime.attach(await xeno.tokens());

    // Skip the first signer as the address is the same as the Xeno contract
    [, signer] = await ethers.getSigners();

    await xeno.connect(signer).buyLimes(ethers.utils.parseEther("5000"));
    await lime
      .connect(signer)
      .approve(xeno.address, ethers.utils.parseEther("5000"));
  });

  describe("startGame()", () => {
    before(async () => {
      tx = await xeno.connect(signer).startGame();
    });

    it("Should start a new game and stake 50 limes", async () => {
      expect(await xeno.playerRegisteredPerSeason(1, signer.address)).to.equal(
        true
      );
      expect(await lime.balanceOf(signer.address)).to.equal(
        ethers.utils.parseEther("4950").toBigInt()
      );
    });

    it("Emitter should emit a GameStarted event", async () => {
      const receipt = await tx.wait();
      expect(receipt.events![2].event).to.equal("GameStarted");
    });
  });

  describe("endGame()", () => {
    before(async () => {
      tx = await xeno.connect(signer).endGame(1000);
    });

    it("Should end the game and update the score and games played", async () => {
      expect(
        await xeno.playerHighestScorePerSeason(1, signer.address)
      ).to.equal(1000);
      expect(await xeno.gamesPlayedPerSeason(1, signer.address)).to.equal(1);
    });

    it("Sets the address as top scorer", async () => {
      expect(await xeno.topScorers(0)).to.equal(signer.address);
      expect(await xeno.topScores(0)).to.equal(1000);
    });

    it("Should emit a GameEnded event", async () => {
      const receipt = await tx.wait();
      expect(receipt.events![0].event).to.equal("GameEnded");
    });
  });
});

describe("Integration Test", () => {
  before(async () => {
    Xeno = await ethers.getContractFactory("FallOfXeno");
    xeno = await Xeno.deploy();
    await xeno.deployed();
    Lime = await ethers.getContractFactory("LimeToken");
    lime = Lime.attach(await xeno.tokens());

    [player1, player2, player3] = await ethers.getSigners();

    await xeno.connect(player1).buyLimes(ethers.utils.parseEther("5000"));
    await lime
      .connect(player1)
      .approve(xeno.address, ethers.utils.parseEther("5000"));
    await xeno.connect(player2).buyLimes(ethers.utils.parseEther("5000"));
    await lime
      .connect(player2)
      .approve(xeno.address, ethers.utils.parseEther("5000"));
    await xeno.connect(player3).buyLimes(ethers.utils.parseEther("5000"));
    await lime
      .connect(player3)
      .approve(xeno.address, ethers.utils.parseEther("5000"));

    // Player1 games
    await xeno.connect(player1).startGame();
    await xeno.connect(player1).endGame(1000);
    await xeno.connect(player1).startGame();
    await xeno.connect(player1).endGame(1300);
    await xeno.connect(player1).startGame();
    await xeno.connect(player1).endGame(900);

    // Player2 games
    await xeno.connect(player2).startGame();
    await xeno.connect(player2).endGame(800);
    await xeno.connect(player2).startGame();
    await xeno.connect(player2).endGame(500);
    await xeno.connect(player2).startGame();
    await xeno.connect(player2).endGame(200);

    // Player3 games
    await xeno.connect(player3).startGame();
    await xeno.connect(player3).endGame(700);
    await xeno.connect(player3).startGame();
    await xeno.connect(player3).endGame(1150);
    await xeno.connect(player3).startGame();
    await xeno.connect(player3).endGame(1500);

    await xeno.endSeason();
  });

  it("Has set top scores correctly", async () => {
    // First place
    expect(await xeno.topScores(0)).to.equal(player3HS);
    expect(await xeno.topScorers(0)).to.equal(player3.address);
    // Second place
    expect(await xeno.topScores(1)).to.equal(player1HS);
    expect(await xeno.topScorers(1)).to.equal(player1.address);
    // Third place
    expect(await xeno.topScores(2)).to.equal(player2HS);
    expect(await xeno.topScorers(2)).to.equal(player2.address);
  });

  it("Has distributed the winnings correctly", async () => {
    // First place
    expect(await xeno.playerEarningPerSeason(1, player3.address)).to.equal(
      `${(150 / 100) * 45 * 10 ** 18}`
    );
    // Second place
    expect(await xeno.playerEarningPerSeason(1, player1.address)).to.equal(
      `${(150 / 100) * 25 * 10 ** 18}`
    );
    // Third place
    expect(await xeno.playerEarningPerSeason(1, player2.address)).to.equal(
      `${(150 / 100) * 15 * 10 ** 18}`
    );
  });
});
