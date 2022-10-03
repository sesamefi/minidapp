// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Donation {
  address donor;
  uint256 value;
  uint time;
  address payable owner;

  modifier onlyOwner() {
    require (msg.sender == owner);
    _;
  }

  constructor() {
    owner = payable(msg.sender);
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
    value = msg.value;
    donor = msg.sender;
    time = block.timestamp;
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
      owner.transfer(amount);
      return true;
  }

  function getBalanceContract() public view returns(uint){
      return address(this).balance;
  }

}
