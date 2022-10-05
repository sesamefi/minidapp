// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

/// Invalid balance to transfer. Needed `minRequired` but sent `amount`
/// @param sent sent amount.
/// @param minRequired minimum amount to send.
error InvalidAmount (uint256 sent, uint256 minRequired);

/// Invalid wallet. Needed certication
/// @param senderAddress send address.
error InvalidWallet (address senderAddress);

interface IWhitelist {
  function whitelistedAddresses(address) external view returns (bool);
}

contract Cashier is Ownable {
  address donor;
  uint256 value;
  uint time;
  address public deployedWhitelist;
  uint minRequired;

  constructor(uint _networkid) {
    if (_networkid == 200101)
      minRequired = 1e17;
    else if (_networkid == 43113)
      minRequired = 1e15;
    else if (_networkid == 1287)
      minRequired = 1e16;
    else
      minRequired = 1e12;
  }

  event deploymentLog(string _message, address _address);

  function setWhitelistAddress(address _whitelistAddress) public payable onlyOwner {
    deployedWhitelist = _whitelistAddress;
    emit deploymentLog("Whitelist address:", _whitelistAddress);
  }

  function readDonor() public view returns (address) {
    return donor;
  }

  function readAmount() public view returns (uint256) {
    return value;
  }

  function readTime() public view returns (uint) {
    return time;
  }  

  receive() external payable {
    uint256 amount = msg.value;
    address sender = msg.sender;
    // White list verification
    IWhitelist wl = IWhitelist(deployedWhitelist);
    bool certified = wl.whitelistedAddresses(sender);
    if (! certified) {
      revert InvalidWallet({
        senderAddress: sender
      });
    }
    // Miminal payment verification
    if (amount < minRequired) {
      revert InvalidAmount({
          sent: amount,
          minRequired: minRequired
      });
    } else { // Accept payment
      value = amount;
      donor = sender;
      time = block.timestamp;
    }

    emit Log(gasleft());
  }    
  
  event Log(uint gas);

  // Fallback function must be declared as external.
  fallback() external payable {
    // send / transfer (forwards 2300 gas to this fallback function)
    // call (forwards all of the gas)
    emit Log(gasleft());
  }

  function withdraw(uint amount) public onlyOwner returns(bool) {
      require(amount <= address(this).balance);
      payable(owner()).transfer(amount);
      return true;
  }

  function getBalanceContract() public view returns(uint){
      return address(this).balance;
  }

}
