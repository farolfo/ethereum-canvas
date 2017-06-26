var MillionDollarHomepage = artifacts.require("./MillionDollarHomepage.sol");

contract('MillionDollarHomepage', function(accounts) {

  var account;

  it("should expose non-owned pixels without an owner set", function() {
    return MillionDollarHomepage.deployed().then(function(instance) {
        return instance.checkPixel(0,0);
      }).then(function(pixel) {
        assert.equal(pixel.owner, undefined, "There is an owner defined");
      });
  });

  it("should expose non-owned pixels without a price set", function() {
      return MillionDollarHomepage.deployed().then(function(instance) {
        return instance.checkPixel(0,0);
      }).then(function(pixel) {
        assert.equal(pixel.price, undefined, "The price is defined");
      });
  });

  it("should expose non-owned pixels without a color set", function() {
      return MillionDollarHomepage.deployed().then(function(instance) {
        return instance.checkPixel(0,0);
      }).then(function(pixel) {
        assert.equal(pixel.color, undefined, "The color is defined");
      });
  });

  it("should set the price paid to a new pixel when is bought", function() {
      account = accounts[0];

      return MillionDollarHomepage.deployed().then(function(instance) {
          return instance.buyPixel(0, 0, "#FAFAFA", {from: account, value: 1})
        .then(function(ans) {
          return instance.checkPixel(0,0);
        });
      }).then(function(pixel) {
        assert.equal(pixel.price, 1, "The price is not defined");
      });
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