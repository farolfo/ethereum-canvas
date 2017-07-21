pragma solidity ^0.4.4;

/**
 * Contract of the Ethereum's Millon Dollar Homepage.
 */
contract MillionDollarHomepage {

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
	}

    /**
     * Function used to check the current status of the pixel at (x,y).
     */
	function checkPixel(uint x, uint y) public constant returns(address, uint, string) {
		var pixel = window[x][y];
		return (pixel.owner, pixel.price, pixel.color);
	}

    /**
     * Returns the window as a JSON string, parsable by any browser with the JSON.parse function.
     */
	function getSerializedWindow() public constant returns (string) {
	    var resp = "{ \"window\": [";
        var ZERO_ADDRESS = address(0);

        for (uint x = 0; x < maxWidth; x++) {
            for (uint y = 0; y < maxHeight; y++) {

                if (window[x][y].owner != ZERO_ADDRESS) {
                    resp = strConcat(resp, "{\"x\":\"");
                    resp = strConcat(resp, uintToString(x));
                    resp = strConcat(resp, "\", \"y\":\"");
                    resp = strConcat(resp, uintToString(y));
                    resp = strConcat(resp, "\", \"color\":\"");
                    resp = strConcat(resp, window[x][y].color);
                    resp = strConcat(resp, "\", \"owner\":\"");
                    resp = strConcat(resp, addressToString(window[x][y].owner));
                    resp = strConcat(resp, "\"},");
                }

            }
        }

	    resp = strConcat(resp, "] }");

	    return resp;
	}

	function strConcat(string _a, string _b, string _c, string _d, string _e) constant internal returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }

    function strConcat(string _a, string _b, string _c, string _d) constant internal returns (string) {
        return strConcat(_a, _b, _c, _d, "");
    }

    function strConcat(string _a, string _b, string _c) constant internal returns (string) {
        return strConcat(_a, _b, _c, "", "");
    }

    function strConcat(string _a, string _b) constant internal returns (string) {
        return strConcat(_a, _b, "", "", "");
    }

    function uintToBytes(uint v) constant returns (bytes32 ret) {
        if (v == 0) {
            ret = '0';
        }
        else {
            while (v > 0) {
                ret = bytes32(uint(ret) / (2 ** 8));
                ret |= bytes32(((v % 10) + 48) * 2 ** (8 * 31));
                v /= 10;
            }
        }
        return ret;
    }

    function bytes32ToString(bytes32 data) constant returns (string) {
        bytes memory bytesString = new bytes(32);
        for (uint j=0; j<32; j++) {
            byte char = byte(bytes32(uint(data) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[j] = char;
            }
        }
        return string(bytesString);
    }

    function uintToString(uint v) constant returns (string) {
        return bytes32ToString(uintToBytes(v));
    }

    function addressToString(address x) constant returns (string) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }
}
