//SPDX-License-Identifier: NOT-NEXO

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LimeToken is ERC20{
  constructor() ERC20("LimeToken", "LIME"){
    _mint(msg.sender,100000*10**18);
  }
}
