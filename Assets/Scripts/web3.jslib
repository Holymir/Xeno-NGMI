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
      web3 = new Web3(window.ethereum);
      ethereum.enable().then(function(){
          var tokenContract =  new web3.eth.Contract(window.tokenAbi,"0xa16E02E87b7454126E5E10d957A927A7F5B5d2be");
          tokenContract.methods.allowance(web3.currentProvider.selectedAddress,"0x5FbDB2315678afecb367f032d93F642f64180aa3")
          .call()
          .then(function(allowance){
            if(allowance.toString() !== '0'){
                var mainContract = new web3.eth.Contract(window.mainContractAbi ,"0x5FbDB2315678afecb367f032d93F642f64180aa3");
                mainContract.methods.startGame()
                .send({from:web3.currentProvider.selectedAddress})
                .then(function(){
                    const url = ""+window.location.origin+"/getHighScore?account="+web3.currentProvider.selectedAddress;
                    fetch(url)
                        .then(function(res){
                           res.json()
                           .then(function(jsonResponse){
                            window.highScore = jsonResponse.highScore;
                            window.unityInstance.SendMessage('MainMenuManager','ChangeLevel')
                           }); 
                        })
                });
                return;
            }else{
                tokenContract.methods.approve("0x5FbDB2315678afecb367f032d93F642f64180aa3","50000000000000000000")
                .send({from:web3.currentProvider.selectedAddress})
                .then(function(){
                  var mainContract = new web3.eth.Contract(window.mainContractAbi,"0x5FbDB2315678afecb367f032d93F642f64180aa3");
                  mainContract.methods.startGame()
                  .send({from:web3.currentProvider.selectedAddress})
                  .then(function(){
                    const url = ""+window.location.origin+"/getHighScore?account="+web3.currentProvider.selectedAddress;
                    fetch(url)
                        .then(function(res){
                           res.json()
                           .then(function(jsonResponse){
                            window.highScore = jsonResponse.highScore;
                            window.unityInstance.SendMessage('MainMenuManager','ChangeLevel')
                           }); 
                        })
                  });
                  return;
                })
            }
          }) 
    });
    },
    EndGame:function(score){
        web3 = new Web3(window.ethereum);
        var mainContract = new web3.eth.Contract(window.mainContractAbi,"0x5FbDB2315678afecb367f032d93F642f64180aa3");
        mainContract.methods.endGame(score)
        .send({from:web3.currentProvider.selectedAddress})
        .then(function(){
            console.log('EndGame')
        });
    },
    GetHighScore:function(){
        return window.highScore;
    }
  });