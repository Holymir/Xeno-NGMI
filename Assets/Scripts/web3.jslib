mergeInto(LibraryManager.library, {
    Web3Enable:function (){
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            ethereum.enable();
        }
        return;
    },
    WalletAddress:function (){
      web3 = new Web3(window.ethereum);
      var returnStr;
      try {
        // get address from metamask
        returnStr = web3.currentProvider.selectedAddress
      } catch (e) {
        returnStr = ""
      }
      var returnStr = web3.currentProvider.selectedAddress;
      var bufferSize = lengthBytesUTF8(returnStr) + 1;
      var buffer = _malloc(bufferSize);
      stringToUTF8(returnStr, buffer, bufferSize);
      return buffer;
    },
    CallContract:function (){
        var mainContractAbi = [
            { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "player",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "totalScore",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "season",
                  "type": "uint256"
                }
              ],
              "name": "GameEnded",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "player",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "season",
                  "type": "uint256"
                }
              ],
              "name": "GameStarted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "season",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "firstPlace",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "secondPlace",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "thirdPlace",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "firstScore",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "secondScore",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "thirdScore",
                  "type": "uint256"
                }
              ],
              "name": "SeasonEnded",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "season",
                  "type": "uint256"
                }
              ],
              "name": "SeasonStarted",
              "type": "event"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "_amount", "type": "uint256" }
              ],
              "name": "buyLimes",
              "outputs": [],
              "stateMutability": "payable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "_score", "type": "uint256" }
              ],
              "name": "endGame",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "endSeason",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "items",
              "outputs": [
                {
                  "internalType": "contract FallOfXenoItems",
                  "name": "",
                  "type": "address"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "uint256", "name": "_itemId", "type": "uint256" }
              ],
              "name": "mintItem",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "", "type": "address" },
                { "internalType": "address", "name": "", "type": "address" },
                { "internalType": "uint256[]", "name": "", "type": "uint256[]" },
                { "internalType": "uint256[]", "name": "", "type": "uint256[]" },
                { "internalType": "bytes", "name": "", "type": "bytes" }
              ],
              "name": "onERC1155BatchReceived",
              "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "address", "name": "", "type": "address" },
                { "internalType": "address", "name": "", "type": "address" },
                { "internalType": "uint256", "name": "", "type": "uint256" },
                { "internalType": "uint256", "name": "", "type": "uint256" },
                { "internalType": "bytes", "name": "", "type": "bytes" }
              ],
              "name": "onERC1155Received",
              "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "season",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "seasonActive",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "startGame",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "startSeason",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }
              ],
              "name": "supportsInterface",
              "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "tokens",
              "outputs": [
                { "internalType": "contract LimeToken", "name": "", "type": "address" }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "name": "topScorers",
              "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "name": "topScores",
              "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
              "stateMutability": "view",
              "type": "function"
            }
          ];

      var tokenAbi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Approval",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            }
          ],
          "name": "allowance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "approve",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "decimals",
          "outputs": [
            {
              "internalType": "uint8",
              "name": "",
              "type": "uint8"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "subtractedValue",
              "type": "uint256"
            }
          ],
          "name": "decreaseAllowance",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "spender",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "addedValue",
              "type": "uint256"
            }
          ],
          "name": "increaseAllowance",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "name",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "symbol",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transfer",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "transferFrom",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ];
      web3 = new Web3(window.ethereum);
      ethereum.enable().then(function(){
          var tokenContract =  new web3.eth.Contract(tokenAbi,"0xa16E02E87b7454126E5E10d957A927A7F5B5d2be");
          tokenContract.methods.allowance(web3.currentProvider.selectedAddress,"0x5FbDB2315678afecb367f032d93F642f64180aa3")
          .call()
          .then(function(allowance){
            if(allowance.toString() !== '0'){
                var mainContract = new web3.eth.Contract(mainContractAbi,"0x5FbDB2315678afecb367f032d93F642f64180aa3");
                mainContract.methods.startGame()
                .send({from:web3.currentProvider.selectedAddress})
                .then(function(){
                    window.unityInstance.SendMessage('MainMenuManager','ChangeLevel')
                });
                return;
            }else{
                tokenContract.methods.approve("0x5FbDB2315678afecb367f032d93F642f64180aa3","50000000000000000000")
                .send({from:web3.currentProvider.selectedAddress})
                .then(function(){
                  var mainContract = new web3.eth.Contract(mainContractAbi,"0x5FbDB2315678afecb367f032d93F642f64180aa3");
                  mainContract.methods.startGame()
                  .send({from:web3.currentProvider.selectedAddress})
                  .then(function(){
                    window.unityInstance.SendMessage('MainMenuManager','ChangeLevel')
                  });
                  return;
                })
            }
          }) 
    });
    },
  });