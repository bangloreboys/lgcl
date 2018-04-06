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
      console.log("Current Block Number: " + strName);   
    });

    console.log("1..Contract address............" + myContract.contractAddress);
    
    // set all contract values in one go into strContract
    let froma;
    froma = fromAddress;
    console.log("fromAddress================:" + froma);

    setContract("This is the new Title - A320 Landing Gear Contract", "AMENDMENT", "Now Date", "20 years", "1 year", "EY Address changed", "Party address changed", "new desc");
/*
    setTitle("Title set--------",);
    setStatus("Status set--------",);
    setValidity("date set--------", "tennure set-----------", "validity set-----------");
    setAddress("EY add set--------", "Party add set-----------");
    setDescription("Desc. set--------",);
*/

    function setTitle(strTitle) {
      myContract.methods.setTitle(strTitle).send({from: froma}, function (err, res) {
        if (err) {
          console.log('oh no...'+err.message);
        } else {
          console.log('hurray...title set...' + res);
          // added to check if the set call works by reteving the changed value in v
          myContract.methods.viewTitle().call().then(function(v) {
              var strName = JSON.stringify(v);
              console.log("viewTitle: " + strName);   
          });
        }
      });
    }

    function setStatus(strStatus) {
      myContract.methods.setStatus(strStatus).send({from: froma}, function (err, res) {
        if (err) {
          console.log('oh no...'+err.message);
        } else {
          console.log('hurray...status set...' + res);
          // added to check if the set call works by reteving the changed value in v
          myContract.methods.viewStatus().call().then(function(v) {
              var strName = JSON.stringify(v);
              console.log("viewStatus: " + strName);   
          });
        }
      });
    }

    function setValidity(strDate, strTennure, strWarranty) {
      myContract.methods.setValidity(strDate, strTennure, strWarranty).send({from: froma}, function (err, res) {
        if (err) {
          console.log('oh no...'+err.message);
        } else {
          console.log('hurray...validity set...' + res);
          // added to check if the set call works by reteving the changed value in v
          myContract.methods.viewValidity().call().then(function(v) {
              var strName = JSON.stringify(v);// + JSON.stringify(v1) +JSON.stringify(v2);
              console.log("viewValidity: " + strName);   
          });
        }
      });
    }

    function setAddress(strEYAddress, strPartyAddress) {
      myContract.methods.setAddress(strEYAddress, strPartyAddress).send({from: froma}, function (err, res) {
        if (err) {
          console.log('oh no...'+err.message);
        } else {
          console.log('hurray...Description set...' + res);
          // added to check if the set call works by reteving the changed value in v
          myContract.methods.viewEYAddress().call().then(function(v) {
              var strName = JSON.stringify(v);
              console.log("viewEYAddress: " + strName);   
          }).then(myContract.methods.viewPartyAddress().call().then(function(v) {
            var strName = JSON.stringify(v);
            console.log("viewPartyAddress: " + strName);   
        }));
        }
      });
    }


    function setDescription(strDescription) {
      myContract.methods.setDescription(strDescription).send({from: froma}, function (err, res) {
        if (err) {
          console.log('oh no...'+err.message);
        } else {
          console.log('hurray...Description set...' + res);
          // added to check if the set call works by reteving the changed value in v
          myContract.methods.viewDescription().call().then(function(v) {
              var strName = JSON.stringify(v);
              console.log("viewDescription: " + strName);   
          });
        }
      });
    }
    
    function setContract(strTitle, strStatus, strDate, strTennure, strWarranty, strEYAddress, strPartyAddress, strDescription) {
      myContract.methods.setTitle(strTitle).send({from: froma}, function (err, res) {
        if (err) {
          console.log('oh no...'+err.message);
        } else {
          console.log('hurray...title set...' + res);
          // added to check if the set call works by reteving the changed value in v
          myContract.methods.viewTitle().call().then(function(v) {
              var strName = JSON.stringify(v);
              console.log("viewTitle: " + strName);   
          });
        }
      }).then(myContract.methods.setStatus(strStatus).send({from: froma}, function (err, res) {
        if (err) {
          console.log('oh no...'+err.message);
        } else {
          console.log('hurray...status set...' + res);
          // added to check if the set call works by reteving the changed value in v
          myContract.methods.viewStatus().call().then(function(v) {
              var strName = JSON.stringify(v);
              console.log("viewStatus: " + strName);   
          });
        }
      }).then(myContract.methods.setValidity(strDate, strTennure, strWarranty).send({from: froma}, function (err, res) {
        if (err) {
          console.log('oh no...'+err.message);
        } else {
          console.log('hurray...validity set...' + res);
          // added to check if the set call works by reteving the changed value in v
          myContract.methods.viewValidity().call().then(function(v) {
              var strName = JSON.stringify(v);// + JSON.stringify(v1) +JSON.stringify(v2);
              console.log("viewValidity: " + strName);   
          });
        }
      })).then(myContract.methods.setAddress(strEYAddress, strPartyAddress).send({from: froma}, function (err, res) {
        if (err) {
          console.log('oh no...'+err.message);
        } else {
          console.log('hurray...Description set...' + res);
          // added to check if the set call works by reteving the changed value in v
          myContract.methods.viewEYAddress().call().then(function(v) {
              var strName = JSON.stringify(v);
              console.log("viewEYAddress: " + strName);   
          }).then(myContract.methods.viewPartyAddress().call().then(function(v) {
            var strName = JSON.stringify(v);
            console.log("viewPartyAddress: " + strName);   
        }));
        }
      })).then(myContract.methods.setDescription(strDescription).send({from: froma}, function (err, res) {
        if (err) {
          console.log('oh no...'+err.message);
        } else {
          console.log('hurray...Description set...' + res);
          // added to check if the set call works by reteving the changed value in v
          myContract.methods.viewDescription().call().then(function(v) {
              var strName = JSON.stringify(v);
              console.log("viewDescription: " + strName);   
          });
        }
      })));
    }

}

/*
app.listen(PORT, function () {
    console.log('Server is started on port:', PORT);
});
*/

