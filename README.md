Ethereum Million Dollar Homepage [![Build Status](https://travis-ci.org/farolfo/eth-million-dollar-homepage.png)](https://travis-ci.org/farolfo/eth-million-dollar-homepage)
=====================

The goal of this project is to develop the million dollar home page (http://www.milliondollarhomepage.com/) using a Smart Contract as core backend service, developed with Solidity (https://solidity.readthedocs.io/en/develop/#). This backend will be consumed by a web UI via an RPC API and Solidity events.

### Smart Contract API

* `checkPixel(uint x, uint y) returns (address owner, uint price, string color)` Returns the actual state of the pixel at the (x,y) coordinates. These go from 0 to 999 each, showing a 1000*1000 pixels window.

* `buyPixel(uint x, uint y, string color) payable` Performs the operation of buying the pixel if the price sent in the value of the message is greater than the currently paied one. If the operation fails or the funds are not enough, the contract makes a `revert()` call cancelling the transaction. If the the operations succeeds the respective `Purchase(address owner, uint price, string color, uint x, uint y)` event will be triggered.

### Install

You must have a node version ^6.11.0. We highly recommend `nvm` to manage node versions on your machine.

Make sure you have solidity and testrpc installed in your machine

```
npm install -g solc
npm install -g ethereumjs-testrpc
```

And then install this project dependencies

```bash
$ npm install
```

### Compile

```bash 
$ npm run compile
```

### Test

```bash
$ npm run test
```

### Deploy

Run the smart contract in a `testrpc` instance just by running

```bash
$ npm run deploy
```
