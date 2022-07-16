//SPDX-License-Identifier: NOT-NEXO
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "./LimeToken.sol";
import "./FallOfXenoItems.sol";

contract FallOfXeno is ERC1155Holder {
  uint256 public stakePrice;
  uint256 public season;
  uint256[3] public topScores;
  address[3] public topScorers;
  bool public seasonActive;
  LimeToken public tokens;
  FallOfXenoItems public items;

  mapping (uint256 => mapping(address => bool)) public playerRegisteredPerSeason;
  mapping (uint256 => mapping(address => uint256)) public playerHighestScorePerSeason;
  mapping (uint256 => mapping (address => uint256)) public gamesPlayedPerSeason;
  mapping (uint256 => mapping (address => uint256)) public playerEarningPerSeason;
  mapping (uint256 => uint256) private stakedPerSeason;

  event GameStarted(address player, uint season);
  event GameEnded(address player, uint256 totalScore, uint season);
  event SeasonStarted(uint256 season);
  event SeasonEnded(uint256 season, address firstPlace, address secondPlace, address thirdPlace, uint firstScore, uint secondScore, uint thirdScore);

  constructor() {
    stakePrice = 50 * 10 ** 18;
    tokens = new LimeToken();
    items = new FallOfXenoItems();
    startSeason();
  }

  function startSeason() public {
    require(!seasonActive, "Season already started");

    season += 1;
    seasonActive = true;
    delete topScores;
    delete topScorers;

    emit SeasonStarted(season);
  }

  function endSeason() external {
    seasonActive = false;

    playerEarningPerSeason[season][topScorers[0]] = stakedPerSeason[season] / 100 * 45;
    playerEarningPerSeason[season][topScorers[1]] = stakedPerSeason[season] / 100 * 25;
    playerEarningPerSeason[season][topScorers[2]] = stakedPerSeason[season] / 100 * 15;

    emit SeasonEnded(season, topScorers[0], topScorers[1], topScorers[2], topScores[0], topScores[1], topScores[2]);
  }

  function startGame() external {
    if (!playerRegisteredPerSeason[season][msg.sender] && seasonActive) {
      require(tokens.balanceOf(msg.sender) >= 50, "You need to have at least 50 LIMEs to play the game");
      tokens.transferFrom(msg.sender, address(this), stakePrice);
      stakedPerSeason[season] += stakePrice;
      playerRegisteredPerSeason[season][msg.sender] = true;
    }

    emit GameStarted(msg.sender, season);
  }

  // We know that the player setting the score is a security issue
  // but for the sake of POC simplicity we will allow it for now.
  // TODO: Make the server set the score on behalf of the player.
  function endGame(uint256 _score) external {
    if(_score > playerHighestScorePerSeason[season][msg.sender]) {
      playerHighestScorePerSeason[season][msg.sender] = _score;

      uint256 i;

      for (i; i < 3; i++) {
        if (_score > topScores[i]) {
          break;
        }
      }

      if (i < 3) {
        for (uint256 j = 2; j > i; j--) {
          // If new user score is the highest, but currently he is on 2nd place
          // we should not swap 2nd to 3rd place, just swap 1st and second.
          if(i == 0 && topScorers[0] == msg.sender) {
            break;
          } else if(i == 0 && j == 2 && topScorers[j-1] == msg.sender) {
            continue;
          }

          topScores[j] = topScores[j - 1];
          topScorers[j] = topScorers[j - 1];
        }

        topScores[i] = _score;
        topScorers[i] = msg.sender;
      }
      gamesPlayedPerSeason[season][msg.sender] += 1;
    }

    emit GameEnded(msg.sender, _score, season);
  }

  function withdraw(uint256 _season) external {
    require(!seasonActive, "Season is active");
    require(playerEarningPerSeason[season][msg.sender] > 0, "You have no earnings to withdraw");

    tokens.transfer(msg.sender, playerEarningPerSeason[_season][msg.sender]);
  }

  function mintItem(uint256 _itemId) external {
    items.mintItem(msg.sender, _itemId, 1);
  }

  function buyLimes(uint256 _amount) external {
    tokens.transfer(msg.sender, _amount);
  }
}
