//SPDX-License-Identifier: NOT-NEXO
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract FallOfXenoItems is ERC1155 {
  uint256 public constant MACHINEGUN = 1;
  uint256 public constant PLASMAGUN = 2;

  constructor() ERC1155("https://fallofxeno.com") {}

  function mintItem(address _to, uint256 _itemId, uint256 _amount) external {
    _mint(_to, _itemId, _amount, "");
  }
}
