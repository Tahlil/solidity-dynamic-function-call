//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    uint private value;
    uint private value2;

    constructor(uint _value) {
        console.log("Deploying a Greeter with value:", _value);
        value = _value;
        value2 = _value;
    }

    function set(uint n) external{
        value = n;
    }

    function setTwoValue(uint n, uint n2) external{
        value = n;
        value2 = n2;
    }
    
    function get() external view returns(uint) {
        return value;
    }

    function execute(address _to, bytes calldata _data)
        public
        payable
        returns (bytes memory)
    {
        (bool success, bytes memory returnData) = _to.call{value: msg.value}(_data);
        require(success);
        return returnData;
    }
}
