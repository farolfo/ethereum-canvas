pragma solidity ^0.4.4;

contract MillionDollarHomepage {

	struct Pixel {
		address owner;	// owner of pixel
		uint price;		// price paied for the pixel
		string color; 	// color in HEX
	}

	// The window is a map that goes
	// width -> (height -> pixel)
	mapping (uint => mapping (uint => Pixel)) private window;

	uint maxWidth = 1000;

	uint maxHeight = 1000;

	// tbd: IS THIS THREAD SAFE?? 
	function buyPixel(uint x, uint y, uint price, string color) returns (bool) {
		if (price > window[x][y].price) {
			window[x][y] = Pixel({owner: msg.sender, price: price, color: color});
			return true;
		}

		return false;
	}

	function checkPixel(uint x, uint y) public constant returns(address, uint, string) {
		var pixel = window[x][y];

		if (window[x][y].price == 0) {
		    pixel.color = "BLACK";
		}

		return (pixel.owner, pixel.price, pixel.color);
	}
}
