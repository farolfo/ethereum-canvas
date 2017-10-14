var EthereumCanvas = artifacts.require("./EthereumCanvas.sol");

import assertJump from './helper/assertJump';

contract('EthereumCanvas', function(accounts) {

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  let ethereumCanvas;

  beforeEach(async function() {
    ethereumCanvas = await EthereumCanvas.new();
  });

  it("should expose non-owned pixels without an owner set", async function() {
    let pixel = await ethereumCanvas.checkPixel(0,0);
    assert.equal(pixel[0], ZERO_ADDRESS, "There is an owner defined");
  });

  it("should expose non-owned pixels without a price set", async function() {
    let pixel = await ethereumCanvas.checkPixel(0,0);
    assert(pixel[1].isZero(), "The price is not zero");
  });

  it("should expose non-owned pixels without a color set", async function() {
    let pixel = await ethereumCanvas.checkPixel(0,0);
    assert.equal(pixel[2], "", "The color is defined");
  });

  it("should set the price paid to a new pixel when is bought", async function() {
    await ethereumCanvas.buyPixel(0, 0, "#FAFAFA", {from: accounts[0], value: 1});
    let pixel = await ethereumCanvas.checkPixel(0,0);
    assert.equal(pixel[1], 1, "The price is not defined");
  });

  it("should trigger a Purchase event with the proper price set when a pixel is bought", async function() {
    await ethereumCanvas.buyPixel(0, 0, "#FAFAFA", {from: accounts[0], value: 1});
    let events = await ethereumCanvas.Purchase(function(error, result) {
      if (!error) {
        assert.equal(result.args.price, 1, "The price is not correct");
      }
      events.stopWatching();
    });
  });

  it("should trigger a Purchase event with the proper coordinates set when a pixel is bought", async function() {
    await ethereumCanvas.buyPixel(3, 45, "#FAFAFA", {from: accounts[0], value: 1});
    let events = await ethereumCanvas.Purchase(function(error, result) {
      if (!error) {
        assert.equal(result.args.x, 3, "The x coordinate is not correct");
        assert.equal(result.args.y, 45, "The y coordinate is not correct");
      }
      events.stopWatching();
    });
  });

  it("should trigger a Purchase event with the proper owner set when a pixel is bought", async function() {
    await ethereumCanvas.buyPixel(0, 0, "#FAFAFA", {from: accounts[0], value: 1});
    let events = await ethereumCanvas.Purchase(function(error, result) {
      if (!error) {
        assert.equal(result.args.owner, accounts[0], "The owner is not correct");
      }
      events.stopWatching();
    });
  });

  it("should trigger a Purchase event with the proper color set when a pixel is bought", async function() {
    await ethereumCanvas.buyPixel(0, 0, "#FAFAFA", {from: accounts[0], value: 1});
    let events = await ethereumCanvas.Purchase(function(error, result) {
      if (!error) {
        assert.equal(result.args.color, "#FAFAFA", "The color is not correct");
      }
      events.stopWatching();
    });
  });

  it("should set the proper color to a new pixel when is bought", async function() {
    await ethereumCanvas.buyPixel(0, 0, "#FAFAFA", {from: accounts[0], value: 1});
    let pixel = await ethereumCanvas.checkPixel(0,0);
    assert.equal(pixel[2], "#FAFAFA", "The color is not defined");
  });

  it("should set the proper owner to a new pixel when is bought", async function() {
    await ethereumCanvas.buyPixel(0, 0, "#FAFAFA", {from: accounts[0], value: 1});
    let pixel = await ethereumCanvas.checkPixel(0,0);
    assert.equal(pixel[0], accounts[0], "The owner is not defined");
  });

  it("should set the price paid to an already owned pixel when is bought", async function() {
    await ethereumCanvas.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 1});
    await ethereumCanvas.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 6});
    let pixel = await ethereumCanvas.checkPixel(2,0);
    assert(pixel[1].equals(6), "The price is not correct");
  });

  it("should set the proper color to an already owned pixel when is bought", async function() {
    await ethereumCanvas.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 1});
    await ethereumCanvas.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 6});
    let pixel = await ethereumCanvas.checkPixel(2,0);
    assert.equal(pixel[2], "#JAJAJA", "The color is not correct");
  });

  it("should set the proper owner to an already owned pixel when is bought", async function() {
    await ethereumCanvas.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 1});
    await ethereumCanvas.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 6});
    let pixel = await ethereumCanvas.checkPixel(2,0);
    assert.equal(pixel[0], accounts[1], "The owner is not correct");
  });

  it("should fail if the price paid for the user is not greater than the current price paid for the pixel", async function() {
    await ethereumCanvas.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 6});
    try {
      await ethereumCanvas.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 3});
      assert.fail('should have thrown before');
    } catch (err) {
      assertJump(err);
    }
  });

  it("should not change the color if the price paid for the user is not greater than the current price paid for the pixel", async function() {
    await ethereumCanvas.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 6});
    try {
      await ethereumCanvas.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 3});
      assert.fail('should have thrown before');
    } catch (err) {
      // go ahead to assertions
    }

    let pixel = await ethereumCanvas.checkPixel(2,0);
    assert.equal(pixel[2], "#FAFAFA", "The color is not correct");
  });

  it("should not change the price if the price paid for the user is not greater than the current price paid for the pixel", async function() {
    await ethereumCanvas.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 6});
    try {
      await ethereumCanvas.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 3});
      assert.fail('should have thrown before');
    } catch (err) {
      // go ahead to assertions
    }

    let pixel = await ethereumCanvas.checkPixel(2,0);
    assert(pixel[1].equals(6), "The price is not correct");
  });

  it("should not change the owner if the price paid for the user is not greater than the current price paid for the pixel", async function() {
    await ethereumCanvas.buyPixel(2, 0, "#FAFAFA", {from: accounts[0], value: 6});
    try {
      await ethereumCanvas.buyPixel(2, 0, "#JAJAJA", {from: accounts[1], value: 3});
      assert.fail('should have thrown before');
    } catch (err) {
      // go ahead to assertions
    }

    let pixel = await ethereumCanvas.checkPixel(2,0);
    assert.equal(pixel[0], accounts[0], "The owner is not correct");
  });

  it("should fail if buying an out of pound pixel", async function() {
    try {
      await ethereumCanvas.buyPixel(-1, 0, "#JAJAJA", {from: accounts[1], value: 3});
      assert.fail('should have thrown before');
    } catch (err) {
      assertJump(err);
    }
  });

  it("should fail if checking an out of pound pixel", async function() {
    try {
      await ethereumCanvas.checkPixel(-1, 0);
      assert.fail('should have thrown before');
    } catch (err) {
      assertJump(err);
    }
  });
});