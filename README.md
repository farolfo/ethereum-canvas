Ethereum Million Dollar Homepage
=====================

The goal of this project is to develop a version of the million dollar home page (http://www.milliondollarhomepage.com/) using a Smart Contract as backend service, developed with Solidity (https://solidity.readthedocs.io/en/develop/#). This backend will be consumed by a web UI with an RPC API.

### Smart Contract API

* `checkPixel(uint x, uint y) returns (address owner, uint price, string color)` Retruns the actual state of the pixel at the (x,y) coordinates. These go from 0 to 999 each, showing a 1000*1000 pixeles window.

* `buyPixel(uint x, uint y, string color) payable` Performs the buying of the pixel if the price send in the value of the message is greater than the currently paied one. If the opperation fails or the funds are not enough, the contract makes a `revert()` call cancelling the transaction.

### Compile

```bash 
$ truffle compile
```

### Test

```bash
$ truffle test
```

### Deploy

```bash
$ truffle migrate --reset
```

### Run

Here we will test our Smart Contract API in the `truffle console`. We will first check the pixel at (0,0) and then buy it for 1 eth and place the color "0xfafafa". After that we will check its changed value and perform another buy on that pixel, changing the color.

```
truffle(development)> MillionDollarHomepage.deployed().then(function(c) { c.checkPixel(0,0).then(console.log); });
[ '0x0000000000000000000000000000000000000000',
  { [String: '0'] s: 1, e: 0, c: [ 0 ] },
  '' ]
  
truffle(development)> MillionDollarHomepage.deployed().then(function(c) { c.buyPixel(0,0,"0xfafafa").then(console.log); });
{ tx: '0x689ef29b1fc3e746a90f0dc4ea67d7c326c84d557c2a33fc9a0891c15c9d8849',
  receipt: 
   { transactionHash: '0x689ef29b1fc3e746a90f0dc4ea67d7c326c84d557c2a33fc9a0891c15c9d8849',
     transactionIndex: 0,
     blockHash: '0x03d4dbc032a4e292673832c13e6073e7fcd49d9f069803d72e07bc6c04c5f5b9',
     blockNumber: 56,
     gasUsed: 84200,
     cumulativeGasUsed: 84200,
     contractAddress: null,
     logs: [] },
  logs: [] }
  
truffle(development)> MillionDollarHomepage.deployed().then(function(c) { c.checkPixel(0,0).then(console.log); });
[ '0x059f2d6add81e4b4aedc2e6465fc943b20e25100',
  { [String: '1'] s: 1, e: 0, c: [ 1 ] },
  '0xfafafa' ]
  
truffle(development)> MillionDollarHomepage.deployed().then(function(c) { c.buyPixel(0,0,"0xdebede").then(console.log); });
{ tx: '0xae6387fcc5f9597e7f66b643845b12696da15803ba147031dac56cad0ffdd11b',
  receipt: 
   { transactionHash: '0xae6387fcc5f9597e7f66b643845b12696da15803ba147031dac56cad0ffdd11b',
     transactionIndex: 0,
     blockHash: '0x200065ff84b5cd57f0637a173e741b87236b394df4afe289ab6a81ab1313db75',
     blockNumber: 57,
     gasUsed: 44249,
     cumulativeGasUsed: 44249,
     contractAddress: null,
     logs: [] },
  logs: [] }
  
truffle(development)> MillionDollarHomepage.deployed().then(function(c) { c.checkPixel(0,0).then(console.log); });
[ '0x059f2d6add81e4b4aedc2e6465fc943b20e25100',
  { [String: '4'] s: 1, e: 0, c: [ 4 ] },
  '0xdebede' ]
```
