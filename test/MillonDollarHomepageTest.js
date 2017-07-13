var MillionDollarHomepage = artifacts.require("./MillionDollarHomepage.sol");

contract('MillionDollarHomepage', function(accounts) {

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  var account;

  it("should expose non-owned pixels without an owner set", function() {
    return MillionDollarHomepage.deployed().then(function(instance) {
        return instance.checkPixel(0,0);
      }).then(function(pixel) {
        assert.equal(pixel[0], ZERO_ADDRESS, "There is an owner defined");
      });
  });

  it("should expose non-owned pixels without a price set", function() {
      return MillionDollarHomepage.deployed().then(function(instance) {
        return instance.checkPixel(0,0);
      }).then(function(pixel) {
        assert(pixel[1].isZero(), "The price is not zero");
      });
  });

  it("should expose non-owned pixels without a color set", function() {
      return MillionDollarHomepage.deployed().then(function(instance) {
        return instance.checkPixel(0,0);
      }).then(function(pixel) {
        assert.equal(pixel[2], "", "The color is defined");
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
        assert(pixel[1].equals(1), "The price is not defined");
      });
  });

  it("should set the proper color to a new pixel when is bought", function() {
      account = accounts[0];

      return MillionDollarHomepage.deployed().then(function(instance) {
          return instance.buyPixel(0, 0, "#FAFAFA", {from: account, value: 2})
        .then(function(ans) {
          return instance.checkPixel(0,0);
        });
      }).then(function(pixel) {
        assert.equal(pixel[2], "#FAFAFA", "The color is not defined");
      });
  });

  it("should set the proper owner to a new pixel when is bought", function() {
      account = accounts[0];

      return MillionDollarHomepage.deployed().then(function(instance) {
          return instance.buyPixel(2, 0, "#FAFAFA", {from: account, value: 2})
        .then(function(ans) {
          return instance.checkPixel(2,0);
        });
      }).then(function(pixel) {
        assert.equal(pixel[0], account, "The owner is not defined");
      });
  });

  it("should set the price paid to an already owned pixel when is bought", function() {
      account = accounts[1];

      return MillionDollarHomepage.deployed().then(function(instance) {
          return instance.buyPixel(2, 0, "#JAJAJA", {from: account, value: 6})
        .then(function(ans) {
          return instance.checkPixel(2,0);
        });
      }).then(function(pixel) {
        assert(pixel[1].equals(6), "The price is not correct");
      });
  });

  it("should set the proper color to an already owned pixel when is bought", function() {
      account = accounts[2];

      return MillionDollarHomepage.deployed().then(function(instance) {
          return instance.buyPixel(2, 0, "#JOJOJO", {from: account, value: 8})
        .then(function(ans) {
          return instance.checkPixel(2,0);
        });
      }).then(function(pixel) {
        assert.equal(pixel[2], "#JOJOJO", "The color is not correct");
      });
  });

  it("should set the proper owner to an already owned pixel when is bought", function() {
      account = accounts[3];

      return MillionDollarHomepage.deployed().then(function(instance) {
          return instance.buyPixel(2, 0, "#FAFAFA", {from: account, value: 10})
        .then(function(ans) {
          return instance.checkPixel(2,0);
        });
      }).then(function(pixel) {
        assert.equal(pixel[0], account, "The owner is not correct");
      });
  });

  it("should fail if the price paid for the user is not greater than the current price paid for the pixel", function() {
      account = accounts[0];

      return MillionDollarHomepage.deployed().then(function(instance) {
          return instance.buyPixel(2, 0, "#MOMOMO", {from: account, value: 5})
        .catch(function(ans) {
          assert(ans.message != "", "There is no error message");
        });
      });
  });

  it("should not change the color if the price paid for the user is not greater than the current price paid for the pixel", function() {
      account = accounts[0];

      return MillionDollarHomepage.deployed().then(function(instance) {
          return instance.buyPixel(2, 0, "#MOMOMO", {from: account, value: 5})
        .catch(function(ans) {
          return instance.checkPixel(2,0);
        }).then(function(pixel) {
          assert.equal(pixel[2], "#FAFAFA", "The color is not correct");
        });
      });
  });

  it("should not change the price if the price paid for the user is not greater than the current price paid for the pixel", function() {
      account = accounts[0];

      return MillionDollarHomepage.deployed().then(function(instance) {
          return instance.buyPixel(2, 0, "#MOMOMO", {from: account, value: 5})
        .catch(function(ans) {
          return instance.checkPixel(2,0);
        }).then(function(pixel) {
          assert(pixel[1].equals(10), "The price is not correct");
        });
      });
  });

  it("should not change the owner if the price paid for the user is not greater than the current price paid for the pixel", function() {
      account = accounts[0];

      return MillionDollarHomepage.deployed().then(function(instance) {
          return instance.buyPixel(2, 0, "#MOMOMO", {from: account, value: 5})
        .catch(function(ans) {
          return instance.checkPixel(2,0);
        }).then(function(pixel) {
          assert.equal(pixel[0], accounts[3], "The owner is not correct");
        });
      });
  });
});