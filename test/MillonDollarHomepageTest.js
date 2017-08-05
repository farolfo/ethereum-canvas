var MillionDollarHomepage = artifacts.require("./MillionDollarHomepage.sol");

import assertJump from './helper/assertJump';

contract('MillionDollarHomepage', function(accounts) {

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  let millionDollarHomepage;

  beforeEach(async function() {
    millionDollarHomepage = await MillionDollarHomepage.new();
  });

  it("should expose non-owned pixels without an owner set", async function() {
    let pixel = await millionDollarHomepage.checkPixel(0,0);
    assert.equal(pixel[0], ZERO_ADDRESS, "There is an owner defined");
  });

  it("should expose non-owned pixels without a price set", async function() {
    let pixel = await millionDollarHomepage.checkPixel(0,0);
    assert(pixel[1].isZero(), "The price is not zero");
  });

  it("should expose non-owned pixels without a color set", async function() {
    let pixel = await millionDollarHomepage.checkPixel(0,0);
    assert.equal(pixel[2], "", "The color is defined");
  });

  it("should set the price paid to a new pixel when is bought", async function() {
    await millionDollarHomepage.buyPixel(0, 0, "#FAFAFA", {from: accounts[0], value: 1});
    let pixel = await millionDollarHomepage.checkPixel(0,0);
    assert.equal(pixel[1], 1, "The price is not defined");
  });

  it("should trigger a Purchase event with the proper price set when a pixel is bought", async function() {
    await millionDollarHomepage.buyPixel(0, 0, "#FAFAFA", {from: accounts[0], value: 1});
    let events = await millionDollarHomepage.Purchase(function(error, result) {
      if (!error) {
        assert.equal(result.args.price, 1, "The price is not correct");
      }
      events.stopWatching();
    });
  });

  it("should trigger a Purchase event with the proper owner set when a pixel is bought", async function() {
    await millionDollarHomepage.buyPixel(0, 0, "#FAFAFA", {from: accounts[0], value: 1});
    let events = await millionDollarHomepage.Purchase(function(error, result) {
      if (!error) {
        assert.equal(result.args.owner, accounts[0], "The owner is not correct");
      }
      events.stopWatching();
    });
  });

  it("should trigger a Purchase event with the proper color set when a pixel is bought", async function() {
    await millionDollarHomepage.buyPixel(0, 0, "#FAFAFA", {from: accounts[0], value: 1});
    let events = await millionDollarHomepage.Purchase(function(error, result) {
      if (!error) {
        assert.equal(result.args.color, "#FAFAFA", "The color is not correct");
      }
      events.stopWatching();
    });
  });

  it("should set the proper color to a new pixel when is bought", async function() {
    await millionDollarHomepage.buyPixel(0, 0, "#FAFAFA", {from: accounts[0], value: 1});
    let pixel = await millionDollarHomepage.checkPixel(0,0);
    assert.equal(pixel[2], "#FAFAFA", "The color is not defined");
  });

  it("should set the proper owner to a new pixel when is bought", async function() {
    await millionDollarHomepage.buyPixel(0, 0, "#FAFAFA", {from: accounts[0], value: 1});
    let pixel = await millionDollarHomepage.checkPixel(0,0);
    assert.equal(pixel[0], accounts[0], "The owner is not defined");
  });

  it("should set the price paid to an already owned pixel when is bought", async function() {
    await millionDollarHomepage.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 1});
    await millionDollarHomepage.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 6});
    let pixel = await millionDollarHomepage.checkPixel(2,0);
    assert(pixel[1].equals(6), "The price is not correct");
  });

  it("should set the proper color to an already owned pixel when is bought", async function() {
    await millionDollarHomepage.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 1});
    await millionDollarHomepage.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 6});
    let pixel = await millionDollarHomepage.checkPixel(2,0);
    assert.equal(pixel[2], "#JAJAJA", "The color is not correct");
  });

  it("should set the proper owner to an already owned pixel when is bought", async function() {
    await millionDollarHomepage.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 1});
    await millionDollarHomepage.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 6});
    let pixel = await millionDollarHomepage.checkPixel(2,0);
    assert.equal(pixel[0], accounts[1], "The owner is not correct");
  });

  it("should fail if the price paid for the user is not greater than the current price paid for the pixel", async function() {
    await millionDollarHomepage.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 6});
    try {
      await millionDollarHomepage.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 3});
      assert.fail('should have thrown before');
    } catch (err) {
      assertJump(err);
    }
  });

  it("should not change the color if the price paid for the user is not greater than the current price paid for the pixel", async function() {
    await millionDollarHomepage.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 6});
    try {
      await millionDollarHomepage.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 3});
      assert.fail('should have thrown before');
    } catch (err) {
      // keep testing
    }

    let pixel = await millionDollarHomepage.checkPixel(2,0);
    assert.equal(pixel[2], "#FAFAFA", "The color is not correct");
  });

  it("should not change the price if the price paid for the user is not greater than the current price paid for the pixel", async function() {
    await millionDollarHomepage.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 6});
    try {
      await millionDollarHomepage.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 3});
      assert.fail('should have thrown before');
    } catch (err) {
      // keep testing
    }

    let pixel = await millionDollarHomepage.checkPixel(2,0);
    assert(pixel[1].equals(6), "The price is not correct");
  });

  it("should not change the owner if the price paid for the user is not greater than the current price paid for the pixel", async function() {
    await millionDollarHomepage.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 6});
    try {
      await millionDollarHomepage.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 3});
      assert.fail('should have thrown before');
    } catch (err) {
      // keep testing
    }

    let pixel = await millionDollarHomepage.checkPixel(2,0);
    assert.equal(pixel[0], accounts[0], "The owner is not correct");
  });

  it("should fail if buying an out of pound pixel", async function() {
    try {
      await millionDollarHomepage.buyPixel(-1, 0, "#JAJAJA", {from: accounts[1], value: 3});
      assert.fail('should have thrown before');
    } catch (err) {
      assertJump(err);
    }
  });

  it("should fail if checking an out of pound pixel", async function() {
    try {
      await millionDollarHomepage.checkPixel(-1, 0);
      assert.fail('should have thrown before');
    } catch (err) {
      assertJump(err);
    }
  });
});