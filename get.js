// set browser
const express = require('express');
let app = express();
const PORT = 5000;

module.exports = function(callback) {
    var ABI = [
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "viewStatus",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "viewTitle",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "viewValidity",
        "outputs": [
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "viewEYAddress",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "viewPartyAddress",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "viewDescription",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "pstatus",
            "type": "string"
          }
        ],
        "name": "setStatus",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "ptitile",
            "type": "string"
          }
        ],
        "name": "setTitle",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "pdate",
            "type": "string"
          },
          {
            "name": "ptenure",
            "type": "string"
          },
          {
            "name": "pwarranty",
            "type": "string"
          }
        ],
        "name": "setValidity",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "peyaddress",
            "type": "string"
          },
          {
            "name": "ppartyaddress",
            "type": "string"
          }
        ],
        "name": "setAddress",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "pdescription",
            "type": "string"
          }
        ],
        "name": "setDescription",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
//------------------------------------------------------------------------------------------------------------
    // set Ganache
    var providerLocation = 'http://localhost:8545';
    const Web3 = require('web3');
    let web3 = new Web3();
    var fromAddress = "0x627306090abab3a6e1400e9345bc60c78a8bef57";
    var contractAddress = "0x345ca3e014aaf5dca488057592ee47305d9b3e10";  // 0x345ca3e014aaf5dca488057592ee47305d9b3e10  0xf204a4ef082f5c04bb89f7d5e6568b796096735a
    web3.setProvider(new Web3.providers.HttpProvider(providerLocation));
    var myContract = new web3.eth.Contract(ABI, contractAddress);

    web3.eth.getBlockNumber().then(function(v) {
      var strName = JSON.stringify(v);
      //console.log("Current Block Number: " + strName);   
    });

    //console.log("1..Contract address............" + myContract.contractAddress);

    // get all contract values in one go into strContract
    var strContract;
    getContract();

    function getContract() {

      myContract.methods.viewTitle().call().then(function(v) {
        strContract = JSON.stringify('title|' + v);
        //console.log("viewLGC1: " + strContract);   
      }).then(myContract.methods.viewStatus().call().then(function(v) {
        strContract = strContract + "|\n" + JSON.stringify("status|" + v);
        //console.log("viewLGC2: " + strContract);   
      })).then(myContract.methods.viewValidity().call().then(function(v) {
        strContract = strContract + "|\nvalidity|" + JSON.stringify(v);
        //console.log("viewLGC3: " + strContract);   
      })).then(myContract.methods.viewEYAddress().call().then(function(v) {
        strContract = strContract + "|\n" + JSON.stringify("eyaddress|" + v);
        //console.log("viewLGC4: " + strContract);   
      })).then(myContract.methods.viewPartyAddress().call().then(function(v) {
        strContract = strContract + "|\n" + JSON.stringify("partyaddress|" + v);
        //console.log("viewLGC5: " + strContract);   
      })).then(myContract.methods.viewDescription().call().then(function(v) {
        strContract = strContract + "|\n" + JSON.stringify("description|" + v + "|");
        console.log(strContract);  
        return strContract; 
      }));
      //return strContract;
    }
}

/*
app.listen(PORT, function () {
    console.log('Server is started on port:', PORT);
});
*/

