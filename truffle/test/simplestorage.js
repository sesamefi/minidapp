const Donation = artifacts.require("Donation");

contract('Donation', () => {
  it('should read newly written values', async() => {
    const donationInstance = await Donation.deployed();
    var value = (await donationInstance.read.call()).toNumber();

    assert.equal(value, 0, "0 wasn't the initial value");

    await simpleStorageInstance.write(1);
    value = (await simpleStorageInstance.read.call()).toNumber();
    assert.equal(value, 1, "1 was not written");

    await simpleStorageInstance.write(2);
    value = (await simpleStorageInstance.read.call()).toNumber();
    assert.equal(value, 2, "2 was not written");
  });
});
