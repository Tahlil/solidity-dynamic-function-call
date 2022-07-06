//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    uint private value;

    constructor(uint _value) {
        console.log("Deploying a Greeter with value:", _value);
        value = _value;
    }

    
    function set(uint n) external{
        value = n;
    }
    
    function get() external view returns(uint) {
        return value;
    }
}
