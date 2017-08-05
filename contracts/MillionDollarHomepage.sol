pragma solidity ^0.4.13;

/**
 * Contract of the Ethereum's Millon Dollar Homepage.
 */
contract MillionDollarHomepage {

    /**
     * Event of a pixel purchase.
     */
    event Purchase (
        address owner,	// owner of pixel
        uint price, 	// price payed for the pixel
        string color 	// color in HEX or any string acceptable by CSS3 as a colour
    );

    /**
     * A pixel of the window.
     */
	struct Pixel {
		address owner;	// owner of pixel
		uint price;		// price payed for the pixel
		string color; 	// color in HEX or any string acceptable by CSS3 as a colour
	}

	/**
	 * The window is a map that fits "width -> (height -> pixel)".
	 */
	mapping (uint => mapping (uint => Pixel)) private window;

    /**
     * The maximum value of the window's width.
     */
	uint maxWidth = 1000;

    /**
     * The maximum value of the window's height.
     */
	uint maxHeight = 1000;

    /**
     * Function used to buy the pixel (x,y) and set the given color.
     */
	function buyPixel(uint x, uint y, string color) payable {
	    if (msg.value <= window[x][y].price) {
			revert();
		}

        window[x][y] = Pixel({owner: msg.sender, price: msg.value, color: color});
        Purchase(msg.sender, msg.value, color);
	}

    /**
     * Function used to check the current status of the pixel at (x,y).
     */
	function checkPixel(uint x, uint y) public constant returns(address, uint, string) {
		var pixel = window[x][y];
		return (pixel.owner, pixel.price, pixel.color);
	}
}
