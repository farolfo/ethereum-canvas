pragma solidity ^0.4.13;

/**
 * Contract of the Ethereum Canvas.
 */
contract EthereumCanvas {

    /**
     * Event of a pixel's purchase.
     */
    event Purchase (
        address owner,	// owner of pixel
        uint price, 	// price payed for the pixel
        string color, 	// color in HEX or any string acceptable by CSS3 as a colour
        uint x,         // the x coordinate
        uint y          // the y coordinate
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
	    if (isOutOfBound(x,y) || msg.value <= window[x][y].price) {
			revert();
		}

        window[x][y] = Pixel({owner: msg.sender, price: msg.value, color: color});
        Purchase(msg.sender, msg.value, color, x, y);
	}

    /**
     * Function used to check the current status of the pixel at (x,y).
     */
	function checkPixel(uint x, uint y) public constant returns(address, uint, string) {
	    if (isOutOfBound(x,y)) {
    	    revert();
        }

		var pixel = window[x][y];
		return (pixel.owner, pixel.price, pixel.color);
	}

	/**
	 * Function that checks whether the parameters are out of bound respect to the current window.
	 */
	function isOutOfBound(uint x, uint y) public constant returns(bool) {
        return x < 0 || y < 0 || x >= maxWidth || y >= maxHeight;
    }
}
