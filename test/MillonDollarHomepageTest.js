var MillionDollarHomepage = artifacts.require("./MillionDollarHomepage.sol");

contract('MillionDollarHomepage', function(accounts) {

  it("should expose non-owned initial pixels without an owner set", function() {
    return MillionDollarHomepage.deployed().then(function(instance) {
        return instance.checkPixel(0,0);
      }).then(function(pixel) {
        assert.equal(pixel.owner, undefined, "There is an owner defined");
      });
  });

  it("should expose non-owned initial pixels without price set", function() {
  });

  it("should expose non-owned initial pixels with BLACK color set", function() {
  });

  it("should set the price paid to a new pixel when is bought", function() {
  });

  it("should set the proper color to a new pixel when is bought", function() {
  });

  it("should set the proper owner to a new pixel when is bought", function() {
  });

  it("should set the price paid to an already owned pixel when is bought", function() {
  });

  it("should set the proper color to an already owned pixel when is bought", function() {
  });

  it("should set the proper owner to an already owned pixel when is bought", function() {
  });

  it("should fail if the price paid for the user is not greater than the current price paid", function() {
  });

});