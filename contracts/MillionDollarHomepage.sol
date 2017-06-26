pragma solidity ^0.4.4;

contract MillionDollarHomepage {

	struct Pixel {
		address owner;	// owner of pixel
		uint price;		// price payed for the pixel
		string color; 	// color in HEX
	}

	// The window is a map that goes
	// width -> (height -> pixel)
	mapping (uint => mapping (uint => Pixel)) private window;

	uint maxWidth = 1000;

	uint maxHeight = 1000;

	function buyPixel(uint x, uint y, string color) payable {
		if (msg.value <= window[x][y].price) {
			revert();
		}

        window[x][y] = Pixel({owner: msg.sender, price: msg.value, color: color});
	}

	function checkPixel(uint x, uint y) public constant returns(address, uint, string) {
		var pixel = window[x][y];
		return (pixel.owner, pixel.price, pixel.color);
	}
}
