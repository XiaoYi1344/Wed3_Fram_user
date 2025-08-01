// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Lock {
    uint public unlockTime;
    address public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(_unlockTime > block.timestamp, "Unlock time should be in the future");
        unlockTime = _unlockTime;
        owner = msg.sender;
    }

    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        uint amount = address(this).balance;
        emit Withdrawal(amount, block.timestamp);

        payable(owner).transfer(amount);
    }
}
